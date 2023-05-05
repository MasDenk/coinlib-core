"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FEE_LEVEL_BLOCK_TARGETS = exports.DEFAULT_ADDRESS_FORMAT = exports.DEFAULT_FEE_LEVEL = exports.DEFAULT_TESTNET_SERVER = exports.DEFAULT_MAINNET_SERVER = exports.NETWORKS = exports.NETWORK_TESTNET = exports.NETWORK_MAINNET = exports.DEFAULT_NETWORK = exports.DEFAULT_DERIVATION_PATHS = exports.DEFAULT_MULTISIG_ADDRESS_TYPE = exports.DEFAULT_SINGLESIG_ADDRESS_TYPE = exports.DEFAULT_MIN_TX_FEE = exports.LITECOIN_SEQUENCE_RBF = exports.DEFAULT_NETWORK_MIN_RELAY_FEE = exports.DEFAULT_DUST_THRESHOLD = exports.COIN_NAME = exports.COIN_SYMBOL = exports.DECIMAL_PLACES = exports.PACKAGE_NAME = void 0;
const lib_common_1 = require("../lib-common");
const types_1 = require("./types");
exports.PACKAGE_NAME = 'litecoin-payments';
exports.DECIMAL_PLACES = 8;
exports.COIN_SYMBOL = 'LTC';
exports.COIN_NAME = 'Litecoin';
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
exports.LITECOIN_SEQUENCE_RBF = 0xfffffffd;
/**
 * The minimum fee this library should ever use for a transaction (overrides recommended levels).
 *
 * Unit: `sat/byte`
 */
exports.DEFAULT_MIN_TX_FEE = 10;
exports.DEFAULT_SINGLESIG_ADDRESS_TYPE = types_1.AddressType.SegwitNative;
exports.DEFAULT_MULTISIG_ADDRESS_TYPE = types_1.AddressType.MultisigSegwitNative;
exports.DEFAULT_DERIVATION_PATHS = {
    [types_1.AddressType.Legacy]: "m/44'/2'/0'",
    [types_1.AddressType.SegwitP2SH]: "m/49'/2'/0'",
    [types_1.AddressType.SegwitNative]: "m/84'/2'/0'",
};
exports.DEFAULT_NETWORK = lib_common_1.NetworkType.Mainnet;
exports.NETWORK_MAINNET = {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
};
exports.NETWORK_TESTNET = {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'tltc',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0x3a,
    wif: 0xef,
};
exports.NETWORKS = {
    [lib_common_1.NetworkType.Mainnet]: exports.NETWORK_MAINNET,
    [lib_common_1.NetworkType.Testnet]: exports.NETWORK_TESTNET,
};
exports.DEFAULT_MAINNET_SERVER = process.env.LITECOIN_SERVER_URL
    ? process.env.LITECOIN_SERVER_URL.split(',')
    : ['https://ltc1.trezor.io', 'https://ltc2.trezor.io'];
exports.DEFAULT_TESTNET_SERVER = process.env.LITECOIN_TESTNET_SERVER_URL || ''; // will default to mainnet due to not testing LTC testnet
exports.DEFAULT_FEE_LEVEL = lib_common_1.FeeLevel.Medium;
exports.DEFAULT_ADDRESS_FORMAT = types_1.LitecoinAddressFormat.Modern;
exports.DEFAULT_FEE_LEVEL_BLOCK_TARGETS = {
    [lib_common_1.FeeLevel.High]: 4,
    [lib_common_1.FeeLevel.Medium]: 4 * 24,
    [lib_common_1.FeeLevel.Low]: 4 * 144,
};
//# sourceMappingURL=constants.js.map