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
exports.DashBlock = exports.DashBroadcastResult = exports.DashTransactionInfo = exports.DashSignedTransaction = exports.DashSignedTransactionData = exports.DashUnsignedTransaction = exports.DashUnsignedTransactionData = exports.DashPaymentsConfig = exports.MultisigDashPaymentsConfig = exports.SinglesigDashPaymentsConfig = exports.KeyPairDashPaymentsConfig = exports.HdDashPaymentsConfig = exports.BaseDashPaymentsConfig = exports.DashPaymentsUtilsConfig = exports.DashBalanceMonitorConfig = exports.DashBaseConfig = exports.BitcoinishTxOutput = exports.MultisigAddressType = exports.SinglesigAddressType = exports.AddressTypeT = exports.AddressType = void 0;
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
exports.DashBaseConfig = (0, ts_common_1.extendCodec)(lib_common_1.BaseConfig, {}, {
    server: lib_bitcoin_1.bitcoinish.BlockbookConfigServer,
    api: (0, ts_common_1.instanceofCodec)(lib_bitcoin_1.bitcoinish.BlockbookServerAPI),
}, 'DashBaseConfig');
exports.DashBalanceMonitorConfig = exports.DashBaseConfig;
exports.DashPaymentsUtilsConfig = (0, ts_common_1.extendCodec)(exports.DashBaseConfig, {}, {
    blockcypherToken: t.string,
    feeLevelBlockTargets: lib_bitcoin_1.bitcoinish.FeeLevelBlockTargets,
}, 'DashPaymentsUtilsConfig');
exports.BaseDashPaymentsConfig = (0, ts_common_1.extendCodec)(exports.DashPaymentsUtilsConfig, {}, {
    minTxFee: lib_common_1.FeeRate,
    dustThreshold: t.number,
    networkMinRelayFee: t.number,
    targetUtxoPoolSize: t.number,
    minChange: t.string,
    maximumFeeRate: t.number, // Hard sat/byte fee cap passed to Psbt constructor
}, 'BaseDashPaymentsConfig');
exports.HdDashPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseDashPaymentsConfig, {
    hdKey: t.string,
}, {
    addressType: exports.SinglesigAddressType,
    derivationPath: t.string,
}, 'HdDashPaymentsConfig');
exports.KeyPairDashPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseDashPaymentsConfig, {
    keyPairs: lib_common_1.KeyPairsConfigParam,
}, {
    addressType: exports.SinglesigAddressType,
}, 'KeyPairDashPaymentsConfig');
exports.SinglesigDashPaymentsConfig = t.union([exports.HdDashPaymentsConfig, exports.KeyPairDashPaymentsConfig], 'SinglesigDashPaymentsConfig');
exports.MultisigDashPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseDashPaymentsConfig, {
    m: t.number,
    signers: t.array(exports.SinglesigDashPaymentsConfig),
}, {
    addressType: exports.MultisigAddressType,
}, 'MultisigDashPaymentsConfig');
exports.DashPaymentsConfig = t.union([exports.HdDashPaymentsConfig, exports.KeyPairDashPaymentsConfig, exports.MultisigDashPaymentsConfig], 'DashPaymentsConfig');
exports.DashUnsignedTransactionData = lib_bitcoin_1.bitcoinish.BitcoinishPaymentTx;
exports.DashUnsignedTransaction = (0, ts_common_1.extendCodec)(lib_bitcoin_1.bitcoinish.BitcoinishUnsignedTransaction, {
    amount: t.string,
    fee: t.string,
    data: exports.DashUnsignedTransactionData,
}, 'DashUnsignedTransaction');
exports.DashSignedTransactionData = (0, ts_common_1.requiredOptionalCodec)({
    hex: t.string,
}, {
    // true if `hex` is a partially signed transaction, false if it's finalized
    partial: t.boolean,
    // sha256 hash of the unsignedHex data for facilitating multisig tx combining
    unsignedTxHash: t.string,
    changeOutputs: t.array(exports.BitcoinishTxOutput),
}, 'DashSignedTransactionData');
exports.DashSignedTransaction = (0, ts_common_1.extendCodec)(lib_bitcoin_1.bitcoinish.BitcoinishSignedTransaction, {
    data: exports.DashSignedTransactionData,
}, 'DashSignedTransaction');
exports.DashTransactionInfo = (0, ts_common_1.extendCodec)(lib_common_1.BaseTransactionInfo, {}, {}, 'DashTransactionInfo');
exports.DashBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {}, {}, 'DashBroadcastResult');
exports.DashBlock = lib_bitcoin_1.bitcoinish.BlockInfoBitcoin;
//# sourceMappingURL=types.js.map