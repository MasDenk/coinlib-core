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
exports.TronBroadcastResult = exports.TronTransactionInfo = exports.TronSignedTransaction = exports.TronUnsignedTransaction = exports.TronPaymentsConfig = exports.KeyPairTronPaymentsConfig = exports.HdTronPaymentsConfig = exports.BaseTronPaymentsConfig = exports.CreateTransactionOptions = void 0;
const t = __importStar(require("io-ts"));
const ts_common_1 = require("../ts-common");
const lib_common_1 = require("../lib-common");
Object.defineProperty(exports, "CreateTransactionOptions", { enumerable: true, get: function () { return lib_common_1.CreateTransactionOptions; } });
exports.BaseTronPaymentsConfig = (0, ts_common_1.extendCodec)(lib_common_1.BaseConfig, {}, {
    fullNode: t.string,
    solidityNode: t.string,
    eventServer: t.string,
}, 'BaseTronPaymentsConfig');
exports.HdTronPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseTronPaymentsConfig, {
    // required
    hdKey: t.string, // xprv or xpub
}, 'HdTronPaymentsConfig');
const NullableOptionalString = t.union([t.string, t.null, t.undefined]);
exports.KeyPairTronPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseTronPaymentsConfig, {
    // can be private keys or addresses
    keyPairs: t.union([t.array(NullableOptionalString), t.record(t.number, NullableOptionalString)]),
}, 'KeyPairTronPaymentsConfig');
exports.TronPaymentsConfig = t.union([exports.HdTronPaymentsConfig, exports.KeyPairTronPaymentsConfig], 'TronPaymentsConfig');
exports.TronUnsignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseUnsignedTransaction, {
    id: t.string,
    amount: t.string,
    fee: t.string,
}, 'TronUnsignedTransaction');
exports.TronSignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseSignedTransaction, {}, {}, 'TronSignedTransaction');
exports.TronTransactionInfo = (0, ts_common_1.extendCodec)(lib_common_1.BaseTransactionInfo, {}, {}, 'TronTransactionInfo');
exports.TronBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {
    rebroadcast: t.boolean,
}, 'TronBroadcastResult');
//# sourceMappingURL=types.js.map