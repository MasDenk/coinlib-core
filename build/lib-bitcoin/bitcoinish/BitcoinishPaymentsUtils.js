"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinishPaymentsUtils = void 0;
const lib_common_1 = require("../../lib-common");
const ts_common_1 = require("../../ts-common");
const constants_1 = require("./constants");
const BlockbookConnected_1 = require("./BlockbookConnected");
const utils_1 = require("./utils");
class BitcoinishPaymentsUtils extends BlockbookConnected_1.BlockbookConnected {
    constructor(config) {
        var _a;
        super(config);
        this.coinSymbol = config.coinSymbol;
        this.coinName = config.coinName;
        this.coinDecimals = config.coinDecimals;
        this.bitcoinjsNetwork = config.bitcoinjsNetwork;
        this.networkMinRelayFee = config.networkMinRelayFee;
        this.feeLevelBlockTargets = (_a = config.feeLevelBlockTargets) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_FEE_LEVEL_BLOCK_TARGETS;
        this.blockcypherToken = config.blockcypherToken;
        const unitConverters = (0, lib_common_1.createUnitConverters)(this.coinDecimals);
        this.toMainDenominationString = unitConverters.toMainDenominationString;
        this.toMainDenominationNumber = unitConverters.toMainDenominationNumber;
        this.toMainDenominationBigNumber = unitConverters.toMainDenominationBigNumber;
        this.toBaseDenominationString = unitConverters.toBaseDenominationString;
        this.toBaseDenominationNumber = unitConverters.toBaseDenominationNumber;
        this.toBaseDenominationBigNumber = unitConverters.toBaseDenominationBigNumber;
    }
    isValidExtraId(extraId) {
        return false; // utxo coins don't use extraIds
    }
    async getBlockcypherFeeRecommendation(feeLevel) {
        return (0, utils_1.getBlockcypherFeeRecommendation)(feeLevel, this.coinSymbol, this.networkType, this.blockcypherToken, this.logger);
    }
    async getBlockbookFeeRecommendation(feeLevel) {
        return (0, utils_1.getBlockbookFeeRecommendation)(this.feeLevelBlockTargets[feeLevel], this.coinSymbol, this.networkType, this.api, this.logger);
    }
    async getFeeRateRecommendation(feeLevel, options = {}) {
        if (options.source === 'blockcypher') {
            return this.getBlockcypherFeeRecommendation(feeLevel);
        }
        if (options.source === 'blockbook') {
            return this.getBlockbookFeeRecommendation(feeLevel);
        }
        if (options.source) {
            throw new Error(`Unsupported fee recommendation source: ${options.source}`);
        }
        // If no source is explicitly requested, try both
        try {
            // use blockbook by default
            return this.getBlockbookFeeRecommendation(feeLevel);
        }
        catch (e) {
            this.logger.warn(e.toString());
            // fall back to blockcypher
            return this.getBlockcypherFeeRecommendation(feeLevel);
        }
    }
    _getPayportValidationMessage(payport) {
        const { address, extraId } = payport;
        if (!this.isValidAddress(address)) {
            return 'Invalid payport address';
        }
        if (!(0, ts_common_1.isNil)(extraId)) {
            return 'Invalid payport extraId';
        }
    }
    getPayportValidationMessage(payport) {
        try {
            payport = (0, ts_common_1.assertType)(lib_common_1.Payport, payport, 'payport');
        }
        catch (e) {
            return e.message;
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
    validateAddress(address) {
        if (!this.isValidAddress(address)) {
            throw new Error(`Invalid ${this.coinName} address: ${address}`);
        }
    }
    isValidPayport(payport) {
        return lib_common_1.Payport.is(payport) && !this._getPayportValidationMessage(payport);
    }
    toMainDenomination(amount) {
        return this.toMainDenominationString(amount);
    }
    toBaseDenomination(amount) {
        return this.toBaseDenominationString(amount);
    }
    async getBlock(id, options = {}) {
        if ((0, ts_common_1.isUndefined)(id)) {
            id = await this.getCurrentBlockHash();
        }
        const { includeTxs, ...getBlockOptions } = options;
        const raw = await lib_common_1.limiter.schedule(() => this.getApi().getBlock(id, getBlockOptions));
        if (!raw.time) {
            throw new Error(`${this.coinSymbol} block ${id !== null && id !== void 0 ? id : 'latest'} missing timestamp`);
        }
        return {
            id: raw.hash,
            height: raw.height,
            previousId: raw.previousBlockHash,
            time: new Date(raw.time * 1000),
            raw: {
                ...raw,
                txs: includeTxs ? raw.txs : undefined,
            },
        };
    }
    async getCurrentBlockHash() {
        const bestBlock = await lib_common_1.limiter.schedule(() => this.getApi().getBestBlock());
        return bestBlock.hash;
    }
    async getCurrentBlockNumber() {
        const bestBlock = await lib_common_1.limiter.schedule(() => this.getApi().getBestBlock());
        return bestBlock.height;
    }
    isAddressBalanceSweepable(balance) {
        return this.toBaseDenominationNumber(balance) > this.networkMinRelayFee;
    }
    async getAddressBalance(address) {
        const result = await lib_common_1.limiter.schedule(() => this.getApi().getAddressDetails(address, { details: 'basic' }));
        const confirmedBalance = this.toMainDenominationBigNumber(result.balance);
        const unconfirmedBalance = this.toMainDenominationBigNumber(result.unconfirmedBalance);
        const spendableBalance = confirmedBalance.plus(unconfirmedBalance);
        this.logger.debug('getBalance', address, confirmedBalance, unconfirmedBalance);
        return {
            confirmedBalance: confirmedBalance.toString(),
            unconfirmedBalance: unconfirmedBalance.toString(),
            spendableBalance: spendableBalance.toString(),
            sweepable: this.isAddressBalanceSweepable(spendableBalance),
            requiresActivation: false,
        };
    }
    async getAddressUtxos(address) {
        const utxosRaw = await lib_common_1.limiter.schedule(() => this.getApi().getUtxosForAddress(address));
        const txsById = {};
        const utxos = await Promise.all(utxosRaw.map(async (data) => {
            var _a, _b;
            const { value, height, lockTime, coinbase } = data;
            // Retrieve the raw tx data to enable returning raw hex data. Memoize in a temporary object for efficiency
            const tx = (_a = txsById[data.txid]) !== null && _a !== void 0 ? _a : (await lib_common_1.limiter.schedule(() => this.getApi().getTx(data.txid)));
            txsById[data.txid] = tx;
            const output = tx.vout[data.vout];
            const res = {
                ...data,
                satoshis: Number.parseInt(value),
                value: this.toMainDenominationString(value),
                height: (0, ts_common_1.isUndefined)(height) || height <= 0 ? undefined : String(height),
                lockTime: (0, ts_common_1.isUndefined)(lockTime) ? undefined : String(lockTime),
                coinbase: Boolean(coinbase),
                txHex: tx.hex,
                scriptPubKeyHex: output === null || output === void 0 ? void 0 : output.hex,
                address: (_b = output === null || output === void 0 ? void 0 : output.addresses) === null || _b === void 0 ? void 0 : _b[0],
                spent: false,
            };
            return res;
        }));
        return utxos;
    }
    async getAddressNextSequenceNumber() {
        return null;
    }
    txVoutToUtxoInfo(tx, output) {
        var _a, _b, _c;
        return {
            txid: tx.txid,
            vout: output.n,
            satoshis: new lib_common_1.BigNumber(output.value).toNumber(),
            value: this.toMainDenominationString(output.value),
            confirmations: tx.confirmations,
            height: tx.blockHeight > 0 ? String(tx.blockHeight) : undefined,
            coinbase: tx.valueIn === '0' && tx.value !== '0',
            lockTime: tx.lockTime ? String(tx.lockTime) : undefined,
            txHex: tx.hex,
            scriptPubKeyHex: output.hex,
            address: (_c = this.standardizeAddress((_b = (_a = output.addresses) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '')) !== null && _c !== void 0 ? _c : '',
            spent: Boolean(output.spent),
        };
    }
    async getTransactionInfo(txId, options) {
        const tx = await lib_common_1.limiter.schedule(() => this.getApi().getTx(txId));
        const txSpecific = await lib_common_1.limiter.schedule(() => this.getApi().getTxSpecific(txId));
        // Our "weight" for fee purposes is vbytes, but that isn't a thing on all networks (BCH, DOGE)
        const weight = txSpecific.vsize || txSpecific.size;
        const fee = this.toMainDenominationString(tx.fees);
        const currentBlockNumber = await this.getCurrentBlockNumber();
        const confirmationId = tx.blockHash || null;
        const confirmationNumber = tx.blockHeight ? String(tx.blockHeight) : undefined;
        const confirmationTimestamp = tx.blockTime ? new Date(tx.blockTime * 1000) : null;
        if (tx.confirmations >= 0x7fffffff) {
            // If confirmations exceeds the max value of a signed 32 bit integer, assume we have bad data
            // Blockbook sometimes returns a confirmations count equal to `0xFFFFFFFF` when unconfirmed
            // Bitcoin won't have that many confirmations for 40,000 years
            this.logger.log(`Blockbook returned confirmations count for tx ${txId} that's way too big to be real (${tx.confirmations}), assuming 0`);
            tx.confirmations = 0;
        }
        const isConfirmed = Boolean(tx.confirmations && tx.confirmations > 0);
        const status = isConfirmed ? lib_common_1.TransactionStatus.Confirmed : lib_common_1.TransactionStatus.Pending;
        const inputUtxos = tx.vin.map((utxo) => {
            var _a, _b, _c;
            return ({
                txid: utxo.txid || '',
                vout: utxo.vout || 0,
                value: this.toMainDenominationString((_a = utxo.value) !== null && _a !== void 0 ? _a : 0),
                address: (_b = utxo.addresses) === null || _b === void 0 ? void 0 : _b[0],
                satoshis: Number.parseInt((_c = utxo.value) !== null && _c !== void 0 ? _c : '0'),
            });
        });
        const fromAddresses = tx.vin.map(({ addresses = [] }) => {
            return this.standardizeAddress(addresses[0]) || '';
        });
        let changeAddresses = [...fromAddresses];
        if (options === null || options === void 0 ? void 0 : options.changeAddress) {
            if (Array.isArray(options === null || options === void 0 ? void 0 : options.changeAddress)) {
                changeAddresses = changeAddresses.concat(options.changeAddress);
            }
            else {
                changeAddresses.push(options.changeAddress);
            }
        }
        let fromAddress = 'batch';
        if (fromAddresses.length === 0) {
            throw new Error(`Unable to determine fromAddress of ${this.coinSymbol} tx ${txId}`);
        }
        else if (fromAddresses.length === 1) {
            fromAddress = fromAddresses[0];
        }
        const outputUtxos = tx.vout.map((output) => this.txVoutToUtxoInfo(tx, output));
        const outputAddresses = outputUtxos.map(({ address }) => address);
        let externalAddresses = outputAddresses.filter((oA) => !changeAddresses.includes(oA));
        if (options === null || options === void 0 ? void 0 : options.filterChangeAddresses) {
            externalAddresses = await options.filterChangeAddresses(externalAddresses);
        }
        const externalOutputs = outputUtxos
            .map(({ address, value }) => ({ address, value }))
            .filter(({ address }) => externalAddresses.includes(address));
        const amount = externalOutputs.reduce((total, { value }) => total.plus(value), new lib_common_1.BigNumber(0)).toFixed();
        let toAddress = 'batch';
        if (externalOutputs.length === 0) {
            // throw new Error(`${this.coinSymbol} transaction has no external outputs ${txId}`)
        }
        else if (externalOutputs.length === 1) {
            toAddress = externalOutputs[0].address;
        }
        return {
            status,
            id: tx.txid,
            fromIndex: null,
            fromAddress,
            fromExtraId: null,
            toIndex: null,
            toAddress,
            toExtraId: null,
            amount,
            fee,
            sequenceNumber: null,
            confirmationId,
            confirmationNumber,
            currentBlockNumber,
            confirmationTimestamp,
            isExecuted: isConfirmed,
            isConfirmed,
            confirmations: tx.confirmations,
            data: tx,
            inputUtxos,
            outputUtxos,
            externalOutputs,
            weight,
        };
    }
}
exports.BitcoinishPaymentsUtils = BitcoinishPaymentsUtils;
//# sourceMappingURL=BitcoinishPaymentsUtils.js.map