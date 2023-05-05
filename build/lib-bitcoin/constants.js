"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_CONFIG_OMIT_FIELDS = exports.DEFAULT_FEE_LEVEL = exports.DEFAULT_TESTNET_SERVER = exports.DEFAULT_MAINNET_SERVER = exports.NETWORKS = exports.NETWORK_TESTNET = exports.NETWORK_MAINNET = exports.DEFAULT_NETWORK = exports.DEFAULT_DERIVATION_PATHS = exports.DEFAULT_MULTISIG_ADDRESS_TYPE = exports.DEFAULT_SINGLESIG_ADDRESS_TYPE = exports.DEFAULT_MIN_TX_FEE = exports.BITCOIN_SEQUENCE_RBF = exports.DEFAULT_NETWORK_MIN_RELAY_FEE = exports.DEFAULT_DUST_THRESHOLD = exports.COIN_NAME = exports.COIN_SYMBOL = exports.DECIMAL_PLACES = exports.PACKAGE_NAME = void 0;
const lib_common_1 = require("../lib-common");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const types_1 = require("./types");
exports.PACKAGE_NAME = 'bitcoin-payments';
exports.DECIMAL_PLACES = 8;
exports.COIN_SYMBOL = 'BTC';
exports.COIN_NAME = 'Bitcoin';
/**
 * The minimum value a transaction output must be in order to not get rejected by the network.
 *
 * Unit: `satoshis`
 */
exports.DEFAULT_DUST_THRESHOLD = 546;
/**
 * The minimum fee required by *most* nodes to relay a transaction.
 *
 * Unit: `satoshis`
 */
exports.DEFAULT_NETWORK_MIN_RELAY_FEE = 1000;
/** Sequence to use for each input such that RBF is opted into */
exports.BITCOIN_SEQUENCE_RBF = 0xfffffffd;
/**
 * The minimum fee this library should ever use for a transaction (overrides recommended levels).
 *
 * Unit: `sat/byte`
 */
exports.DEFAULT_MIN_TX_FEE = 5;
exports.DEFAULT_SINGLESIG_ADDRESS_TYPE = types_1.AddressType.SegwitNative;
exports.DEFAULT_MULTISIG_ADDRESS_TYPE = types_1.AddressType.MultisigSegwitNative;
exports.DEFAULT_DERIVATION_PATHS = {
    [types_1.AddressType.Legacy]: "m/44'/0'/0'",
    [types_1.AddressType.SegwitP2SH]: "m/49'/0'/0'",
    [types_1.AddressType.SegwitNative]: "m/84'/0'/0'",
};
exports.DEFAULT_NETWORK = lib_common_1.NetworkType.Mainnet;
exports.NETWORK_MAINNET = bitcoinjs_lib_1.networks.bitcoin;
exports.NETWORK_TESTNET = bitcoinjs_lib_1.networks.testnet;
exports.NETWORKS = {
    [lib_common_1.NetworkType.Mainnet]: exports.NETWORK_MAINNET,
    [lib_common_1.NetworkType.Testnet]: exports.NETWORK_TESTNET,
};
exports.DEFAULT_MAINNET_SERVER = process.env.BITCOIN_SERVER_URL
    ? process.env.BITCOIN_SERVER_URL.split(',')
    : ['https://btc1.trezor.io', 'https://btc2.trezor.io'];
exports.DEFAULT_TESTNET_SERVER = process.env.BITCOIN_TESTNET_SERVER_URL
    ? process.env.BITCOIN_TESTNET_SERVER_URL.split(',')
    : ['https://tbtc1.trezor.io', 'https://tbtc2.trezor.io'];
exports.DEFAULT_FEE_LEVEL = lib_common_1.FeeLevel.Medium;
exports.PUBLIC_CONFIG_OMIT_FIELDS = ['logger', 'server', 'api', 'hdKey', 'keyPairs', 'blockcypherToken'];
//# sourceMappingURL=constants.js.map