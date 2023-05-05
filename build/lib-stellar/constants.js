"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_CONFIG_OMIT_FIELDS = exports.DEFAULT_TESTNET_SERVER = exports.DEFAULT_MAINNET_SERVER = exports.DEFAULT_NETWORK = exports.NOT_FOUND_ERRORS = exports.DEFAULT_FEE_LEVEL = exports.DEFAULT_TX_TIMEOUT_SECONDS = exports.DEFAULT_CREATE_TRANSACTION_OPTIONS = exports.MIN_BALANCE = exports.BASE_UNITS = exports.DECIMAL_PLACES = exports.COIN_NAME = exports.COIN_SYMBOL = exports.PACKAGE_NAME = void 0;
const lib_common_1 = require("../lib-common");
exports.PACKAGE_NAME = 'stellar-payments';
exports.COIN_SYMBOL = 'XLM';
exports.COIN_NAME = 'Stellar';
exports.DECIMAL_PLACES = 7;
exports.BASE_UNITS = 1e7;
exports.MIN_BALANCE = 1;
exports.DEFAULT_CREATE_TRANSACTION_OPTIONS = {};
exports.DEFAULT_TX_TIMEOUT_SECONDS = 60 * 60;
exports.DEFAULT_FEE_LEVEL = lib_common_1.FeeLevel.Low;
exports.NOT_FOUND_ERRORS = ['MissingLedgerHistoryError', 'NotFoundError', 'Not Found'];
exports.DEFAULT_NETWORK = lib_common_1.NetworkType.Mainnet;
exports.DEFAULT_MAINNET_SERVER = 'https://horizon.stellar.org';
exports.DEFAULT_TESTNET_SERVER = 'https://horizon-testnet.stellar.org';
exports.PUBLIC_CONFIG_OMIT_FIELDS = ['logger', 'server', 'api', 'seed', 'depositAccount', 'hotAccount', 'hdKey'];
//# sourceMappingURL=constants.js.map