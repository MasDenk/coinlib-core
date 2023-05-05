"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRipplePayments = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const lodash_1 = require("lodash");
const types_1 = require("./types");
const RipplePaymentsUtils_1 = require("./RipplePaymentsUtils");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
function extraIdToTag(extraId) {
    return (0, ts_common_1.isNil)(extraId) ? undefined : Number.parseInt(extraId);
}
function serializePayport(payport) {
    return (0, ts_common_1.isNil)(payport.extraId) ? payport.address : `${payport.address}/${payport.extraId}`;
}
class BaseRipplePayments extends RipplePaymentsUtils_1.RipplePaymentsUtils {
    constructor(config) {
        super(config);
        this.config = config;
    }
    getFullConfig() {
        return this.config;
    }
    getPublicConfig() {
        return {
            ...(0, lodash_1.omit)(this.config, constants_1.PUBLIC_CONFIG_OMIT_FIELDS),
            ...this.getPublicAccountConfig(),
        };
    }
    doGetPayport(index) {
        if (index === 0) {
            return { address: this.getHotSignatory().address };
        }
        if (index === 1) {
            return { address: this.getDepositSignatory().address };
        }
        return { address: this.getDepositSignatory().address, extraId: String(index) };
    }
    doResolvePayport(payport) {
        if (typeof payport === 'number') {
            return this.doGetPayport(payport);
        }
        else if (typeof payport === 'string') {
            (0, helpers_1.assertValidAddress)(payport);
            return { address: payport };
        }
        else if (lib_common_1.Payport.is(payport)) {
            (0, helpers_1.assertValidAddress)(payport.address);
            (0, helpers_1.assertValidExtraIdOrNil)(payport.extraId);
            return payport;
        }
        throw new Error(`Invalid Ripple payport: ${JSON.stringify(payport)}`);
    }
    async resolvePayport(payport) {
        return this.doResolvePayport(payport);
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
    async getPayport(index) {
        return this.doGetPayport(index);
    }
    requiresBalanceMonitor() {
        return true;
    }
    getAddressesToMonitor() {
        return [this.getHotSignatory().address, this.getDepositSignatory().address];
    }
    isSweepableBalance(balance, payport) {
        if (payport && this.doResolvePayport(payport).extraId) {
            // Payports with extraId don't care about min balance
            return new lib_common_1.BigNumber(balance).gt(0);
        }
        return this.isAddressBalanceSweepable(balance);
    }
    /**
     * @deprecated use createServiceTransaction instead
     */
    async initAccounts() { }
    async getBalance(payportOrIndex) {
        const payport = await this.resolvePayport(payportOrIndex);
        const { address, extraId } = payport;
        if (!(0, ts_common_1.isNil)(extraId)) {
            throw new Error(`Cannot getBalance of ripple payport with extraId ${extraId}, use BalanceMonitor instead`);
        }
        return this.getAddressBalance(address);
    }
    usesUtxos() {
        return false;
    }
    async getUtxos() {
        return [];
    }
    usesSequenceNumber() {
        return true;
    }
    async getNextSequenceNumber(payportOrIndex) {
        const payport = await this.resolvePayport(payportOrIndex);
        return this.getAddressNextSequenceNumber(payport.address);
    }
    resolveIndexFromAdjustment(adjustment) {
        const { address, tag } = adjustment;
        if (address === this.getHotSignatory().address) {
            return 0;
        }
        else if (address === this.getDepositSignatory().address) {
            return tag || 1;
        }
        return null;
    }
    async resolveFeeOption(feeOption) {
        let targetFeeLevel;
        let targetFeeRate;
        let targetFeeRateType;
        let feeMain;
        let feeBase;
        if (lib_common_1.FeeOptionCustom.is(feeOption)) {
            targetFeeLevel = feeOption.feeLevel || lib_common_1.FeeLevel.Custom;
            targetFeeRate = feeOption.feeRate;
            targetFeeRateType = feeOption.feeRateType;
        }
        else {
            targetFeeLevel = feeOption.feeLevel || constants_1.DEFAULT_FEE_LEVEL;
            const { feeRate, feeRateType } = await this.getFeeRateRecommendation(targetFeeLevel);
            targetFeeRate = feeRate;
            targetFeeRateType = feeRateType;
        }
        if (targetFeeRateType === lib_common_1.FeeRateType.Base) {
            feeBase = targetFeeRate;
            feeMain = this.toMainDenomination(feeBase);
        }
        else if (targetFeeRateType === lib_common_1.FeeRateType.Main) {
            feeMain = targetFeeRate;
            feeBase = this.toBaseDenomination(feeMain);
        }
        else {
            throw new Error(`Unsupported ripple feeRateType ${targetFeeRateType}`);
        }
        return {
            targetFeeLevel,
            targetFeeRate,
            targetFeeRateType,
            feeMain,
            feeBase,
        };
    }
    async resolvePayportSpendableBalance(fromPayport, options) {
        if ((0, ts_common_1.isNil)(fromPayport.extraId)) {
            const balances = await this.getBalance(fromPayport);
            return new lib_common_1.BigNumber(balances.spendableBalance);
        }
        if (typeof options.payportBalance !== 'string') {
            throw new Error('ripple-payments create transaction options requires payportBalance when payport extraId is nil');
        }
        const payportBalance = new lib_common_1.BigNumber(options.payportBalance);
        if (payportBalance.isNaN()) {
            throw new Error(`Invalid NaN payportBalance option provided: ${options.payportBalance}`);
        }
        return payportBalance;
    }
    async assertSufficientAddressBalance(address, amount, feeMain) {
        const { requiresActivation, confirmedBalance } = await this.getBalance({ address });
        if (requiresActivation) {
            throw new Error(`Cannot send from unactivated ripple address ${address} - min balance of ` +
                `${constants_1.MIN_BALANCE} XRP required (${confirmedBalance} XRP)`);
        }
        const balanceAfterTx = new lib_common_1.BigNumber(confirmedBalance).minus(amount).minus(feeMain);
        if (balanceAfterTx.lt(constants_1.MIN_BALANCE)) {
            const reason = balanceAfterTx.lt(0)
                ? 'due to insufficient balance'
                : `because it would reduce the balance below the ${constants_1.MIN_BALANCE} XRP minimum`;
            throw new Error(`Cannot send ${amount} XRP with fee of ${feeMain} XRP from ${address} ` + `${reason} (${confirmedBalance} XRP)`);
        }
    }
    async doCreateTransaction(fromTo, feeOption, amount, payportBalance, options) {
        if (amount.isNaN() || amount.lte(0)) {
            throw new Error(`Invalid amount provided to ripple-payments createTransaction: ${amount}`);
        }
        const { fromIndex, fromAddress, fromExtraId, fromPayport, toIndex, toAddress, toExtraId } = fromTo;
        if (fromAddress === toAddress) {
            throw new Error('Cannot create XRP payment transaction sending XRP to self');
        }
        const { targetFeeLevel, targetFeeRate, targetFeeRateType, feeMain } = feeOption;
        const { sequenceNumber } = options;
        const maxLedgerVersionOffset = options.maxLedgerVersionOffset || this.config.maxLedgerVersionOffset || constants_1.DEFAULT_MAX_LEDGER_VERSION_OFFSET;
        const amountString = amount.toString();
        await this.assertSufficientAddressBalance(fromAddress, amountString, feeMain);
        const totalValue = amount.plus(feeMain);
        if (typeof fromExtraId === 'string' && totalValue.gt(payportBalance)) {
            throw new Error(`Insufficient payport balance of ${payportBalance} XRP to send ${amountString} XRP ` +
                `with fee of ${feeMain} XRP from ${serializePayport(fromPayport)}`);
        }
        const { requiresActivation: toAddressRequiresActivation, confirmedBalance: toAddressBalance } = await this.getBalance({ address: toAddress });
        if (toAddressRequiresActivation && amount.lt(constants_1.MIN_BALANCE)) {
            throw new Error(`Cannot send ${amountString} XRP to recipient ${toAddress} because address requires ` +
                `a balance of at least ${constants_1.MIN_BALANCE} XRP to receive funds (${toAddressBalance} XRP)`);
        }
        const preparedTx = await lib_common_1.limiter.schedule(() => this.api.preparePayment(fromAddress, {
            source: {
                address: fromAddress,
                tag: extraIdToTag(fromExtraId),
                maxAmount: {
                    currency: 'XRP',
                    value: amountString,
                },
            },
            destination: {
                address: toAddress,
                tag: extraIdToTag(toExtraId),
                amount: {
                    currency: 'XRP',
                    value: amountString,
                },
            },
        }, {
            fee: feeMain,
            maxLedgerVersionOffset,
            sequence: (0, ts_common_1.isUndefined)(sequenceNumber) ? sequenceNumber : new lib_common_1.BigNumber(sequenceNumber).toNumber(),
        }));
        return {
            status: lib_common_1.TransactionStatus.Unsigned,
            id: null,
            fromIndex,
            fromAddress,
            fromExtraId,
            toIndex,
            toAddress,
            toExtraId,
            amount: amountString,
            targetFeeLevel,
            targetFeeRate,
            targetFeeRateType,
            fee: feeMain,
            sequenceNumber: String(preparedTx.instructions.sequence),
            data: preparedTx,
        };
    }
    async createTransaction(from, to, amount, options = constants_1.DEFAULT_CREATE_TRANSACTION_OPTIONS) {
        const fromTo = await this.resolveFromTo(from, to);
        const feeOption = await this.resolveFeeOption(options);
        const payportBalance = await this.resolvePayportSpendableBalance(fromTo.fromPayport, options);
        const amountBn = new lib_common_1.BigNumber(amount);
        return this.doCreateTransaction(fromTo, feeOption, amountBn, payportBalance, options);
    }
    async createServiceTransaction(from, options = constants_1.DEFAULT_CREATE_TRANSACTION_OPTIONS) {
        const { address } = await this.getPayport(from);
        const settings = await this.api.getSettings(address);
        if (settings.requireDestinationTag) {
            throw new Error(`Ripple require destination tag setting already enabled on ${address}`);
        }
        const { targetFeeLevel, targetFeeRate, targetFeeRateType, feeMain } = await this.resolveFeeOption(options);
        await this.assertSufficientAddressBalance(address, '0', feeMain);
        const { sequenceNumber } = options;
        const maxLedgerVersionOffset = options.maxLedgerVersionOffset || this.config.maxLedgerVersionOffset || constants_1.DEFAULT_MAX_LEDGER_VERSION_OFFSET;
        const preparedTx = await lib_common_1.limiter.schedule(() => this.api.prepareSettings(address, {
            requireDestinationTag: true,
        }, {
            fee: feeMain,
            maxLedgerVersionOffset,
            sequence: (0, ts_common_1.isUndefined)(sequenceNumber) ? sequenceNumber : new lib_common_1.BigNumber(sequenceNumber).toNumber(),
        }));
        return {
            status: lib_common_1.TransactionStatus.Unsigned,
            id: null,
            fromIndex: from,
            fromAddress: address,
            fromExtraId: null,
            toIndex: null,
            toAddress: '',
            toExtraId: null,
            amount: '',
            targetFeeLevel,
            targetFeeRate,
            targetFeeRateType,
            fee: feeMain,
            sequenceNumber: String(preparedTx.instructions.sequence),
            data: preparedTx,
        };
    }
    async createSweepTransaction(from, to, options = constants_1.DEFAULT_CREATE_TRANSACTION_OPTIONS) {
        const fromTo = await this.resolveFromTo(from, to);
        const feeOption = await this.resolveFeeOption(options);
        const payportBalance = await this.resolvePayportSpendableBalance(fromTo.fromPayport, options);
        const amountBn = payportBalance.minus(feeOption.feeMain);
        if (amountBn.lt(0)) {
            const fromPayport = { address: fromTo.fromAddress, extraId: fromTo.fromExtraId };
            throw new Error(`Insufficient balance to sweep with fee of ${feeOption.feeMain} XRP from ripple payport ` +
                `${serializePayport(fromPayport)} (${payportBalance} XRP)`);
        }
        return this.doCreateTransaction(fromTo, feeOption, amountBn, payportBalance, options);
    }
    async signTransaction(unsignedTx) {
        (0, ts_common_1.assertType)(types_1.RippleUnsignedTransaction, unsignedTx);
        if (this.isReadOnly()) {
            throw new Error('Cannot sign transaction with read only ripple payments (no xprv or secrets provided)');
        }
        this.logger.debug('signTransaction', unsignedTx.data);
        const { txJSON } = unsignedTx.data;
        let secret;
        const hotSignatory = this.getHotSignatory();
        const depositSignatory = this.getDepositSignatory();
        if (unsignedTx.fromAddress === hotSignatory.address) {
            secret = hotSignatory.secret;
        }
        else if (unsignedTx.fromAddress === depositSignatory.address) {
            secret = depositSignatory.secret;
        }
        else {
            throw new Error(`Cannot sign ripple transaction from address ${unsignedTx.fromAddress}`);
        }
        const signResult = this.api.sign(txJSON, secret);
        return {
            ...unsignedTx,
            id: signResult.id,
            data: signResult,
            status: lib_common_1.TransactionStatus.Signed,
        };
    }
    async broadcastTransaction(signedTx) {
        (0, ts_common_1.assertType)(types_1.RippleSignedTransaction, signedTx);
        const signedTxString = signedTx.data.signedTransaction;
        let rebroadcast = false;
        try {
            const existing = await this.getTransactionInfo(signedTx.id);
            rebroadcast = existing.id === signedTx.id;
        }
        catch (e) { }
        const result = (await lib_common_1.limiter.schedule(() => this.api.submit(signedTxString, true)));
        this.logger.debug('broadcasted', result);
        const resultCode = result.engine_result || result.resultCode || '';
        if (resultCode === 'terPRE_SEQ') {
            throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxSequenceTooHigh, resultCode);
        }
        if (!rebroadcast) {
            // Sometimes these errors come up even after tx is confirmed
            if (resultCode === 'tefPAST_SEQ') {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxSequenceCollision, resultCode);
            }
            if (resultCode === 'tefMAX_LEDGER') {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxExpired, resultCode);
            }
        }
        const okay = resultCode.startsWith('tes') || // successful
            resultCode.startsWith('ter') || // retryable
            resultCode.startsWith('tec') || // not executed, but fee lost
            resultCode === 'tefPAST_SEQ' || // handled above
            resultCode === 'tefMAX_LEDGER'; // handled above
        if (!okay) {
            throw new Error(`Failed to broadcast ripple tx ${signedTx.id} with result code ${resultCode}`);
        }
        return {
            id: signedTx.id,
            rebroadcast,
            data: result,
        };
    }
    async createMultiOutputTransaction(from, to, options = {}) {
        return null;
    }
    async createMultiInputTransaction(from, to, options = {}) {
        return null;
    }
}
exports.BaseRipplePayments = BaseRipplePayments;
//# sourceMappingURL=BaseRipplePayments.js.map