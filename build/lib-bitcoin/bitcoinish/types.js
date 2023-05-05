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
exports.BitcoinishBlock = exports.BitcoinishBroadcastResult = exports.BitcoinishTransactionInfo = exports.BitcoinishSignedTransaction = exports.BitcoinishSignedTransactionData = exports.BitcoinishUnsignedTransaction = exports.BitcoinishPaymentTx = exports.BitcoinishWeightedChangeOutput = exports.BitcoinishTxOutputSatoshis = exports.BitcoinishTxOutput = exports.BitcoinishPaymentsUtilsConfig = exports.BitcoinjsNetwork = exports.BlockbookConnectedConfig = exports.BlockbookConfigServer = exports.BlockbookServerAPI = exports.FeeLevelBlockTargets = exports.MultisigAddressType = exports.SinglesigAddressType = exports.AddressTypeT = exports.AddressType = exports.NormalizedTxBitcoinVin = exports.NormalizedTxBitcoinVout = exports.NormalizedTxBitcoin = exports.BlockInfoBitcoin = exports.BlockbookBitcoin = void 0;
const t = __importStar(require("io-ts"));
const lib_common_1 = require("../../lib-common");
const ts_common_1 = require("../../ts-common");
const blockbook_client_1 = require("blockbook-client");
Object.defineProperty(exports, "BlockbookBitcoin", { enumerable: true, get: function () { return blockbook_client_1.BlockbookBitcoin; } });
Object.defineProperty(exports, "BlockInfoBitcoin", { enumerable: true, get: function () { return blockbook_client_1.BlockInfoBitcoin; } });
Object.defineProperty(exports, "NormalizedTxBitcoin", { enumerable: true, get: function () { return blockbook_client_1.NormalizedTxBitcoin; } });
Object.defineProperty(exports, "NormalizedTxBitcoinVin", { enumerable: true, get: function () { return blockbook_client_1.NormalizedTxBitcoinVin; } });
Object.defineProperty(exports, "NormalizedTxBitcoinVout", { enumerable: true, get: function () { return blockbook_client_1.NormalizedTxBitcoinVout; } });
var AddressType;
(function (AddressType) {
    AddressType["Legacy"] = "p2pkh";
    AddressType["SegwitP2SH"] = "p2sh-p2wpkh";
    AddressType["SegwitNative"] = "p2wpkh";
    AddressType["MultisigLegacy"] = "p2sh-p2ms";
    AddressType["MultisigSegwitP2SH"] = "p2sh-p2wsh-p2ms";
    AddressType["MultisigSegwitNative"] = "p2wsh-p2ms";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
exports.AddressTypeT = (0, ts_common_1.enumCodec)(AddressType, 'AddressType');
// For unclear reasons tsc throws TS4023 when this type is used in an external module.
// Re-exporting the codec cast to the inferred type helps fix this.
const SinglesigAddressTypeT = t.keyof({
    [AddressType.Legacy]: null,
    [AddressType.SegwitP2SH]: null,
    [AddressType.SegwitNative]: null,
}, 'SinglesigAddressType');
exports.SinglesigAddressType = SinglesigAddressTypeT;
const MultisigAddressTypeT = t.keyof({
    [AddressType.MultisigLegacy]: null,
    [AddressType.MultisigSegwitP2SH]: null,
    [AddressType.MultisigSegwitNative]: null,
}, 'MultisigAddressType');
exports.MultisigAddressType = MultisigAddressTypeT;
exports.FeeLevelBlockTargets = t.record(lib_common_1.AutoFeeLevels, t.number, 'FeeLevelBlockTargets');
/** A hack to get around TS2742 when config is re-exported from coin-payments */
class BlockbookServerAPI extends blockbook_client_1.BlockbookBitcoin {
}
exports.BlockbookServerAPI = BlockbookServerAPI;
exports.BlockbookConfigServer = t.union([t.string, t.array(t.string), t.null], 'BlockbookConfigServer');
exports.BlockbookConnectedConfig = (0, ts_common_1.requiredOptionalCodec)({
    network: lib_common_1.NetworkTypeT,
    packageName: t.string,
    server: exports.BlockbookConfigServer,
}, {
    logger: (0, ts_common_1.nullable)(ts_common_1.Logger),
    api: (0, ts_common_1.instanceofCodec)(BlockbookServerAPI),
    requestTimeoutMs: t.number,
}, 'BlockbookConnectedConfig');
exports.BitcoinjsNetwork = t.type({
    messagePrefix: t.string,
    bech32: t.string,
    bip32: t.type({
        public: t.number,
        private: t.number,
    }),
    pubKeyHash: t.number,
    scriptHash: t.number,
    wif: t.number,
}, 'BitcoinjsNetwork');
exports.BitcoinishPaymentsUtilsConfig = (0, ts_common_1.extendCodec)(exports.BlockbookConnectedConfig, {
    coinSymbol: t.string,
    coinName: t.string,
    coinDecimals: t.number,
    bitcoinjsNetwork: exports.BitcoinjsNetwork,
    networkMinRelayFee: t.number, // base denom
}, {
    blockcypherToken: t.string,
    feeLevelBlockTargets: exports.FeeLevelBlockTargets,
}, 'BitcoinishPaymentsUtilsConfig');
exports.BitcoinishTxOutput = t.type({
    address: t.string,
    value: t.string,
}, 'BitcoinishTxOutput');
exports.BitcoinishTxOutputSatoshis = t.type({
    address: t.string,
    satoshis: t.number,
}, 'BitcoinishTxOutputSatoshis');
exports.BitcoinishWeightedChangeOutput = t.type({
    address: t.string,
    weight: t.number,
}, 'BitcoinishWeightedChangeOutput');
/**
 * An object representing a Bitcoin like transaction (UTXO based) with inputs and outputs.
 *
 * The externalOutputs, changeOutputs, and hex fields are optional for back compat. Single change output
 * transactions use the changeAddress field. Multi change outputs transactions will leave
 * changeAddress null.
 */
exports.BitcoinishPaymentTx = (0, ts_common_1.requiredOptionalCodec)({
    inputs: t.array(lib_common_1.UtxoInfo),
    // All external and change outputs
    outputs: t.array(exports.BitcoinishTxOutput),
    fee: t.string,
    change: t.string,
    changeAddress: (0, ts_common_1.nullable)(t.string),
}, {
    // Total value of input utxos in main denom
    inputTotal: t.string,
    // Outputs specified by transaction creator
    externalOutputs: t.array(exports.BitcoinishTxOutput),
    // Total value of external outputs in main denom
    externalOutputTotal: t.string,
    // Outputs returning to transaction creator
    changeOutputs: t.array(exports.BitcoinishTxOutput),
    // Unsigned tx serialized as hex string (if implementation allows, empty string otherwise)
    rawHex: t.string,
    // sha256 hash of raw tx data
    rawHash: t.string,
    // weight of transaction for fee purposes (ie vbytes, gas limit)
    weight: t.number,
}, 'BitcoinishPaymentTx');
exports.BitcoinishUnsignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseUnsignedTransaction, {
    amount: t.string,
    fee: t.string,
    data: exports.BitcoinishPaymentTx,
}, 'BitcoinishUnsignedTransaction');
exports.BitcoinishSignedTransactionData = (0, ts_common_1.requiredOptionalCodec)({
    hex: t.string,
}, {
    // true if `hex` is a partially signed transaction, false if it's finalized
    partial: t.boolean,
    // sha256 hash of the unsignedHex data for facilitating multisig tx combining
    unsignedTxHash: t.string,
    changeOutputs: t.array(exports.BitcoinishTxOutput),
}, 'BitcoinishSignedTransactionData');
exports.BitcoinishSignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseSignedTransaction, {
    data: exports.BitcoinishSignedTransactionData,
}, {}, 'BitcoinishSignedTransaction');
exports.BitcoinishTransactionInfo = (0, ts_common_1.extendCodec)(lib_common_1.BaseTransactionInfo, {
    data: blockbook_client_1.NormalizedTxBitcoin,
}, {}, 'BitcoinishTransactionInfo');
exports.BitcoinishBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {}, {}, 'BitcoinishBroadcastResult');
exports.BitcoinishBlock = blockbook_client_1.BlockInfoBitcoin;
//# sourceMappingURL=types.js.map