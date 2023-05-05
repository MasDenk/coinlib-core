"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarPaymentsUtils = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const helpers_1 = require("./helpers");
const StellarConnected_1 = require("./StellarConnected");
const constants_1 = require("./constants");
class StellarPaymentsUtils extends StellarConnected_1.StellarConnected {
    constructor() {
        super(...arguments);
        this.coinSymbol = constants_1.COIN_SYMBOL;
        this.coinName = constants_1.COIN_NAME;
        this.coinDecimals = constants_1.DECIMAL_PLACES;
    }
    isValidExtraId(extraId) {
        return (0, helpers_1.isValidExtraId)(extraId);
    }
    isValidAddress(address) {
        return (0, helpers_1.isValidAddress)(address);
    }
    standardizeAddress(address) {
        if (!(0, helpers_1.isValidAddress)(address)) {
            return null;
        }
        return address;
    }
    async _getPayportValidationMessage(payport) {
        const { address, extraId } = payport;
        if (!this.isValidAddress(address)) {
            return 'Invalid payport address';
        }
        if (!(0, ts_common_1.isNil)(extraId) && !this.isValidExtraId(extraId)) {
            return 'Invalid payport extraId';
        }
    }
    async getPayportValidationMessage(payport) {
        try {
            payport = (0, ts_common_1.assertType)(lib_common_1.Payport, payport, 'payport');
        }
        catch (e) {
            return e.message;
        }
        return this._getPayportValidationMessage(payport);
    }
    async validatePayport(payport) {
        (0, ts_common_1.assertType)(lib_common_1.Payport, payport, 'payport');
        const message = await this._getPayportValidationMessage(payport);
        if (message) {
            throw new Error(message);
        }
    }
    async isValidPayport(payport) {
        if (!lib_common_1.Payport.is(payport)) {
            return false;
        }
        return !(await this._getPayportValidationMessage(payport));
    }
    toMainDenomination(amount) {
        return (0, helpers_1.toMainDenominationString)(amount);
    }
    toBaseDenomination(amount) {
        return (0, helpers_1.toBaseDenominationString)(amount);
    }
    async getFeeRateRecommendation(level) {
        const feeStats = await lib_common_1.limiter.schedule(() => this.getApi().feeStats());
        let feeBase = feeStats.fee_charged.p10;
        if (level === lib_common_1.FeeLevel.Medium) {
            feeBase = feeStats.fee_charged.p50;
        }
        else if (level === lib_common_1.FeeLevel.High) {
            feeBase = feeStats.fee_charged.p95;
        }
        return {
            feeRate: feeBase,
            feeRateType: lib_common_1.FeeRateType.Base,
        };
    }
    async getCurrentBlockNumber() {
        return lib_common_1.limiter.schedule(async () => (await this.getBlock()).height);
    }
    async getAddressUtxos() {
        return [];
    }
    isAddressBalanceSweepable(balance) {
        return new lib_common_1.BigNumber(balance).gt(constants_1.MIN_BALANCE);
    }
    async loadAccount(address) {
        let accountInfo;
        try {
            accountInfo = await lib_common_1.limiter.schedule(() => this.getApi().loadAccount(address));
        }
        catch (e) {
            if ((0, ts_common_1.isMatchingError)(e, constants_1.NOT_FOUND_ERRORS)) {
                this.logger.debug(`Address ${address} not found`);
                return null;
            }
            throw e;
        }
        // this.logger.debug(`api.loadAccount ${address}`, omitHidden(accountInfo))
        return accountInfo;
    }
    async loadAccountOrThrow(address) {
        const accountInfo = await this.loadAccount(address);
        if (accountInfo === null) {
            throw new Error(`Account not found ${address}`);
        }
        return accountInfo;
    }
    async getAddressBalance(address) {
        const accountInfo = await this.loadAccount(address);
        if (accountInfo === null) {
            return {
                confirmedBalance: '0',
                unconfirmedBalance: '0',
                spendableBalance: '0',
                sweepable: false,
                requiresActivation: true,
                minimumBalance: String(constants_1.MIN_BALANCE),
            };
        }
        const balanceLine = accountInfo.balances.find((line) => line.asset_type === 'native');
        const amountMain = new lib_common_1.BigNumber(balanceLine && balanceLine.balance ? balanceLine.balance : '0');
        const spendableBalance = amountMain.minus(constants_1.MIN_BALANCE);
        return {
            confirmedBalance: amountMain.toString(),
            unconfirmedBalance: '0',
            spendableBalance: spendableBalance.toString(),
            sweepable: this.isAddressBalanceSweepable(amountMain),
            requiresActivation: amountMain.lt(constants_1.MIN_BALANCE),
            minimumBalance: String(constants_1.MIN_BALANCE),
        };
    }
    async getAddressNextSequenceNumber(address) {
        const accountInfo = await this.loadAccountOrThrow(address);
        return new lib_common_1.BigNumber(accountInfo.sequence).plus(1).toString();
    }
    async getLatestBlock() {
        const page = await lib_common_1.limiter.schedule(() => this.getApi().ledgers().order('desc').limit(1).call());
        if (!page.records) {
            throw new Error('Failed to get stellar ledger records');
        }
        return page.records[0];
    }
    async getTransactionInfo(txId) {
        let tx;
        try {
            tx = await lib_common_1.limiter.schedule(() => this.getApi().transactions().transaction(txId).call());
        }
        catch (e) {
            const eString = e.toString();
            if (constants_1.NOT_FOUND_ERRORS.some((type) => eString.includes(type))) {
                throw new Error(`Transaction not found: ${eString}`);
            }
            throw e;
        }
        // this.logger.debug('getTransactionInfo', txId, omitHidden(tx))
        const { amount, fee, fromAddress, toAddress } = await this._normalizeTxOperation(tx);
        const confirmationNumber = tx.ledger_attr;
        const ledger = await lib_common_1.limiter.schedule(() => tx.ledger());
        const currentLedger = await this.getLatestBlock();
        const currentLedgerSequence = currentLedger.sequence;
        const confirmationId = ledger.hash;
        const confirmationTimestamp = ledger.closed_at ? new Date(ledger.closed_at) : null;
        const confirmations = currentLedgerSequence - confirmationNumber;
        const sequenceNumber = tx.source_account_sequence;
        const isExecuted = tx.successful;
        const isConfirmed = Boolean(confirmationNumber);
        const status = isConfirmed || isExecuted ? lib_common_1.TransactionStatus.Confirmed : lib_common_1.TransactionStatus.Pending;
        return {
            status,
            id: tx.id,
            fromIndex: null,
            fromAddress,
            fromExtraId: null,
            toIndex: null,
            toAddress,
            toExtraId: tx.memo || null,
            amount: amount.toString(),
            fee: fee.toString(),
            sequenceNumber,
            confirmationId,
            confirmationNumber: String(confirmationNumber),
            confirmationTimestamp,
            isExecuted,
            isConfirmed,
            confirmations,
            data: tx,
        };
    }
}
exports.StellarPaymentsUtils = StellarPaymentsUtils;
//# sourceMappingURL=StellarPaymentsUtil.js.map