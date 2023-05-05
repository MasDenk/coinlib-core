"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTronPayments = void 0;
const lodash_1 = require("lodash");
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const TronPaymentsUtils_1 = require("./TronPaymentsUtils");
class BaseTronPayments extends TronPaymentsUtils_1.TronPaymentsUtils {
    async init() { }
    async destroy() { }
    requiresBalanceMonitor() {
        return false;
    }
    async getBalance(resolveablePayport) {
        const payport = await this.resolvePayport(resolveablePayport);
        return this.getAddressBalance(payport.address);
    }
    async resolveFeeOption(feeOption) {
        let targetFeeLevel;
        if ((0, ts_common_1.isType)(lib_common_1.FeeOptionCustom, feeOption)) {
            if (feeOption.feeRate !== '0') {
                throw new Error('tron-payments custom fees are unsupported');
            }
            targetFeeLevel = lib_common_1.FeeLevel.Custom;
        }
        else {
            targetFeeLevel = feeOption.feeLevel || constants_1.DEFAULT_FEE_LEVEL;
        }
        return {
            targetFeeLevel,
            targetFeeRate: '0',
            targetFeeRateType: lib_common_1.FeeRateType.Base,
            feeBase: '0',
            feeMain: '0',
        };
    }
    async buildUnsignedTx(toAddress, amountSun, fromAddress) {
        let tx = await this.tronweb.transactionBuilder.sendTrx(toAddress, amountSun, fromAddress);
        tx = await this.tronweb.transactionBuilder.extendExpiration(tx, constants_1.TX_EXPIRATION_EXTENSION_SECONDS);
        return tx;
    }
    async createServiceTransaction() {
        return null;
    }
    async createSweepTransaction(from, to, options = {}) {
        this.logger.debug('createSweepTransaction', from, to);
        try {
            const { fromAddress, fromIndex, fromPayport, toAddress, toIndex } = await this.resolveFromTo(from, to);
            const { targetFeeLevel, targetFeeRate, targetFeeRateType, feeBase, feeMain } = await this.resolveFeeOption(options);
            const feeSun = Number.parseInt(feeBase);
            const { confirmedBalance: balanceTrx } = await this.getBalance(fromPayport);
            const balanceSun = (0, helpers_1.toBaseDenominationNumber)(balanceTrx);
            if (!this.canSweepBalanceSun(balanceSun)) {
                throw new Error(`Insufficient balance (${balanceTrx}) to sweep with fee of ${feeMain} ` +
                    `while maintaining a minimum required balance of ${constants_1.MIN_BALANCE_TRX}`);
            }
            const amountSun = balanceSun - feeSun - constants_1.MIN_BALANCE_SUN;
            const amountTrx = this.toMainDenomination(amountSun);
            const tx = await this.buildUnsignedTx(toAddress, amountSun, fromAddress);
            return {
                status: lib_common_1.TransactionStatus.Unsigned,
                id: tx.txID,
                fromAddress,
                toAddress,
                toExtraId: null,
                fromIndex,
                toIndex,
                amount: amountTrx,
                fee: feeMain,
                targetFeeLevel,
                targetFeeRate,
                targetFeeRateType,
                sequenceNumber: null,
                data: tx,
            };
        }
        catch (e) {
            throw (0, utils_1.toError)(e);
        }
    }
    async createTransaction(from, to, amountTrx, options = {}) {
        this.logger.debug('createTransaction', from, to, amountTrx);
        try {
            const { fromAddress, fromIndex, fromPayport, toAddress, toIndex } = await this.resolveFromTo(from, to);
            const { targetFeeLevel, targetFeeRate, targetFeeRateType, feeBase, feeMain } = await this.resolveFeeOption(options);
            const feeSun = Number.parseInt(feeBase);
            const { confirmedBalance: balanceTrx } = await this.getBalance(fromPayport);
            const balanceSun = (0, helpers_1.toBaseDenominationNumber)(balanceTrx);
            const amountSun = (0, helpers_1.toBaseDenominationNumber)(amountTrx);
            if (balanceSun - feeSun - constants_1.MIN_BALANCE_SUN < amountSun) {
                throw new Error(`Insufficient balance (${balanceTrx}) to send ${amountTrx} including fee of ${feeMain} ` +
                    `while maintaining a minimum required balance of ${constants_1.MIN_BALANCE_TRX}`);
            }
            const tx = await this.buildUnsignedTx(toAddress, amountSun, fromAddress);
            return {
                status: lib_common_1.TransactionStatus.Unsigned,
                id: tx.txID,
                fromAddress,
                toAddress,
                toExtraId: null,
                fromIndex,
                toIndex,
                amount: amountTrx,
                fee: feeMain,
                targetFeeLevel,
                targetFeeRate,
                targetFeeRateType,
                sequenceNumber: null,
                data: tx,
            };
        }
        catch (e) {
            throw (0, utils_1.toError)(e);
        }
    }
    async signTransaction(unsignedTx) {
        try {
            const fromPrivateKey = await this.getPrivateKey(unsignedTx.fromIndex);
            const unsignedRaw = (0, lodash_1.cloneDeep)(unsignedTx.data); // tron modifies unsigned object
            const signedTx = await this.tronweb.trx.sign(unsignedRaw, fromPrivateKey);
            return {
                ...unsignedTx,
                status: lib_common_1.TransactionStatus.Signed,
                data: signedTx,
            };
        }
        catch (e) {
            throw (0, utils_1.toError)(e);
        }
    }
    async broadcastTransaction(tx) {
        /*
         * I’ve discovered that tron nodes like to “remember” every transaction you give it.
         * If you try broadcasting an invalid TX the first time you’ll get a `SIGERROR` but
         * every subsequent broadcast gives a `DUP_TRANSACTION_ERROR`. Which is the exact same
         * error you get after rebroadcasting a valid transaction. And to make things worse,
         * if you try to look up the invalid transaction by ID it tells you `Transaction not found`.
         * So in order to actually determine the status of a broadcast the logic becomes:
         * `success status` -> broadcast succeeded
         * `error status` -> broadcast failed
         * `(DUP_TRANSACTION_ERROR && Transaction found)` -> tx already broadcast
         * `(DUP_TRANASCTION_ERROR && Transaction not found)` -> tx was probably invalid? Maybe? Who knows…
         */
        try {
            const status = await lib_common_1.limiter.schedule(() => this.tronweb.trx.sendRawTransaction(tx.data));
            let success = false;
            let rebroadcast = false;
            if (status.result || status.code === 'SUCCESS') {
                success = true;
            }
            else {
                try {
                    await lib_common_1.limiter.schedule(() => this.tronweb.trx.getTransaction(tx.id));
                    success = true;
                    rebroadcast = true;
                }
                catch (e) {
                    const expiration = tx.data && tx.data.raw_data.expiration;
                    if (expiration && Date.now() > expiration + constants_1.EXPIRATION_FUDGE_MS) {
                        throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxExpired, 'Transaction has expired');
                    }
                }
            }
            if (success) {
                return {
                    id: tx.id,
                    rebroadcast,
                };
            }
            else {
                let statusCode = status.code;
                if (statusCode === 'TRANSACTION_EXPIRATION_ERROR') {
                    throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxExpired, `${statusCode} ${status.message || ''}`);
                }
                if (statusCode === 'DUP_TRANSACTION_ERROR') {
                    statusCode = 'DUP_TX_BUT_TX_NOT_FOUND_SO_PROBABLY_INVALID_TX_ERROR';
                }
                this.logger.warn(`Tron broadcast tx unsuccessful ${tx.id}`, status);
                throw new Error(`Failed to broadcast transaction: ${statusCode} ${status.message}`);
            }
        }
        catch (e) {
            throw (0, utils_1.toError)(e);
        }
    }
    isSweepableBalance(balanceTrx) {
        return this.isAddressBalanceSweepable(balanceTrx);
    }
    usesSequenceNumber() {
        return false;
    }
    async getNextSequenceNumber() {
        return null;
    }
    usesUtxos() {
        return false;
    }
    async getUtxos() {
        return [];
    }
    // HELPERS
    async resolvePayport(payport) {
        if (typeof payport === 'number') {
            return this.getPayport(payport);
        }
        else if (typeof payport === 'string') {
            if (!(0, helpers_1.isValidAddress)(payport)) {
                throw new Error(`Invalid TRON address: ${payport}`);
            }
            return { address: payport };
        }
        else if (this.isValidPayport(payport)) {
            return payport;
        }
        throw new Error(`Invalid TRON payport: ${JSON.stringify(payport)}`);
    }
    async resolveFromTo(from, to) {
        const fromPayport = await this.getPayport(from);
        const toPayport = await this.resolvePayport(to);
        return {
            fromAddress: fromPayport.address,
            fromIndex: from,
            fromExtraId: fromPayport.extraId,
            fromPayport,
            toAddress: toPayport.address,
            toIndex: typeof to === 'number' ? to : null,
            toExtraId: toPayport.extraId,
            toPayport,
        };
    }
    async createMultiOutputTransaction(from, to, options = {}) {
        return null;
    }
    async createMultiInputTransaction(from, to, options = {}) {
        return null;
    }
}
exports.BaseTronPayments = BaseTronPayments;
exports.default = BaseTronPayments;
//# sourceMappingURL=BaseTronPayments.js.map