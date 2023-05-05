"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEthereumPayments = void 0;
const ethereumjs_tx_1 = require("ethereumjs-tx");
const lodash_1 = require("lodash");
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const constants_1 = require("./constants");
const EthereumPaymentsUtils_1 = require("./EthereumPaymentsUtils");
class BaseEthereumPayments extends EthereumPaymentsUtils_1.EthereumPaymentsUtils {
    constructor(config) {
        super(config);
        this.config = config;
        this.depositKeyIndex = typeof config.depositKeyIndex === 'undefined' ? constants_1.DEPOSIT_KEY_INDEX : config.depositKeyIndex;
    }
    getFullConfig() {
        return this.config;
    }
    async resolvePayport(payport) {
        // NOTE: this type of nesting suggests to revise payport as an abstraction
        if (typeof payport === 'number') {
            return this.getPayport(payport);
        }
        else if (typeof payport === 'string') {
            if (!this.isValidAddress(payport)) {
                throw new Error(`Invalid Ethereum address: ${payport}`);
            }
            return { address: payport.toLowerCase() };
        }
        if (this.isValidPayport(payport)) {
            return { ...payport, address: payport.address.toLowerCase() };
        }
        throw new Error(`Invalid Ethereum payport: ${JSON.stringify(payport)}`);
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
    async resolveFeeOption(feeOption, amountOfGas = constants_1.ETHEREUM_TRANSFER_COST) {
        if (new lib_common_1.BigNumber(amountOfGas).dp() > 0) {
            throw new Error(`Amount of gas must be a whole number ${amountOfGas}`);
        }
        return (0, ts_common_1.isType)(lib_common_1.FeeOptionCustom, feeOption)
            ? this.resolveCustomFeeOption(feeOption, amountOfGas)
            : this.resolveLeveledFeeOption(feeOption.feeLevel, amountOfGas);
    }
    resolveCustomFeeOption(feeOption, amountOfGas) {
        const { feeRate, feeRateType } = feeOption;
        // Determine the gas price first
        let gasPrice;
        if (feeRateType === lib_common_1.FeeRateType.BasePerWeight) {
            gasPrice = new lib_common_1.BigNumber(feeRate);
        }
        else {
            const feeRateBase = feeRateType === lib_common_1.FeeRateType.Main ? this.toBaseDenominationBigNumberEth(feeRate) : new lib_common_1.BigNumber(feeRate);
            gasPrice = feeRateBase.dividedBy(amountOfGas);
        }
        gasPrice = gasPrice.dp(0, lib_common_1.BigNumber.ROUND_DOWN); // Round down to avoid exceeding target
        // Calculate the actual total fees after gas price is rounded
        const feeBase = gasPrice.multipliedBy(amountOfGas);
        const feeMain = this.toMainDenominationBigNumberEth(feeBase);
        return {
            targetFeeRate: feeOption.feeRate,
            targetFeeLevel: lib_common_1.FeeLevel.Custom,
            targetFeeRateType: feeOption.feeRateType,
            feeBase: feeBase.toFixed(),
            feeMain: feeMain.toFixed(),
            gasPrice: gasPrice.toFixed(),
        };
    }
    async resolveLeveledFeeOption(feeLevel = constants_1.DEFAULT_FEE_LEVEL, amountOfGas) {
        const gasPrice = new lib_common_1.BigNumber(await this.networkData.getGasPrice(feeLevel));
        const feeBase = gasPrice.multipliedBy(amountOfGas).toFixed();
        return {
            targetFeeRate: gasPrice.toFixed(),
            targetFeeLevel: feeLevel,
            targetFeeRateType: lib_common_1.FeeRateType.BasePerWeight,
            feeBase,
            feeMain: this.toMainDenominationEth(feeBase),
            gasPrice: gasPrice.toFixed(),
        };
    }
    requiresBalanceMonitor() {
        return false;
    }
    async getAvailableUtxos() {
        return [];
    }
    async getUtxos() {
        return [];
    }
    usesSequenceNumber() {
        return true;
    }
    usesUtxos() {
        return false;
    }
    async getBalance(resolveablePayport) {
        const payport = await this.resolvePayport(resolveablePayport);
        return this.getAddressBalance(payport.address);
    }
    async isSweepableBalance(balance) {
        return this.isAddressBalanceSweepable(balance);
    }
    async getNextSequenceNumber(payport) {
        const resolvedPayport = await this.resolvePayport(payport);
        return this.getAddressNextSequenceNumber(resolvedPayport.address);
    }
    async createTransaction(from, to, amountEth, options = {}) {
        this.logger.debug('createTransaction', from, to, amountEth);
        return this.createTransactionObject(from, to, amountEth, options);
    }
    async createServiceTransaction(from = this.depositKeyIndex, options = {}) {
        this.logger.debug('createDepositTransaction', from);
        return this.createTransactionObject(from, undefined, '', options);
    }
    async createJoinedTransaction() {
        return null;
    }
    async createSweepTransaction(from, to, options = {}) {
        this.logger.debug('createSweepTransaction', from, to);
        return this.createTransactionObject(from, to, 'max', options);
    }
    async createMultiOutputTransaction(from, to, options = {}) {
        return null;
    }
    async createMultiInputTransaction(from, to, options = {}) {
        return null;
    }
    async signTransaction(unsignedTx) {
        const fromPrivateKey = await this.getPrivateKey(unsignedTx.fromIndex);
        const payport = await this.getPayport(unsignedTx.fromIndex);
        const unsignedRaw = (0, lodash_1.cloneDeep)(unsignedTx.data);
        const extraParam = this.networkType === lib_common_1.NetworkType.Testnet ? { chain: 'ropsten' } : undefined;
        const tx = new ethereumjs_tx_1.Transaction(unsignedRaw, extraParam);
        const key = Buffer.from(fromPrivateKey.slice(2), 'hex');
        tx.sign(key);
        const result = {
            ...unsignedTx,
            id: `0x${tx.hash().toString('hex')}`,
            status: lib_common_1.TransactionStatus.Signed,
            data: {
                hex: `0x${tx.serialize().toString('hex')}`,
            },
        };
        this.logger.debug('signTransaction result', result);
        return result;
    }
    sendTransactionWithoutConfirmation(txHex) {
        return lib_common_1.limiter.schedule(() => new Promise((resolve, reject) => {
            let done = false;
            const errorHandler = (e) => {
                if (!done) {
                    done = true;
                    reject(e);
                }
            };
            const successHandler = (hash) => {
                if (!done) {
                    done = true;
                    resolve(hash);
                }
            };
            this.eth
                .sendSignedTransaction(txHex)
                .on('transactionHash', successHandler)
                .on('error', errorHandler)
                .then((r) => successHandler(r.transactionHash))
                .catch(errorHandler);
        }));
    }
    async broadcastTransaction(tx) {
        if (tx.status !== lib_common_1.TransactionStatus.Signed) {
            throw new Error(`Tx ${tx.id} has not status ${lib_common_1.TransactionStatus.Signed}`);
        }
        try {
            if (this.config.blockbookNode) {
                const url = `${this.config.blockbookNode}/api/sendtx/${tx.data.hex}`;
                request_promise_native_1.default
                    .get(url, { json: true })
                    .then((res) => this.logger.log(`Successful secondary broadcast to blockbook ethereum ${res.result}`))
                    .catch((e) => this.logger.log(`Failed secondary broadcast to blockbook ethereum ${tx.id}: ${url} - ${e}`));
            }
            const txId = await this.sendTransactionWithoutConfirmation(tx.data.hex);
            return {
                id: txId,
            };
        }
        catch (e) {
            if ((0, ts_common_1.isMatchingError)(e, ['already known'])) {
                this.logger.log(`Ethereum broadcast tx already known ${tx.id}`);
                return {
                    id: tx.id,
                };
            }
            this.logger.warn(`Ethereum broadcast tx unsuccessful ${tx.id}: ${e.message}`);
            if ((0, ts_common_1.isMatchingError)(e, ['nonce too low'])) {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxSequenceCollision, e.message);
            }
            throw new Error(`Ethereum broadcast tx unsuccessful: ${tx.id} ${e.message}`);
        }
    }
    /** Helper for determining what gas limit should be used when creating tx. Prefer provided option over estimate. */
    async gasOptionOrEstimate(options, txObject, txType) {
        if (options.gas) {
            return new lib_common_1.BigNumber(options.gas).dp(0, lib_common_1.BigNumber.ROUND_UP).toNumber();
        }
        return this.networkData.estimateGas(txObject, txType);
    }
    async createTransactionObject(from, to, amountEth, options = {}) {
        var _a;
        const serviceFlag = amountEth === '' && typeof to === 'undefined';
        const sweepFlag = amountEth === 'max';
        const txType = serviceFlag ? 'CONTRACT_DEPLOY' : 'ETHEREUM_TRANSFER';
        const fromPayport = await this.getPayport(from);
        const toPayport = serviceFlag ? { address: '' } : await this.resolvePayport(to);
        const toIndex = typeof to === 'number' ? to : null;
        const txConfig = { from: fromPayport.address };
        if (serviceFlag) {
            if (options.data) {
                txConfig.data = options.data;
            }
            else if (options.proxyAddress) {
                txConfig.data = constants_1.TOKEN_PROXY_DATA.replace(/<address to proxy>/g, options.proxyAddress.replace('0x', '').toLowerCase());
            }
            else {
                txConfig.data = constants_1.TOKEN_WALLET_DATA;
            }
        }
        if (toPayport.address) {
            txConfig.to = toPayport.address;
        }
        const amountOfGas = await this.gasOptionOrEstimate(options, txConfig, txType);
        const feeOption = await this.resolveFeeOption(options, amountOfGas);
        const { confirmedBalance: balanceEth } = await this.getBalance(fromPayport);
        const nonce = options.sequenceNumber || (await this.getNextSequenceNumber(fromPayport.address));
        const { feeMain, feeBase } = feeOption;
        const feeWei = new lib_common_1.BigNumber(feeBase);
        const maxFeePercent = new lib_common_1.BigNumber((_a = options.maxFeePercent) !== null && _a !== void 0 ? _a : lib_common_1.DEFAULT_MAX_FEE_PERCENT);
        const balanceWei = this.toBaseDenominationBigNumberEth(balanceEth);
        let amountWei = new lib_common_1.BigNumber(0);
        if (balanceWei.eq(0)) {
            throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxInsufficientBalance, `${fromPayport.address} No balance available (${balanceEth})`);
        }
        if (sweepFlag) {
            amountWei = balanceWei.minus(feeWei);
            if (balanceWei.isLessThan(feeWei)) {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxFeeTooHigh, `${fromPayport.address} Insufficient balance (${balanceEth}) to pay sweep fee of ${feeMain}`);
            }
            if (feeWei.gt(maxFeePercent.times(balanceWei))) {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxFeeTooHigh, `${fromPayport.address} Sweep fee (${feeMain}) exceeds max fee percent (${maxFeePercent}%) of address balance (${balanceEth})`);
            }
        }
        else if (!sweepFlag && !serviceFlag) {
            amountWei = this.toBaseDenominationBigNumberEth(amountEth);
            if (amountWei.plus(feeWei).isGreaterThan(balanceWei)) {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxInsufficientBalance, `${fromPayport.address} Insufficient balance (${balanceEth}) to send ${amountEth} including fee of ${feeOption.feeMain}`);
            }
            if (feeWei.gt(maxFeePercent.times(amountWei))) {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxFeeTooHigh, `${fromPayport.address} Sweep fee (${feeMain}) exceeds max fee percent (${maxFeePercent}%) of send amount (${amountEth})`);
            }
        }
        else {
            if (balanceWei.isLessThan(feeWei)) {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxFeeTooHigh, `${fromPayport.address} Insufficient balance (${balanceEth}) to pay contract deploy fee of ${feeOption.feeMain}`);
            }
        }
        const result = {
            id: null,
            status: lib_common_1.TransactionStatus.Unsigned,
            fromAddress: fromPayport.address,
            fromIndex: from,
            toAddress: serviceFlag ? '' : toPayport.address,
            toIndex,
            toExtraId: null,
            amount: serviceFlag ? '' : this.toMainDenomination(amountWei),
            fee: feeOption.feeMain,
            targetFeeLevel: feeOption.targetFeeLevel,
            targetFeeRate: feeOption.targetFeeRate,
            targetFeeRateType: feeOption.targetFeeRateType,
            weight: amountOfGas,
            sequenceNumber: nonce.toString(),
            data: {
                ...txConfig,
                value: `0x${amountWei.toString(16)}`,
                gas: `0x${amountOfGas.toString(16)}`,
                gasPrice: `0x${new lib_common_1.BigNumber(feeOption.gasPrice).toString(16)}`,
                nonce: `0x${new lib_common_1.BigNumber(nonce).toString(16)}`,
            },
        };
        this.logger.debug('createTransactionObject result', result);
        return result;
    }
}
exports.BaseEthereumPayments = BaseEthereumPayments;
exports.default = BaseEthereumPayments;
//# sourceMappingURL=BaseEthereumPayments.js.map