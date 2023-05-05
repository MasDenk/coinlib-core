"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEE_LEVEL_CUSHIONS = exports.PUBLIC_CONFIG_OMIT_FIELDS = exports.DEFAULT_FEE_LEVEL = exports.DEFAULT_TESTNET_SERVER = exports.DEFAULT_MAINNET_SERVER = exports.DEFAULT_NETWORK = exports.MAX_API_CALL_RETRIES = exports.RETRYABLE_ERRORS = exports.CONNECTION_ERRORS = exports.NOT_FOUND_ERRORS = exports.XPRV_REGEX = exports.XPUB_REGEX = exports.EXTRA_ID_REGEX = exports.ADDRESS_REGEX = exports.DEFAULT_MAX_LEDGER_VERSION_OFFSET = exports.DEFAULT_CREATE_TRANSACTION_OPTIONS = exports.MIN_BALANCE = exports.DECIMAL_PLACES = exports.COIN_NAME = exports.COIN_SYMBOL = exports.PACKAGE_NAME = void 0;
const lib_common_1 = require("../lib-common");
exports.PACKAGE_NAME = 'ripple-payments';
exports.COIN_SYMBOL = 'XRP';
exports.COIN_NAME = 'Ripple'; // Yes, I know 'XRP' is the coin name too, but that's just confusing
exports.DECIMAL_PLACES = 6;
exports.MIN_BALANCE = 20;
exports.DEFAULT_CREATE_TRANSACTION_OPTIONS = {};
exports.DEFAULT_MAX_LEDGER_VERSION_OFFSET = 1000; // ~60min
/**
 * Source: https://github.com/ripple/ripple-lib/blob/develop/src/common/schemas/objects/address.json
 */
exports.ADDRESS_REGEX = /^r[1-9A-HJ-NP-Za-km-z]{25,34}$/;
exports.EXTRA_ID_REGEX = /^[0-9]+$/;
/**
 * Source: crypto-regex
 */
exports.XPUB_REGEX = /^xpub[a-km-zA-HJ-NP-Z1-9]{100,108}$/;
exports.XPRV_REGEX = /^xprv[a-km-zA-HJ-NP-Z1-9]{100,108}$/;
exports.NOT_FOUND_ERRORS = ['MissingLedgerHistoryError', 'NotFoundError', 'Account not found.', 'actNotFound'];
exports.CONNECTION_ERRORS = [
    'ConnectionError',
    'NotConnectedError',
    'DisconnectedError',
    'disconnected',
    'code: 1000',
    'connection never cleaned up',
];
exports.RETRYABLE_ERRORS = [...exports.CONNECTION_ERRORS, 'TimeoutError', 'The server is too busy to help you now'];
exports.MAX_API_CALL_RETRIES = 2;
exports.DEFAULT_NETWORK = lib_common_1.NetworkType.Mainnet;
exports.DEFAULT_MAINNET_SERVER = 'wss://s1.ripple.com';
exports.DEFAULT_TESTNET_SERVER = 'wss://s.altnet.rippletest.net:51233';
exports.DEFAULT_FEE_LEVEL = lib_common_1.FeeLevel.Medium;
exports.PUBLIC_CONFIG_OMIT_FIELDS = ['logger', 'server', 'api', 'hdKey', 'hotAccount', 'depositAccount'];
exports.FEE_LEVEL_CUSHIONS = {
    [lib_common_1.FeeLevel.Low]: 1,
    [lib_common_1.FeeLevel.Medium]: 1.2,
    [lib_common_1.FeeLevel.High]: 1.5,
};
//# sourceMappingURL=constants.js.map