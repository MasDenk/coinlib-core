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
exports.RippleCreateTransactionOptions = exports.RippleBroadcastResult = exports.RippleTransactionInfo = exports.RippleSignedTransaction = exports.RippleUnsignedTransaction = exports.RipplePaymentsConfig = exports.AccountRipplePaymentsConfig = exports.RippleAccountConfig = exports.RippleSecretPair = exports.RippleKeyPair = exports.HdRipplePaymentsConfig = exports.BaseRipplePaymentsConfig = exports.RippleBalanceMonitorConfig = exports.BaseRippleConfig = exports.RippleServerAPI = exports.CreateTransactionOptions = void 0;
const t = __importStar(require("io-ts"));
const ts_common_1 = require("../ts-common");
const lib_common_1 = require("../lib-common");
Object.defineProperty(exports, "CreateTransactionOptions", { enumerable: true, get: function () { return lib_common_1.CreateTransactionOptions; } });
const ripple_lib_1 = require("ripple-lib");
class RippleServerAPI extends ripple_lib_1.RippleAPI {
}
exports.RippleServerAPI = RippleServerAPI;
exports.BaseRippleConfig = (0, ts_common_1.extendCodec)(lib_common_1.BaseConfig, {}, {
    server: (0, ts_common_1.nullable)(t.string),
    api: (0, ts_common_1.instanceofCodec)(RippleServerAPI),
}, 'BaseRippleConfig');
exports.RippleBalanceMonitorConfig = exports.BaseRippleConfig;
exports.BaseRipplePaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseRippleConfig, {}, {
    maxLedgerVersionOffset: t.number, // number of ledgers until a tx expires
}, 'BaseRipplePaymentsConfig');
exports.HdRipplePaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseRipplePaymentsConfig, {
    hdKey: t.string, // xprv or xpub
}, 'HdRipplePaymentsConfig');
exports.RippleKeyPair = t.type({
    publicKey: t.string,
    privateKey: t.string,
}, 'RippleKeyPair');
exports.RippleSecretPair = t.type({
    address: t.string,
    secret: t.string,
}, 'RippleSecretPair');
/**
 * address, or secret+address, or public+private key
 */
exports.RippleAccountConfig = t.union([t.string, exports.RippleSecretPair, exports.RippleKeyPair], 'RippleAccountConfig');
exports.AccountRipplePaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseRipplePaymentsConfig, {
    hotAccount: exports.RippleAccountConfig,
    depositAccount: exports.RippleAccountConfig,
}, 'AccountRipplePaymentsConfig');
exports.RipplePaymentsConfig = t.union([exports.HdRipplePaymentsConfig, exports.AccountRipplePaymentsConfig], 'RipplePaymentsConfig');
exports.RippleUnsignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseUnsignedTransaction, {
    amount: t.string,
    fee: t.string,
}, 'RippleUnsignedTransaction');
exports.RippleSignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseSignedTransaction, {
    id: t.string,
}, 'RippleSignedTransaction');
exports.RippleTransactionInfo = (0, ts_common_1.extendCodec)(lib_common_1.BaseTransactionInfo, {
    confirmationNumber: (0, ts_common_1.nullable)(t.string),
}, {}, 'RippleTransactionInfo');
exports.RippleBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {
    rebroadcast: t.boolean,
    data: t.object,
}, 'RippleBroadcastResult');
exports.RippleCreateTransactionOptions = (0, ts_common_1.extendCodec)(lib_common_1.CreateTransactionOptions, {}, {
    maxLedgerVersionOffset: t.number,
}, 'RippleCreateTransactionOptions');
//# sourceMappingURL=types.js.map