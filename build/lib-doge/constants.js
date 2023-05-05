"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FEE_LEVEL_BLOCK_TARGETS = exports.DEFAULT_FEE_LEVEL = exports.DEFAULT_TESTNET_SERVER = exports.DEFAULT_MAINNET_SERVER = exports.NETWORKS = exports.NETWORK_TESTNET = exports.NETWORK_MAINNET = exports.DEFAULT_NETWORK = exports.DEFAULT_DERIVATION_PATH = exports.DEFAULT_MULTISIG_ADDRESS_TYPE = exports.SINGLESIG_ADDRESS_TYPE = exports.DEFAULT_MIN_TX_FEE = exports.BITCOIN_SEQUENCE_RBF = exports.DEFAULT_NETWORK_MIN_RELAY_FEE = exports.DEFAULT_DUST_THRESHOLD = exports.COIN_NAME = exports.COIN_SYMBOL = exports.DECIMAL_PLACES = exports.PACKAGE_NAME = void 0;
const lib_common_1 = require("../lib-common");
const types_1 = require("./types");
exports.PACKAGE_NAME = 'doge-payments';
exports.DECIMAL_PLACES = 8;
exports.COIN_SYMBOL = 'DOGE';
exports.COIN_NAME = 'Dogecoin';
// Most nodes require 1 DOGE minimum fee and dust threshold
// https://github.com/dogecoin/dogecoin/issues/1650
/**
 * The minimum value a transaction output must be in order to not get rejected by the network.
 *
 * Unit: `satoshis`
 */
exports.DEFAULT_DUST_THRESHOLD = 1e8;
/**
 * The minimum fee required by *most* nodes to relay a transaction.
 *
 * Unit: `satoshis`
 */
exports.DEFAULT_NETWORK_MIN_RELAY_FEE = 1e8;
/** Sequence to use for each input such that RBF is opted into */
exports.BITCOIN_SEQUENCE_RBF = 0xfffffffd;
/**
 * The minimum fee this library should ever use for a transaction (overrides recommended levels).
 *
 * Unit: `sat/byte`
 */
exports.DEFAULT_MIN_TX_FEE = 1000000; // 10 DOGE per kb
exports.SINGLESIG_ADDRESS_TYPE = types_1.AddressType.Legacy;
exports.DEFAULT_MULTISIG_ADDRESS_TYPE = types_1.AddressType.MultisigLegacy;
exports.DEFAULT_DERIVATION_PATH = "m/44'/3'/0'";
exports.DEFAULT_NETWORK = lib_common_1.NetworkType.Mainnet;
exports.NETWORK_MAINNET = {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bech32: 'dogecoin',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e,
};
exports.NETWORK_TESTNET = {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bech32: 'dogeTest',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 0x71,
    scriptHash: 0xc4,
    wif: 0xf1,
};
exports.NETWORKS = {
    [lib_common_1.NetworkType.Mainnet]: exports.NETWORK_MAINNET,
    [lib_common_1.NetworkType.Testnet]: exports.NETWORK_TESTNET,
};
exports.DEFAULT_MAINNET_SERVER = process.env.DOGECOIN_SERVER_URL
    ? process.env.DOGECOIN_SERVER_URL.split(',')
    : ['https://doge1.trezor.io', 'https://doge2.trezor.io'];
exports.DEFAULT_TESTNET_SERVER = process.env.DOGE_TESTNET_SERVER_URL || '';
exports.DEFAULT_FEE_LEVEL = lib_common_1.FeeLevel.High;
// dogecoin estimatefee only works for targets between 3 and 25
exports.DEFAULT_FEE_LEVEL_BLOCK_TARGETS = {
    [lib_common_1.FeeLevel.High]: 3,
    [lib_common_1.FeeLevel.Medium]: 12,
    [lib_common_1.FeeLevel.Low]: 24,
};
//# sourceMappingURL=constants.js.map