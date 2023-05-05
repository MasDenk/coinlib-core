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
exports.StellarCreateTransactionOptions = exports.StellarBroadcastResult = exports.StellarTransactionInfo = exports.StellarSignedTransaction = exports.StellarUnsignedTransaction = exports.StellarPaymentsConfig = exports.AccountStellarPaymentsConfig = exports.StellarAccountConfig = exports.PartialStellarSignatory = exports.StellarSignatory = exports.HdStellarPaymentsConfig = exports.BaseStellarPaymentsConfig = exports.StellarBalanceMonitorConfig = exports.BaseStellarConfig = exports.StellarServerAPI = exports.CreateTransactionOptions = void 0;
const t = __importStar(require("io-ts"));
const ts_common_1 = require("../ts-common");
const lib_common_1 = require("../lib-common");
Object.defineProperty(exports, "CreateTransactionOptions", { enumerable: true, get: function () { return lib_common_1.CreateTransactionOptions; } });
const Stellar = __importStar(require("stellar-sdk"));
class StellarServerAPI extends Stellar.Server {
}
exports.StellarServerAPI = StellarServerAPI;
exports.BaseStellarConfig = (0, ts_common_1.extendCodec)(lib_common_1.BaseConfig, {}, {
    server: (0, ts_common_1.nullable)(t.string),
    api: (0, ts_common_1.instanceofCodec)(StellarServerAPI),
}, 'BaseStellarConfig');
exports.StellarBalanceMonitorConfig = exports.BaseStellarConfig;
exports.BaseStellarPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseStellarConfig, {}, {
    txTimeoutSeconds: t.number, // number of seconds until a tx expires
}, 'BaseStellarPaymentsConfig');
exports.HdStellarPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseStellarPaymentsConfig, {
    seed: t.string,
}, 'HdStellarPaymentsConfig');
exports.StellarSignatory = t.type({
    address: t.string,
    secret: t.string,
}, 'StellarSignatory');
exports.PartialStellarSignatory = t.partial(exports.StellarSignatory.props, 'PartialStellarSignatory');
/**
 * address, or secret+address
 */
exports.StellarAccountConfig = t.union([t.string, exports.PartialStellarSignatory], 'StellarAccountConfig');
exports.AccountStellarPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseStellarPaymentsConfig, {
    hotAccount: exports.StellarAccountConfig,
    depositAccount: exports.StellarAccountConfig,
}, 'AccountStellarPaymentsConfig');
exports.StellarPaymentsConfig = t.union([exports.HdStellarPaymentsConfig, exports.AccountStellarPaymentsConfig], 'StellarPaymentsConfig');
exports.StellarUnsignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseUnsignedTransaction, {
    amount: t.string,
    fee: t.string,
}, 'StellarUnsignedTransaction');
exports.StellarSignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseSignedTransaction, {}, 'StellarSignedTransaction');
exports.StellarTransactionInfo = (0, ts_common_1.extendCodec)(lib_common_1.BaseTransactionInfo, {
    confirmationNumber: (0, ts_common_1.nullable)(t.string),
}, {}, 'StellarTransactionInfo');
exports.StellarBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {
    rebroadcast: t.boolean,
    data: t.object,
}, 'StellarBroadcastResult');
exports.StellarCreateTransactionOptions = (0, ts_common_1.extendCodec)(lib_common_1.CreateTransactionOptions, {}, {
    timeoutSeconds: t.number,
}, 'StellarCreateTransactionOptions');
//# sourceMappingURL=types.js.map