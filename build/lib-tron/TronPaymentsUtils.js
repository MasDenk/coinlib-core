"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronPaymentsUtils = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const tronweb_1 = __importDefault(require("tronweb"));
const helpers_1 = require("./helpers");
const constants_1 = require("./constants");
const types_1 = require("./types");
const utils_1 = require("./utils");
const lodash_1 = require("lodash");
class TronPaymentsUtils {
    constructor(config = {}) {
        this.coinSymbol = constants_1.COIN_SYMBOL;
        this.coinName = constants_1.COIN_NAME;
        this.coinDecimals = constants_1.DECIMAL_PLACES;
        this.isValidXprv = helpers_1.isValidXprv;
        this.isValidXpub = helpers_1.isValidXpub;
        this.isValidPrivateKey = helpers_1.isValidPrivateKey;
        this.privateKeyToAddress = helpers_1.privateKeyToAddress;
        (0, ts_common_1.assertType)(types_1.BaseTronPaymentsConfig, config);
        this.networkType = config.network || lib_common_1.NetworkType.Mainnet;
        this.logger = new ts_common_1.DelegateLogger(config.logger, constants_1.PACKAGE_NAME);
        this.fullNode = config.fullNode || constants_1.DEFAULT_FULL_NODE;
        this.solidityNode = config.solidityNode || constants_1.DEFAULT_SOLIDITY_NODE;
        this.eventServer = config.eventServer || constants_1.DEFAULT_EVENT_SERVER;
        this.tronweb = new tronweb_1.default(this.fullNode, this.solidityNode, this.eventServer);
    }
    async init() { }
    async destroy() { }
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
    _getPayportValidationMessage(payport) {
        const { address, extraId } = payport;
        if (!(0, helpers_1.isValidAddress)(address)) {
            return 'Invalid payport address';
        }
        if (!(0, ts_common_1.isNil)(extraId) && !(0, helpers_1.isValidExtraId)(extraId)) {
            return 'Invalid payport extraId';
        }
    }
    getPayportValidationMessage(payport) {
        try {
            payport = (0, ts_common_1.assertType)(lib_common_1.Payport, payport, 'payport');
        }
        catch (e) {
            return e === null || e === void 0 ? void 0 : e.message;
        }
        return this._getPayportValidationMessage(payport);
    }
    validatePayport(payport) {
        payport = (0, ts_common_1.assertType)(lib_common_1.Payport, payport, 'payport');
        const message = this._getPayportValidationMessage(payport);
        if (message) {
            throw new Error(message);
        }
    }
    isValidPayport(payport) {
        return lib_common_1.Payport.is(payport) && !this._getPayportValidationMessage(payport);
    }
    toMainDenomination(amount) {
        return (0, helpers_1.toMainDenominationString)(amount);
    }
    toBaseDenomination(amount) {
        return (0, helpers_1.toBaseDenominationString)(amount);
    }
    getFeeRateRecommendation(level) {
        return { feeRate: '0', feeRateType: lib_common_1.FeeRateType.Base };
    }
    // async _retryDced<T>(fn: () => Promise<T>): Promise<T> {
    //   return retryIfDisconnected(fn, this.logger)
    // }
    getCurrentBlockNumber() {
        return lib_common_1.limiter.schedule(async () => (await this.tronweb.trx.getCurrentBlock()).block_header.raw_data.number);
    }
    async getAddressUtxos() {
        return [];
    }
    async getAddressNextSequenceNumber() {
        return null;
    }
    canSweepBalanceSun(balanceSun) {
        return balanceSun > constants_1.MIN_BALANCE_SUN;
    }
    isAddressBalanceSweepable(balanceTrx) {
        return new lib_common_1.BigNumber(balanceTrx).gt(constants_1.MIN_BALANCE_TRX);
    }
    async getAddressBalance(address) {
        try {
            const balanceSun = await lib_common_1.limiter.schedule(() => this.tronweb.trx.getBalance(address));
            const sweepable = this.canSweepBalanceSun(balanceSun);
            const confirmedBalance = (0, helpers_1.toMainDenominationBigNumber)(balanceSun);
            const spendableBalance = lib_common_1.BigNumber.max(0, confirmedBalance.minus(constants_1.MIN_BALANCE_TRX));
            return {
                confirmedBalance: confirmedBalance.toString(),
                unconfirmedBalance: '0',
                spendableBalance: spendableBalance.toString(),
                sweepable,
                requiresActivation: false,
                minimumBalance: String(constants_1.MIN_BALANCE_TRX),
            };
        }
        catch (e) {
            throw (0, utils_1.toError)(e);
        }
    }
    extractTxFields(tx) {
        var _a, _b, _c, _d, _e;
        const contractParam = (_e = (_d = (_c = (_b = (_a = tx.raw_data) === null || _a === void 0 ? void 0 : _a.contract) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.parameter) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : null;
        if (!(contractParam && typeof contractParam.amount === 'number')) {
            throw new Error('Unable to get transaction');
        }
        const amountSun = contractParam.amount || 0;
        const amountTrx = this.toMainDenomination(amountSun);
        const toAddress = this.tronweb.address.fromHex(contractParam.to_address);
        const fromAddress = this.tronweb.address.fromHex(contractParam.owner_address);
        return {
            amountTrx,
            amountSun,
            toAddress,
            fromAddress,
        };
    }
    async getTransactionInfo(txid) {
        var _a, _b, _c, _d, _e;
        try {
            const tx = await lib_common_1.limiter.schedule(() => this.tronweb.trx.getTransaction(txid));
            const txInfo = await lib_common_1.limiter.schedule(() => this.tronweb.trx.getTransactionInfo(txid));
            const currentBlock = await lib_common_1.limiter.schedule(() => this.tronweb.trx.getCurrentBlock());
            // const [tx, txInfo, currentBlock] = await Promise.all([
            //   this._retryDced(() => this.tronweb.trx.getTransaction(txid)),
            //   this._retryDced(() => this.tronweb.trx.getTransactionInfo(txid)),
            //   this._retryDced(() => this.tronweb.trx.getCurrentBlock()),
            // ])
            const { amountTrx, fromAddress, toAddress } = this.extractTxFields(tx);
            const contractRet = (_b = (_a = tx.ret) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.contractRet;
            const isExecuted = contractRet === 'SUCCESS';
            const block = txInfo.blockNumber || null;
            const feeTrx = this.toMainDenomination(txInfo.fee || 0);
            const currentBlockNumber = (_e = (_d = (_c = currentBlock.block_header) === null || _c === void 0 ? void 0 : _c.raw_data) === null || _d === void 0 ? void 0 : _d.number) !== null && _e !== void 0 ? _e : 0;
            const confirmations = currentBlockNumber && block ? currentBlockNumber - block : 0;
            const isConfirmed = confirmations > 0;
            const confirmationTimestamp = txInfo.blockTimeStamp ? new Date(txInfo.blockTimeStamp) : null;
            let status = lib_common_1.TransactionStatus.Pending;
            if (isConfirmed) {
                if (!isExecuted) {
                    status = lib_common_1.TransactionStatus.Failed;
                }
                status = lib_common_1.TransactionStatus.Confirmed;
            }
            return {
                id: tx.txID,
                amount: amountTrx,
                toAddress,
                fromAddress,
                toExtraId: null,
                fromIndex: null,
                toIndex: null,
                fee: feeTrx,
                sequenceNumber: null,
                isExecuted,
                isConfirmed,
                confirmations,
                confirmationId: block ? String(block) : null,
                confirmationTimestamp,
                status,
                data: {
                    ...tx,
                    ...txInfo,
                    currentBlock: (0, lodash_1.pick)(currentBlock, 'block_header', 'blockID'),
                },
            };
        }
        catch (e) {
            throw (0, utils_1.toError)(e);
        }
    }
    async getBlock(id) {
        try {
            const raw = await lib_common_1.limiter.schedule(() => (0, ts_common_1.isUndefined)(id) ? this.tronweb.trx.getCurrentBlock() : this.tronweb.trx.getBlock(id));
            return {
                id: raw.blockID,
                height: raw.block_header.raw_data.number,
                previousId: raw.block_header.raw_data.parentHash,
                time: new Date(raw.block_header.raw_data.timestamp * 1000),
                raw,
            };
        }
        catch (e) {
            throw (0, utils_1.toError)(e);
        }
    }
}
exports.TronPaymentsUtils = TronPaymentsUtils;
//# sourceMappingURL=TronPaymentsUtils.js.map