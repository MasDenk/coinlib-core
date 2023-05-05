"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_NETWORK_SYMBOLS = exports.PAYMENTS_FACTORIES = void 0;
// import { TronPaymentsFactory } from '../lib-tron'
// import { RipplePaymentsFactory } from '../lib-ripple'
// import { StellarPaymentsFactory } from '../lib-stellar'
const lib_bitcoin_1 = require("../lib-bitcoin");
const lib_ethereum_1 = require("../lib-ethereum");
const lib_litecoin_1 = require("../lib-litecoin");
// import { BitcoinCashPaymentsFactory } from '../coinlib-bitcoin-cash'
const lib_doge_1 = require("../lib-doge");
const lib_dash_1 = require("../lib-dash");
const utils_1 = require("./utils");
// TODO ^
exports.PAYMENTS_FACTORIES = {
    // TRX: new TronPaymentsFactory(),
    // XRP: new RipplePaymentsFactory(),
    // XLM: new StellarPaymentsFactory(),
    BTC: new lib_bitcoin_1.BitcoinPaymentsFactory(),
    ETH: new lib_ethereum_1.EthereumPaymentsFactory(),
    LTC: new lib_litecoin_1.LitecoinPaymentsFactory(),
    // BCH: new BitcoinCashPaymentsFactory(),
    DOGE: new lib_doge_1.DogePaymentsFactory(),
    DASH: new lib_dash_1.DashPaymentsFactory(),
};
exports.SUPPORTED_NETWORK_SYMBOLS = (0, utils_1.keysOf)(exports.PAYMENTS_FACTORIES);
//# sourceMappingURL=constants.js.map