"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FEE_LEVEL_BLOCK_TARGETS = exports.DEFAULT_FEE_LEVEL = exports.DEFAULT_TESTNET_SERVER = exports.DEFAULT_MAINNET_SERVER = exports.NETWORKS = exports.NETWORK_TESTNET = exports.NETWORK_MAINNET = exports.DEFAULT_NETWORK = exports.DEFAULT_DERIVATION_PATH = exports.DEFAULT_MULTISIG_ADDRESS_TYPE = exports.SINGLESIG_ADDRESS_TYPE = exports.DEFAULT_SINGLESIG_ADDRESS_TYPE = exports.DEFAULT_MIN_TX_FEE = exports.BITCOIN_SEQUENCE_RBF = exports.DEFAULT_NETWORK_MIN_RELAY_FEE = exports.DEFAULT_DUST_THRESHOLD = exports.COIN_NAME = exports.COIN_SYMBOL = exports.DECIMAL_PLACES = exports.PACKAGE_NAME = void 0;
const lib_common_1 = require("../lib-common");
const types_1 = require("./types");
exports.PACKAGE_NAME = 'dash-payments';
exports.DECIMAL_PLACES = 8;
exports.COIN_SYMBOL = 'DASH';
exports.COIN_NAME = 'Dash';
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
exports.BITCOIN_SEQUENCE_RBF = 0xFFFFFFFD;
/**
 * The minimum fee this library should ever use for a transaction (overrides recommended levels).
 *
 * Unit: `sat/byte`
 */
exports.DEFAULT_MIN_TX_FEE = 1;
exports.DEFAULT_SINGLESIG_ADDRESS_TYPE = types_1.AddressType.Legacy;
exports.SINGLESIG_ADDRESS_TYPE = types_1.AddressType.Legacy;
exports.DEFAULT_MULTISIG_ADDRESS_TYPE = types_1.AddressType.MultisigLegacy;
exports.DEFAULT_DERIVATION_PATH = "m/44'/5'/0'";
exports.DEFAULT_NETWORK = lib_common_1.NetworkType.Mainnet;
exports.NETWORK_MAINNET = {
    messagePrefix: '\x19DarkCoin Signed Message:\n',
    bech32: 'dash',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 0x4c,
    scriptHash: 0x10,
    wif: 0xcc,
};
exports.NETWORK_TESTNET = {
    messagePrefix: '\x19DarkCoin Signed Message:\n',
    bech32: 'dashTest',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 0x8c,
    scriptHash: 0x13,
    wif: 0xef,
};
exports.NETWORKS = {
    [lib_common_1.NetworkType.Mainnet]: exports.NETWORK_MAINNET,
    [lib_common_1.NetworkType.Testnet]: exports.NETWORK_TESTNET,
};
exports.DEFAULT_MAINNET_SERVER = process.env.DASH_SERVER_URL
    ? process.env.DASH_SERVER_URL.split(',')
    : ['https://dash1.trezor.io', 'https://dash2.trezor.io'];
exports.DEFAULT_TESTNET_SERVER = process.env.DASH_TESTNET_SERVER_URL || '';
exports.DEFAULT_FEE_LEVEL = lib_common_1.FeeLevel.Low;
exports.DEFAULT_FEE_LEVEL_BLOCK_TARGETS = {
    [lib_common_1.FeeLevel.High]: 10,
    [lib_common_1.FeeLevel.Medium]: 5,
    [lib_common_1.FeeLevel.Low]: 1,
};
//# sourceMappingURL=constants.js.map