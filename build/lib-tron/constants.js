"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_CONFIG_OMIT_FIELDS = exports.EXPIRATION_FUDGE_MS = exports.TX_EXPIRATION_EXTENSION_SECONDS = exports.DEFAULT_FEE_LEVEL = exports.DEFAULT_EVENT_SERVER = exports.DEFAULT_SOLIDITY_NODE = exports.DEFAULT_FULL_NODE = exports.MIN_BALANCE_TRX = exports.MIN_BALANCE_SUN = exports.DECIMAL_PLACES = exports.COIN_NAME = exports.COIN_SYMBOL = exports.PACKAGE_NAME = void 0;
const lib_common_1 = require("../lib-common");
exports.PACKAGE_NAME = 'tron-payments';
exports.COIN_SYMBOL = 'TRX';
exports.COIN_NAME = 'Tron';
exports.DECIMAL_PLACES = 6;
// Note: Tron doesn't actually have a minimum balance, but 0.1 trx could be burned when sending to
// a new address so we need to keep at least this much around to cover those cases.
exports.MIN_BALANCE_SUN = 100000;
exports.MIN_BALANCE_TRX = 0.1;
exports.DEFAULT_FULL_NODE = process.env.TRX_FULL_NODE_URL || 'https://api.trongrid.io';
exports.DEFAULT_SOLIDITY_NODE = process.env.TRX_SOLIDITY_NODE_URL || 'https://api.trongrid.io';
exports.DEFAULT_EVENT_SERVER = process.env.TRX_EVENT_SERVER_URL || 'https://api.trongrid.io';
exports.DEFAULT_FEE_LEVEL = lib_common_1.FeeLevel.Medium;
exports.TX_EXPIRATION_EXTENSION_SECONDS = 59 * 60; // + 1 = 60 mins
/** Milliseconds to wait past tx expiration before recognizing it as expired. */
exports.EXPIRATION_FUDGE_MS = 10 * 1000;
exports.PUBLIC_CONFIG_OMIT_FIELDS = ['logger', 'fullNode', 'solidityNode', 'eventServer', 'hdKey', 'keyPairs'];
//# sourceMappingURL=constants.js.map