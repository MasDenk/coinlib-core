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
exports.LitecoinBlock = exports.LitecoinBroadcastResult = exports.LitecoinTransactionInfo = exports.LitecoinSignedTransaction = exports.LitecoinSignedTransactionData = exports.LitecoinUnsignedTransaction = exports.LitecoinUnsignedTransactionData = exports.LitecoinPaymentsConfig = exports.MultisigLitecoinPaymentsConfig = exports.SinglesigLitecoinPaymentsConfig = exports.KeyPairLitecoinPaymentsConfig = exports.HdLitecoinPaymentsConfig = exports.BaseLitecoinPaymentsConfig = exports.LitecoinPaymentsUtilsConfig = exports.LitecoinBalanceMonitorConfig = exports.LitecoinBaseConfig = exports.BitcoinishTxOutput = exports.MultisigAddressType = exports.SinglesigAddressType = exports.AddressTypeT = exports.AddressType = exports.LitecoinAddressFormatT = exports.LitecoinAddressFormat = void 0;
const t = __importStar(require("io-ts"));
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const lib_bitcoin_1 = require("../lib-bitcoin");
var LitecoinAddressFormat;
(function (LitecoinAddressFormat) {
    LitecoinAddressFormat["Deprecated"] = "deprecated";
    LitecoinAddressFormat["Modern"] = "modern";
})(LitecoinAddressFormat = exports.LitecoinAddressFormat || (exports.LitecoinAddressFormat = {}));
exports.LitecoinAddressFormatT = (0, ts_common_1.enumCodec)(LitecoinAddressFormat, 'LitecoinAddressFormat');
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
exports.BitcoinishTxOutput = t.type({
    address: t.string,
    value: t.string,
}, 'BitcoinishTxOutput');
exports.LitecoinBaseConfig = (0, ts_common_1.extendCodec)(lib_common_1.BaseConfig, {}, {
    server: lib_bitcoin_1.bitcoinish.BlockbookConfigServer,
    api: (0, ts_common_1.instanceofCodec)(lib_bitcoin_1.bitcoinish.BlockbookServerAPI),
}, 'LitecoinBaseConfig');
exports.LitecoinBalanceMonitorConfig = exports.LitecoinBaseConfig;
exports.LitecoinPaymentsUtilsConfig = (0, ts_common_1.extendCodec)(exports.LitecoinBaseConfig, {}, {
    blockcypherToken: t.string,
    validAddressFormat: exports.LitecoinAddressFormatT,
    feeLevelBlockTargets: lib_bitcoin_1.bitcoinish.FeeLevelBlockTargets,
}, 'LitecoinPaymentsUtilsConfig');
exports.BaseLitecoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.LitecoinPaymentsUtilsConfig, {}, {
    minTxFee: lib_common_1.FeeRate,
    dustThreshold: t.number,
    networkMinRelayFee: t.number,
    targetUtxoPoolSize: t.number,
    minChange: t.string,
    maximumFeeRate: t.number, // Hard sat/byte fee cap passed to Psbt constructor
}, 'BaseLitecoinPaymentsConfig');
exports.HdLitecoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseLitecoinPaymentsConfig, {
    hdKey: t.string,
}, {
    addressType: exports.SinglesigAddressType,
    derivationPath: t.string,
}, 'HdLitecoinPaymentsConfig');
exports.KeyPairLitecoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseLitecoinPaymentsConfig, {
    keyPairs: lib_common_1.KeyPairsConfigParam,
}, {
    addressType: exports.SinglesigAddressType,
}, 'KeyPairLitecoinPaymentsConfig');
exports.SinglesigLitecoinPaymentsConfig = t.union([exports.HdLitecoinPaymentsConfig, exports.KeyPairLitecoinPaymentsConfig], 'SinglesigLitecoinPaymentsConfig');
exports.MultisigLitecoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseLitecoinPaymentsConfig, {
    m: t.number,
    signers: t.array(exports.SinglesigLitecoinPaymentsConfig),
}, {
    addressType: exports.MultisigAddressType,
}, 'MultisigLitecoinPaymentsConfig');
exports.LitecoinPaymentsConfig = t.union([exports.HdLitecoinPaymentsConfig, exports.KeyPairLitecoinPaymentsConfig, exports.MultisigLitecoinPaymentsConfig], 'LitecoinPaymentsConfig');
exports.LitecoinUnsignedTransactionData = lib_bitcoin_1.bitcoinish.BitcoinishPaymentTx;
exports.LitecoinUnsignedTransaction = (0, ts_common_1.extendCodec)(lib_bitcoin_1.bitcoinish.BitcoinishUnsignedTransaction, {
    amount: t.string,
    fee: t.string,
    data: exports.LitecoinUnsignedTransactionData,
}, 'LitecoinUnsignedTransaction');
exports.LitecoinSignedTransactionData = (0, ts_common_1.requiredOptionalCodec)({
    hex: t.string,
}, {
    // true if `hex` is a partially signed transaction, false if it's finalized
    partial: t.boolean,
    // sha256 hash of the unsignedHex data for facilitating multisig tx combining
    unsignedTxHash: t.string,
    changeOutputs: t.array(exports.BitcoinishTxOutput),
}, 'LitecoinSignedTransactionData');
exports.LitecoinSignedTransaction = (0, ts_common_1.extendCodec)(lib_bitcoin_1.bitcoinish.BitcoinishSignedTransaction, {
    data: exports.LitecoinSignedTransactionData,
}, 'LitecoinSignedTransaction');
exports.LitecoinTransactionInfo = (0, ts_common_1.extendCodec)(lib_common_1.BaseTransactionInfo, {}, {}, 'LitecoinTransactionInfo');
exports.LitecoinBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {}, {}, 'LitecoinBroadcastResult');
exports.LitecoinBlock = lib_bitcoin_1.bitcoinish.BlockInfoBitcoin;
//# sourceMappingURL=types.js.map