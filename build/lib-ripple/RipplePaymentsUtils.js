"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RipplePaymentsUtils = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const helpers_1 = require("./helpers");
const RippleConnected_1 = require("./RippleConnected");
const constants_1 = require("./constants");
class RipplePaymentsUtils extends RippleConnected_1.RippleConnected {
    constructor() {
        super(...arguments);
        this.coinSymbol = constants_1.COIN_SYMBOL;
        this.coinName = constants_1.COIN_NAME;
        this.coinDecimals = constants_1.DECIMAL_PLACES;
        this.isValidXprv = helpers_1.isValidXprv;
        this.isValidXpub = helpers_1.isValidXpub;
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
        let requireExtraId = false;
        try {
            const settings = await lib_common_1.limiter.schedule(() => this.api.getSettings(address));
            requireExtraId = settings.requireDestinationTag || false;
        }
        catch (e) {
            this.logger.log(`getPayportValidationMessage failed to retrieve settings for ${address} - ${e.message}`);
        }
        if ((0, ts_common_1.isNil)(extraId)) {
            if (requireExtraId) {
                return `Payport extraId is required for address ${address} with ripple requireDestinationTag setting enabled`;
            }
        }
        else if (!this.isValidExtraId(extraId)) {
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
        payport = (0, ts_common_1.assertType)(lib_common_1.Payport, payport, 'payport');
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
        const feeMain = await lib_common_1.limiter.schedule(() => this.api.getFee(constants_1.FEE_LEVEL_CUSHIONS[level]));
        return {
            feeRate: feeMain,
            feeRateType: lib_common_1.FeeRateType.Main,
        };
    }
    async getCurrentBlockNumber() {
        return lib_common_1.limiter.schedule(() => this.api.getLedgerVersion());
    }
    async getAddressUtxos() {
        return [];
    }
    isAddressBalanceSweepable(balance) {
        return new lib_common_1.BigNumber(balance).gt(constants_1.MIN_BALANCE);
    }
    async getAddressBalance(address) {
        let balances;
        try {
            balances = await lib_common_1.limiter.schedule(() => this.api.getBalances(address));
        }
        catch (e) {
            if ((0, ts_common_1.isMatchingError)(e, constants_1.NOT_FOUND_ERRORS)) {
                this.logger.debug(`Address ${address} not found`);
                return {
                    confirmedBalance: '0',
                    unconfirmedBalance: '0',
                    spendableBalance: '0',
                    sweepable: false,
                    requiresActivation: true,
                    minimumBalance: String(constants_1.MIN_BALANCE),
                };
            }
            throw e;
        }
        this.logger.debug(`rippleApi.getBalance ${address}`, balances);
        const xrpBalance = balances.find(({ currency }) => currency === 'XRP');
        const xrpAmount = xrpBalance && xrpBalance.value ? xrpBalance.value : '0';
        const confirmedBalance = new lib_common_1.BigNumber(xrpAmount);
        const spendableBalance = lib_common_1.BigNumber.max(0, confirmedBalance.minus(constants_1.MIN_BALANCE));
        return {
            confirmedBalance: confirmedBalance.toString(),
            unconfirmedBalance: '0',
            spendableBalance: spendableBalance.toString(),
            sweepable: this.isAddressBalanceSweepable(xrpAmount),
            requiresActivation: confirmedBalance.lt(constants_1.MIN_BALANCE),
            minimumBalance: String(constants_1.MIN_BALANCE),
        };
    }
    async getAddressNextSequenceNumber(address) {
        const accountInfo = await lib_common_1.limiter.schedule(() => this.api.getAccountInfo(address));
        return new lib_common_1.BigNumber(accountInfo.sequence).toString();
    }
    async getTransactionInfo(txId) {
        let tx;
        try {
            tx = await lib_common_1.limiter.schedule(() => this.api.getTransaction(txId));
        }
        catch (e) {
            const eString = e.toString();
            if (constants_1.NOT_FOUND_ERRORS.some((type) => eString.includes(type))) {
                throw new Error(`Transaction not found: ${eString}`);
            }
            throw e;
        }
        this.logger.debug('getTransaction', txId, tx);
        if (tx.type !== 'payment') {
            throw new Error(`Unsupported ripple tx type ${tx.type}`);
        }
        const { specification, outcome } = tx;
        const { source, destination } = specification;
        const amountObject = (source.maxAmount || source.amount);
        if (amountObject.currency !== 'XRP') {
            throw new Error(`Unsupported ripple tx currency ${amountObject.currency}`);
        }
        const amount = amountObject.value;
        const isSuccessful = outcome.result.startsWith('tes');
        const isCostDestroyed = outcome.result.startsWith('tec');
        const status = isSuccessful || isCostDestroyed ? lib_common_1.TransactionStatus.Confirmed : lib_common_1.TransactionStatus.Failed;
        const isExecuted = isSuccessful;
        const confirmationNumber = outcome.ledgerVersion;
        const ledger = await lib_common_1.limiter.schedule(() => this.api.getLedger({ ledgerVersion: confirmationNumber }));
        const currentLedgerVersion = await this.getCurrentBlockNumber();
        const confirmationId = ledger.ledgerHash;
        const confirmationTimestamp = outcome.timestamp ? new Date(outcome.timestamp) : null;
        return {
            status,
            id: tx.id,
            fromIndex: null,
            fromAddress: source.address,
            fromExtraId: typeof source.tag !== 'undefined' ? String(source.tag) : null,
            toIndex: null,
            toAddress: destination.address,
            toExtraId: typeof destination.tag !== 'undefined' ? String(destination.tag) : null,
            amount: amount,
            fee: outcome.fee,
            sequenceNumber: String(tx.sequence),
            confirmationId,
            confirmationNumber: String(confirmationNumber),
            confirmationTimestamp,
            isExecuted,
            isConfirmed: Boolean(confirmationNumber),
            confirmations: currentLedgerVersion - confirmationNumber,
            data: tx,
        };
    }
    async getBlock(id) {
        if ((0, ts_common_1.isUndefined)(id)) {
            id = await this.api.getLedgerVersion();
        }
        const raw = await this.api.getLedger((0, ts_common_1.isString)(id) ? { ledgerHash: id } : { ledgerVersion: id });
        return {
            id: raw.ledgerHash,
            height: raw.ledgerVersion,
            previousId: raw.parentLedgerHash,
            time: new Date(raw.closeTime),
            raw,
        };
    }
}
exports.RipplePaymentsUtils = RipplePaymentsUtils;
//# sourceMappingURL=RipplePaymentsUtils.js.map