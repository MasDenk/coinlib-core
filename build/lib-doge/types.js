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
exports.DogeBlock = exports.DogeBroadcastResult = exports.DogeTransactionInfo = exports.DogeSignedTransaction = exports.DogeSignedTransactionData = exports.DogeUnsignedTransaction = exports.DogeUnsignedTransactionData = exports.DogePaymentsConfig = exports.MultisigDogePaymentsConfig = exports.SinglesigDogePaymentsConfig = exports.KeyPairDogePaymentsConfig = exports.HdDogePaymentsConfig = exports.BaseDogePaymentsConfig = exports.DogePaymentsUtilsConfig = exports.DogeBalanceMonitorConfig = exports.DogeBaseConfig = exports.BitcoinishTxOutput = exports.MultisigAddressType = exports.SinglesigAddressType = exports.AddressTypeT = exports.AddressType = void 0;
const t = __importStar(require("io-ts"));
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const lib_bitcoin_1 = require("../lib-bitcoin");
var AddressType;
(function (AddressType) {
    AddressType["Legacy"] = "p2pkh";
    AddressType["MultisigLegacy"] = "p2sh-p2ms";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
exports.AddressTypeT = (0, ts_common_1.enumCodec)(AddressType, 'AddressType');
// For unclear reasons tsc throws TS4023 when this type is used in an external module.
// Re-exporting the codec cast to the inferred type helps fix this.
const SinglesigAddressTypeT = t.keyof({
    [AddressType.Legacy]: null,
}, 'SinglesigAddressType');
exports.SinglesigAddressType = SinglesigAddressTypeT;
const MultisigAddressTypeT = t.keyof({
    [AddressType.MultisigLegacy]: null,
}, 'MultisigAddressType');
exports.MultisigAddressType = MultisigAddressTypeT;
exports.BitcoinishTxOutput = t.type({
    address: t.string,
    value: t.string,
}, 'BitcoinishTxOutput');
exports.DogeBaseConfig = (0, ts_common_1.extendCodec)(lib_common_1.BaseConfig, {}, {
    server: lib_bitcoin_1.bitcoinish.BlockbookConfigServer,
    api: (0, ts_common_1.instanceofCodec)(lib_bitcoin_1.bitcoinish.BlockbookServerAPI),
}, 'DogeBaseConfig');
exports.DogeBalanceMonitorConfig = exports.DogeBaseConfig;
exports.DogePaymentsUtilsConfig = (0, ts_common_1.extendCodec)(exports.DogeBaseConfig, {}, {
    blockcypherToken: t.string,
    feeLevelBlockTargets: lib_bitcoin_1.bitcoinish.FeeLevelBlockTargets,
}, 'DogePaymentsUtilsConfig');
exports.BaseDogePaymentsConfig = (0, ts_common_1.extendCodec)(exports.DogePaymentsUtilsConfig, {}, {
    minTxFee: lib_common_1.FeeRate,
    dustThreshold: t.number,
    networkMinRelayFee: t.number,
    targetUtxoPoolSize: t.number,
    minChange: t.string,
    maximumFeeRate: t.number, // Hard sat/byte fee cap passed to Psbt constructor
}, 'BaseDogePaymentsConfig');
exports.HdDogePaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseDogePaymentsConfig, {
    hdKey: t.string,
}, {
    addressType: exports.SinglesigAddressType,
    derivationPath: t.string,
}, 'HdDogePaymentsConfig');
exports.KeyPairDogePaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseDogePaymentsConfig, {
    keyPairs: lib_common_1.KeyPairsConfigParam,
}, {
    addressType: exports.SinglesigAddressType,
}, 'KeyPairDogePaymentsConfig');
exports.SinglesigDogePaymentsConfig = t.union([exports.HdDogePaymentsConfig, exports.KeyPairDogePaymentsConfig], 'SinglesigDogePaymentsConfig');
exports.MultisigDogePaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseDogePaymentsConfig, {
    m: t.number,
    signers: t.array(exports.SinglesigDogePaymentsConfig),
}, {
    addressType: exports.MultisigAddressType,
}, 'MultisigDogePaymentsConfig');
exports.DogePaymentsConfig = t.union([exports.HdDogePaymentsConfig, exports.KeyPairDogePaymentsConfig, exports.MultisigDogePaymentsConfig], 'DogePaymentsConfig');
exports.DogeUnsignedTransactionData = lib_bitcoin_1.bitcoinish.BitcoinishPaymentTx;
exports.DogeUnsignedTransaction = (0, ts_common_1.extendCodec)(lib_bitcoin_1.bitcoinish.BitcoinishUnsignedTransaction, {
    amount: t.string,
    fee: t.string,
    data: exports.DogeUnsignedTransactionData,
}, 'DogeUnsignedTransaction');
exports.DogeSignedTransactionData = (0, ts_common_1.requiredOptionalCodec)({
    hex: t.string,
}, {
    // true if `hex` is a partially signed transaction, false if it's finalized
    partial: t.boolean,
    // sha256 hash of the unsignedHex data for facilitating multisig tx combining
    unsignedTxHash: t.string,
    changeOutputs: t.array(exports.BitcoinishTxOutput),
}, 'DogeSignedTransactionData');
exports.DogeSignedTransaction = (0, ts_common_1.extendCodec)(lib_bitcoin_1.bitcoinish.BitcoinishSignedTransaction, {
    data: exports.DogeSignedTransactionData,
}, 'DogeSignedTransaction');
exports.DogeTransactionInfo = (0, ts_common_1.extendCodec)(lib_common_1.BaseTransactionInfo, {}, {}, 'DogeTransactionInfo');
exports.DogeBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {}, {}, 'DogeBroadcastResult');
exports.DogeBlock = lib_bitcoin_1.bitcoinish.BlockInfoBitcoin;
//# sourceMappingURL=types.js.map