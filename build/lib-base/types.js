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
exports.CoinPaymentsConfig = exports.CoinPaymentsPartialConfigs = exports.SupportedCoinPaymentsSymbol = exports.CoinPaymentsConfigs = exports.paymentsConfigCodecs = exports.CoinPaymentsBaseConfigs = exports.basePaymentsConfigCodecs = void 0;
const t = __importStar(require("io-ts"));
const ts_common_1 = require("../ts-common");
const lib_common_1 = require("../lib-common");
// import { TronPaymentsConfig, BaseTronPaymentsConfig, TronPaymentsUtils } from '../lib-tron'
// import { RipplePaymentsConfig, BaseRipplePaymentsConfig, RipplePaymentsUtils } from '../lib-ripple'
// import { StellarPaymentsConfig, BaseStellarPaymentsConfig, StellarPaymentsUtils } from '../lib-stellar'
const lib_bitcoin_1 = require("../lib-bitcoin");
const lib_ethereum_1 = require("../lib-ethereum");
const lib_litecoin_1 = require("../lib-litecoin");
// import {
//   BitcoinCashPaymentsConfig,
//   BaseBitcoinCashPaymentsConfig,
//   BitcoinCashPaymentsUtils
// } from '@bitaccess/coinlib-bitcoin-cash';
const lib_doge_1 = require("../lib-doge");
const lib_dash_1 = require("../lib-dash");
exports.basePaymentsConfigCodecs = {
    // TRX: BaseTronPaymentsConfig,
    // XRP: BaseRipplePaymentsConfig,
    // XLM: BaseStellarPaymentsConfig,
    BTC: lib_bitcoin_1.BaseBitcoinPaymentsConfig,
    ETH: lib_ethereum_1.BaseEthereumPaymentsConfig,
    LTC: lib_litecoin_1.BaseLitecoinPaymentsConfig,
    // BCH: BaseBitcoinCashPaymentsConfig,
    DOGE: lib_doge_1.BaseDogePaymentsConfig,
    DASH: lib_dash_1.BaseDashPaymentsConfig,
};
exports.CoinPaymentsBaseConfigs = t.type(exports.basePaymentsConfigCodecs, 'CoinPaymentsBaseConfigs');
exports.paymentsConfigCodecs = {
    // TRX: TronPaymentsConfig,
    // XRP: RipplePaymentsConfig,
    // XLM: StellarPaymentsConfig,
    BTC: lib_bitcoin_1.BitcoinPaymentsConfig,
    ETH: lib_ethereum_1.EthereumPaymentsConfig,
    LTC: lib_litecoin_1.LitecoinPaymentsConfig,
    // BCH: BitcoinCashPaymentsConfig,
    DOGE: lib_doge_1.DogePaymentsConfig,
    DASH: lib_dash_1.DashPaymentsConfig,
};
exports.CoinPaymentsConfigs = t.type(exports.paymentsConfigCodecs, 'CoinPaymentsConfigs');
exports.SupportedCoinPaymentsSymbol = t.keyof(exports.paymentsConfigCodecs, 'SupportedCoinPaymentsSymbol');
exports.CoinPaymentsPartialConfigs = t.partial(exports.basePaymentsConfigCodecs, 'CoinPaymentsPartialConfigs');
exports.CoinPaymentsConfig = (0, ts_common_1.extendCodec)(exports.CoinPaymentsPartialConfigs, {}, {
    network: lib_common_1.NetworkTypeT,
    logger: ts_common_1.Logger,
    seed: t.string,
}, 'CoinPaymentsConfig');
//# sourceMappingURL=types.js.map