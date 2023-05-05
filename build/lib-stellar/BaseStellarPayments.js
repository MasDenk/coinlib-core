"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStellarPayments = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const lodash_1 = require("lodash");
const Stellar = __importStar(require("stellar-sdk"));
const types_1 = require("./types");
const StellarPaymentsUtil_1 = require("./StellarPaymentsUtil");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
class BaseStellarPayments extends StellarPaymentsUtil_1.StellarPaymentsUtils {
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
        throw new Error(`Invalid Stellar payport: ${JSON.stringify(payport)}`);
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
            return new lib_common_1.BigNumber(balance).gt(0);
        }
        return this.isAddressBalanceSweepable(balance);
    }
    async getBalance(payportOrIndex) {
        const payport = await this.resolvePayport(payportOrIndex);
        const { address, extraId } = payport;
        if (!(0, ts_common_1.isNil)(extraId)) {
            throw new Error(`Cannot getBalance of stellar payport with extraId ${extraId}, use BalanceMonitor instead`);
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
    resolveIndexFromAddressAndMemo(address, memo) {
        if (address === this.getHotSignatory().address) {
            return 0;
        }
        else if (address === this.getDepositSignatory().address) {
            if (memo) {
                const index = Number.parseInt(memo);
                if (!Number.isNaN(index)) {
                    return index;
                }
            }
            return 1;
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
            throw new Error(`Unsupported ${this.coinSymbol} feeRateType ${targetFeeRateType}`);
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
            throw new Error('stellar-payments create transaction options requires payportBalance when payport extraId is nil');
        }
        const payportBalance = new lib_common_1.BigNumber(options.payportBalance);
        if (payportBalance.isNaN()) {
            throw new Error(`Invalid NaN payportBalance option provided: ${options.payportBalance}`);
        }
        return payportBalance;
    }
    getStellarNetwork() {
        return this.networkType === lib_common_1.NetworkType.Testnet ? Stellar.Networks.TESTNET : Stellar.Networks.PUBLIC;
    }
    serializeTransaction(tx) {
        const xdr = tx.toEnvelope().toXDR('base64');
        return {
            serializedTx: xdr.toString(),
        };
    }
    deserializeTransaction(txData) {
        return new Stellar.Transaction(txData.serializedTx, this.getStellarNetwork());
    }
    async doCreateTransaction(fromTo, feeOption, amount, payportBalance, options) {
        if (amount.isNaN() || amount.lte(0)) {
            throw new Error(`Invalid amount provided to stellar-payments createTransaction: ${amount}`);
        }
        const { fromIndex, fromAddress, fromExtraId, fromPayport, toIndex, toAddress, toExtraId } = fromTo;
        if (fromAddress === toAddress) {
            throw new Error('Cannot create XLM payment transaction sending XLM to self');
        }
        const { targetFeeLevel, targetFeeRate, targetFeeRateType, feeBase, feeMain } = feeOption;
        const seqNo = options.sequenceNumber;
        const sequenceNumber = (0, ts_common_1.toBigNumber)(seqNo);
        const txTimeoutSecs = options.timeoutSeconds || this.config.txTimeoutSeconds || constants_1.DEFAULT_TX_TIMEOUT_SECONDS;
        const amountString = amount.toString();
        const { requiresActivation: fromAddressRequiresActivation, confirmedBalance: fromAddressBalance } = await this.getBalance({ address: fromAddress });
        if (fromAddressRequiresActivation) {
            throw new Error(`Cannot send from unactivated stellar address ${fromAddress} - min balance of ` +
                `${constants_1.MIN_BALANCE} XLM required (${fromAddressBalance} XLM)`);
        }
        const totalValue = amount.plus(feeMain);
        const balanceAfterTx = new lib_common_1.BigNumber(fromAddressBalance).minus(totalValue);
        if (balanceAfterTx.lt(constants_1.MIN_BALANCE)) {
            const reason = balanceAfterTx.lt(0)
                ? 'due to insufficient balance'
                : `because it would reduce the balance below the ${constants_1.MIN_BALANCE} XLM minimum`;
            throw new Error(`Cannot send ${amountString} XLM with fee of ${feeMain} XLM from ${fromAddress} ` +
                `${reason} (${fromAddressBalance} XLM)`);
        }
        if (typeof fromExtraId === 'string' && totalValue.gt(payportBalance)) {
            throw new Error(`Insufficient payport balance of ${payportBalance} XLM to send ${amountString} XLM ` +
                `with fee of ${feeMain} XLM from ${(0, utils_1.serializePayport)(fromPayport)}`);
        }
        const { requiresActivation: toAddressRequiresActivation, confirmedBalance: toAddressBalance } = await this.getBalance({ address: toAddress });
        if (toAddressRequiresActivation && amount.lt(constants_1.MIN_BALANCE)) {
            throw new Error(`Cannot send ${amountString} XLM to recipient ${toAddress} because address requires ` +
                `a balance of at least ${constants_1.MIN_BALANCE} XLM to receive funds (${toAddressBalance} XLM)`);
        }
        const fromAccount = await this.loadAccountOrThrow(fromAddress);
        let sourceAccount = fromAccount;
        if (sequenceNumber) {
            // Stellar creates txs with account sequence + 1, so we must subtract sequenceNumber option first
            sourceAccount = new Stellar.Account(fromAddress, sequenceNumber.minus(1).toString());
        }
        const toAccount = await this.loadAccount(toAddress);
        const operation = toAccount === null
            ? Stellar.Operation.createAccount({
                destination: toAddress,
                startingBalance: amount.toString(),
            })
            : Stellar.Operation.payment({
                destination: toAddress,
                asset: Stellar.Asset.native(),
                amount: amount.toString(),
            });
        const preparedTx = new Stellar.TransactionBuilder(sourceAccount, {
            fee: feeBase,
            networkPassphrase: this.getStellarNetwork(),
            memo: toExtraId ? Stellar.Memo.text(toExtraId) : undefined,
        })
            .addOperation(operation)
            .setTimeout(txTimeoutSecs)
            .build();
        const txData = this.serializeTransaction(preparedTx);
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
            sequenceNumber: preparedTx.sequence,
            data: txData,
        };
    }
    async createTransaction(from, to, amount, options = constants_1.DEFAULT_CREATE_TRANSACTION_OPTIONS) {
        const fromTo = await this.resolveFromTo(from, to);
        const feeOption = await this.resolveFeeOption(options);
        const payportBalance = await this.resolvePayportSpendableBalance(fromTo.fromPayport, options);
        const amountBn = new lib_common_1.BigNumber(amount);
        return this.doCreateTransaction(fromTo, feeOption, amountBn, payportBalance, options);
    }
    async createServiceTransaction() {
        return null;
    }
    async createSweepTransaction(from, to, options = constants_1.DEFAULT_CREATE_TRANSACTION_OPTIONS) {
        const fromTo = await this.resolveFromTo(from, to);
        const feeOption = await this.resolveFeeOption(options);
        const payportBalance = await this.resolvePayportSpendableBalance(fromTo.fromPayport, options);
        const amountBn = payportBalance.minus(feeOption.feeMain);
        if (amountBn.lt(0)) {
            const fromPayport = { address: fromTo.fromAddress, extraId: fromTo.fromExtraId };
            throw new Error(`Insufficient balance to sweep from stellar payport with fee of ${feeOption.feeMain} XLM: ` +
                `${(0, utils_1.serializePayport)(fromPayport)} (${payportBalance} XLM)`);
        }
        return this.doCreateTransaction(fromTo, feeOption, amountBn, payportBalance, options);
    }
    async signTransaction(unsignedTx) {
        (0, ts_common_1.assertType)(types_1.StellarUnsignedTransaction, unsignedTx);
        if (this.isReadOnly()) {
            throw new Error('Cannot sign transaction with read only stellar payments (no xprv or secrets provided)');
        }
        this.logger.debug('signTransaction', unsignedTx.data);
        const preparedTx = this.deserializeTransaction(unsignedTx.data);
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
            throw new Error(`Cannot sign stellar transaction from address ${unsignedTx.fromAddress}`);
        }
        const keypair = (0, ts_common_1.isString)(secret) ? Stellar.Keypair.fromSecret(secret) : secret;
        preparedTx.sign(keypair);
        const signedData = this.serializeTransaction(preparedTx);
        return {
            ...unsignedTx,
            id: '',
            data: signedData,
            status: lib_common_1.TransactionStatus.Signed,
        };
    }
    async broadcastTransaction(signedTx) {
        (0, ts_common_1.assertType)(types_1.StellarSignedTransaction, signedTx);
        const preparedTx = this.deserializeTransaction(signedTx.data);
        let rebroadcast = false;
        try {
            const existing = await this.getTransactionInfo(signedTx.id);
            rebroadcast = existing.id === signedTx.id;
        }
        catch (e) { }
        let result;
        try {
            result = await lib_common_1.limiter.schedule(() => this.getApi().submitTransaction(preparedTx));
        }
        catch (e) {
            if ((0, utils_1.isMatchingError)(e, ['tx_too_late'])) {
                throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxExpired, 'Transaction has expired (tx_too_late)');
            }
            if ((0, utils_1.isMatchingError)(e, ['Request failed with status code'])) {
                throw new Error(`submitTransaction failed: ${e.message} -- ${JSON.stringify((e.response || {}).data)}`);
            }
            throw e;
        }
        this.logger.debug('broadcasted', (0, utils_1.omitHidden)(result));
        return {
            id: result.hash,
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
exports.BaseStellarPayments = BaseStellarPayments;
//# sourceMappingURL=BaseStellarPayments.js.map