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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumBlock = exports.EthereumBalanceMonitorConfig = exports.NetworkDataConfig = exports.BlockBookConfig = exports.EthereumWeb3Config = exports.EthereumBlockbookConnectedConfig = exports.EthereumBlockbookConfigServer = exports.BaseDenominationOptions = exports.EthereumFeeOptionCustom = exports.EthereumFeeOption = exports.EthereumResolvedFeeOption = exports.EthereumBroadcastResult = exports.EthereumTransactionInfo = exports.EthereumSignedTransaction = exports.EthereumUnsignedTransaction = exports.EthereumTransactionOptions = exports.EthereumPaymentsConfig = exports.Erc20PaymentsConfig = exports.KeyPairErc20PaymentsConfig = exports.HdErc20PaymentsConfig = exports.BaseErc20PaymentsConfig = exports.KeyPairEthereumPaymentsConfig = exports.HdEthereumPaymentsConfig = exports.BaseEthereumPaymentsConfig = exports.EthereumPaymentsUtilsConfig = exports.EthereumSignatory = exports.EthereumAddressFormatT = exports.EthereumAddressFormat = void 0;
const t = __importStar(require("io-ts"));
const ts_common_1 = require("../ts-common");
const lib_common_1 = require("../lib-common");
const blockbook_client_1 = require("blockbook-client");
const web3_1 = __importDefault(require("web3"));
var EthereumAddressFormat;
(function (EthereumAddressFormat) {
    EthereumAddressFormat["Lowercase"] = "lowercase";
    EthereumAddressFormat["Checksum"] = "checksum";
})(EthereumAddressFormat = exports.EthereumAddressFormat || (exports.EthereumAddressFormat = {}));
exports.EthereumAddressFormatT = (0, ts_common_1.enumCodec)(EthereumAddressFormat, 'EthereumAddressFormat');
const keys = t.type({
    pub: t.string,
    prv: t.string,
});
const xkeys = t.type({
    xprv: t.string,
    xpub: t.string,
});
const OptionalString = (0, ts_common_1.optional)(t.string);
const OptionalNumber = (0, ts_common_1.optional)(t.number);
exports.EthereumSignatory = t.type({
    address: t.string,
    keys,
    xkeys,
}, 'EthereumSignatory');
exports.EthereumPaymentsUtilsConfig = (0, ts_common_1.extendCodec)(lib_common_1.BaseConfig, {}, {
    fullNode: OptionalString,
    parityNode: OptionalString,
    blockbookNode: t.string,
    blockbookApi: (0, ts_common_1.instanceofCodec)(blockbook_client_1.BlockbookEthereum),
    gasStation: OptionalString,
    symbol: OptionalString,
    name: OptionalString,
    decimals: t.number,
    providerOptions: t.any,
    web3: t.any,
    tokenAddress: t.string,
    requestTimeoutMs: OptionalNumber,
}, 'EthereumPaymentsUtilsConfig');
exports.BaseEthereumPaymentsConfig = (0, ts_common_1.extendCodec)(exports.EthereumPaymentsUtilsConfig, {}, {
    depositKeyIndex: OptionalNumber,
}, 'BaseEthereumPaymentsConfig');
exports.HdEthereumPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseEthereumPaymentsConfig, {
    hdKey: t.string,
}, 'HdEthereumPaymentsConfig');
exports.KeyPairEthereumPaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseEthereumPaymentsConfig, {
    // can be private keys or addresses
    keyPairs: lib_common_1.KeyPairsConfigParam,
}, 'KeyPairEthereumPaymentsConfig');
exports.BaseErc20PaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseEthereumPaymentsConfig, {
    tokenAddress: t.string,
}, {
    masterAddress: t.string,
}, 'BaseErc20PaymentsConfig');
exports.HdErc20PaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseErc20PaymentsConfig, {
    hdKey: t.string,
}, 'HdErc20PaymentsConfig');
exports.KeyPairErc20PaymentsConfig = (0, ts_common_1.extendCodec)(exports.BaseErc20PaymentsConfig, {
    // can be private keys or addresses
    keyPairs: lib_common_1.KeyPairsConfigParam,
}, 'KeyPairErc20PaymentsConfig');
exports.Erc20PaymentsConfig = t.union([exports.HdErc20PaymentsConfig, exports.KeyPairErc20PaymentsConfig], 'Erc20PaymentsConfig');
exports.EthereumPaymentsConfig = t.union([exports.HdEthereumPaymentsConfig, exports.KeyPairEthereumPaymentsConfig, exports.HdErc20PaymentsConfig, exports.KeyPairErc20PaymentsConfig], 'EthereumPaymentsConfig');
exports.EthereumTransactionOptions = (0, ts_common_1.extendCodec)(lib_common_1.CreateTransactionOptions, {}, {
    data: t.string,
    gas: ts_common_1.Numeric,
    proxyAddress: t.string,
}, 'EthereumTransactionOptions');
exports.EthereumUnsignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseUnsignedTransaction, {
    amount: t.string,
    fee: t.string,
}, 'EthereumUnsignedTransaction');
exports.EthereumSignedTransaction = (0, ts_common_1.extendCodec)(lib_common_1.BaseSignedTransaction, {
    data: t.type({
        hex: t.string,
    }),
}, {}, 'EthereumSignedTransaction');
exports.EthereumTransactionInfo = (0, ts_common_1.extendCodec)(lib_common_1.BaseTransactionInfo, {}, {}, 'EthereumTransactionInfo');
exports.EthereumBroadcastResult = (0, ts_common_1.extendCodec)(lib_common_1.BaseBroadcastResult, {}, 'EthereumBroadcastResult');
exports.EthereumResolvedFeeOption = (0, ts_common_1.extendCodec)(lib_common_1.ResolvedFeeOption, {
    gasPrice: t.string,
}, 'EthereumResolvedFeeOption');
exports.EthereumFeeOption = (0, ts_common_1.extendCodec)(lib_common_1.FeeOption, {}, {
    isSweep: t.boolean,
}, 'EthereumFeeOption');
exports.EthereumFeeOptionCustom = (0, ts_common_1.extendCodec)(lib_common_1.FeeOptionCustom, {}, {
    isSweep: t.boolean,
}, 'EthereumFeeOption');
const BnRounding = t.union([
    t.literal(1),
    t.literal(2),
    t.literal(3),
    t.literal(4),
    t.literal(5),
    t.literal(6),
    t.literal(7),
    t.literal(8),
]);
exports.BaseDenominationOptions = (0, ts_common_1.extendCodec)(t.object, {}, {
    rounding: BnRounding,
}, 'BaseDenominationOptions');
exports.EthereumBlockbookConfigServer = t.union([t.string, t.array(t.string), t.null], 'EthereumBlockbookConfigServer');
exports.EthereumBlockbookConnectedConfig = (0, ts_common_1.requiredOptionalCodec)({
    server: exports.EthereumBlockbookConfigServer,
    logger: ts_common_1.Logger,
}, {
    decimals: t.number,
    api: (0, ts_common_1.instanceofCodec)(blockbook_client_1.BlockbookEthereum),
    requestTimeoutMs: t.number,
}, 'EthereumBlockbookConnectedConfig');
exports.EthereumWeb3Config = (0, ts_common_1.requiredOptionalCodec)({ web3: (0, ts_common_1.instanceofCodec)(web3_1.default) }, { decimals: t.number, fullNode: t.string, providerOptions: t.any, logger: ts_common_1.Logger }, 'Web3Config');
exports.BlockBookConfig = (0, ts_common_1.requiredOptionalCodec)({
    nodes: exports.EthereumBlockbookConfigServer,
}, {
    requestTimeoutMs: t.number,
    api: (0, ts_common_1.instanceofCodec)(blockbook_client_1.BlockbookEthereum),
}, 'BlockBookConfig');
exports.NetworkDataConfig = (0, ts_common_1.requiredOptionalCodec)({
    web3Config: exports.EthereumWeb3Config,
    blockBookConfig: exports.BlockBookConfig,
}, {
    parityUrl: t.string,
    logger: ts_common_1.Logger,
    gasStationUrl: t.string,
    requestTimeoutMs: t.number,
}, 'NetworkDataConfig');
exports.EthereumBalanceMonitorConfig = exports.EthereumPaymentsUtilsConfig;
exports.EthereumBlock = blockbook_client_1.BlockInfoEthereum;
//# sourceMappingURL=types.js.map