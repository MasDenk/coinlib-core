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
exports.BitcoinBlock = exports.BitcoinBroadcastResult = exports.BitcoinTransactionInfo = exports.BitcoinSignedTransaction = exports.BitcoinSignedTransactionData = exports.BitcoinUnsignedTransaction = exports.BitcoinUnsignedTransactionData = exports.BitcoinPaymentsConfig = exports.MultisigBitcoinPaymentsConfig = exports.SinglesigBitcoinPaymentsConfig = exports.KeyPairBitcoinPaymentsConfig = exports.HdBitcoinPaymentsConfig = exports.BaseBitcoinPaymentsConfig = exports.BitcoinPaymentsUtilsConfig = exports.BitcoinBalanceMonitorConfig = exports.BitcoinBaseConfig = exports.BitcoinjsNetwork = exports.MultisigAddressType = exports.SinglesigAddressType = exports.AddressTypeT = exports.AddressType = void 0;
const types_1 = require("./bitcoinish/types");
const t = __importStar(require("io-ts"));
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const blockbook_client_1 = require("blockbook-client");
const bitcoinish_1 = require("./bitcoinish");
var bitcoinish_2 = require("./bitcoinish");
Object.defineProperty(exports, "AddressType", { enumerable: true, get: function () { return bitcoinish_2.AddressType; } });
Object.defineProperty(exports, "AddressTypeT", { enumerable: true, get: function () { return bitcoinish_2.AddressTypeT; } });
Object.defineProperty(exports, "SinglesigAddressType", { enumerable: true, get: function () { return bitcoinish_2.SinglesigAddressType; } });
Object.defineProperty(exports, "MultisigAddressType", { enumerable: true, get: function () { return bitcoinish_2.MultisigAddressType; } });
Object.defineProperty(exports, "BitcoinjsNetwork", { enumerable: true, get: function () { return bitcoinish_2.BitcoinjsNetwork; } });
exports.BitcoinBaseConfig = (0, ts_common_1.extendCodec)(lib_common_1.BaseConfig, {}, {
    server: bitcoinish_1.BlockbookConfigServer,
    api: (0, ts_common_1.instanceofCodec)(types_1.BlockbookServerAPI),
}, 'BitcoinBaseConfig');
exports.BitcoinBalanceMonitorConfig = exports.BitcoinBaseConfig;
exports.BitcoinPaymentsUtilsConfig = (0, ts_common_1.extendCodec)(exports.BitcoinBaseConfig, {}, {
    blockcypherToken: t.string,
}, 'BitcoinPaymentsUtilsConfig');
exports.BaseBitcoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BitcoinPaymentsUtilsConfig, {}, {
    minTxFee: lib_common_1.FeeRate,
    dustThreshold: t.number,
    networkMinRelayFee: t.number,
    targetUtxoPoolSize: t.number,
    minChange: t.string,
    maximumFeeRate: t.number, // Hard sat/byte fee cap passed to Psbt constructor
}, 'BaseBitcoinPaymentsConfig');
exports.HdBitcoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseBitcoinPaymentsConfig, {
    hdKey: t.string,
}, {
    addressType: bitcoinish_1.SinglesigAddressType,
    derivationPath: t.string,
}, 'HdBitcoinPaymentsConfig');
exports.KeyPairBitcoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseBitcoinPaymentsConfig, {
    keyPairs: lib_common_1.KeyPairsConfigParam,
}, {
    addressType: bitcoinish_1.SinglesigAddressType,
}, 'KeyPairBitcoinPaymentsConfig');
exports.SinglesigBitcoinPaymentsConfig = t.union([exports.HdBitcoinPaymentsConfig, exports.KeyPairBitcoinPaymentsConfig], 'SinglesigBitcoinPaymentsConfig');
exports.MultisigBitcoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseBitcoinPaymentsConfig, {
    m: t.number,
    signers: t.array(exports.SinglesigBitcoinPaymentsConfig),
}, {
    addressType: bitcoinish_1.MultisigAddressType,
}, 'MultisigBitcoinPaymentsConfig');
exports.BitcoinPaymentsConfig = t.union([exports.HdBitcoinPaymentsConfig, exports.KeyPairBitcoinPaymentsConfig, exports.MultisigBitcoinPaymentsConfig], 'BitcoinPaymentsConfig');
exports.BitcoinUnsignedTransactionData = bitcoinish_1.BitcoinishPaymentTx;
exports.BitcoinUnsignedTransaction = (0, ts_common_1.extendCodec)(bitcoinish_1.BitcoinishUnsignedTransaction, {
    amount: t.string,
    fee: t.string,
    data: exports.BitcoinUnsignedTransactionData,
}, 'BitcoinUnsignedTransaction');
exports.BitcoinSignedTransactionData = (0, ts_common_1.requiredOptionalCodec)({
    hex: t.string,
}, {
    // true if `hex` is a partially signed transaction, false if it's finalized
    partial: t.boolean,
    // sha256 hash of the unsignedHex data for facilitating multisig tx combining
    unsignedTxHash: t.string,
    changeOutputs: t.array(bitcoinish_1.BitcoinishTxOutput),
}, 'BitcoinSignedTransactionData');
exports.BitcoinSignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseSignedTransaction, {
    data: exports.BitcoinSignedTransactionData,
}, 'BitcoinSignedTransaction');
exports.BitcoinTransactionInfo = (0, ts_common_1.extendCodec)(bitcoinish_1.BitcoinishTransactionInfo, {}, {}, 'BitcoinTransactionInfo');
exports.BitcoinBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {}, {}, 'BitcoinBroadcastResult');
exports.BitcoinBlock = blockbook_client_1.BlockInfoBitcoin;
//# sourceMappingURL=types.js.map