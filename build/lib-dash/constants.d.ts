import { FeeLevel, NetworkType } from '../lib-common';
import { BitcoinjsNetwork, bitcoinish } from '../lib-bitcoin';
import { AddressType } from './types';
export declare const PACKAGE_NAME = "dash-payments";
export declare const DECIMAL_PLACES = 8;
export declare const COIN_SYMBOL = "DASH";
export declare const COIN_NAME = "Dash";
/**
 * The minimum value a transaction output must be in order to not get rejected by the network.
 *
 * Unit: `satoshis`
 */
export declare const DEFAULT_DUST_THRESHOLD = 546;
/**
 * The minimum fee required by *most* nodes to relay a transaction.
 *
 * Unit: `satoshis`
 */
export declare const DEFAULT_NETWORK_MIN_RELAY_FEE = 1000;
/** Sequence to use for each input such that RBF is opted into */
export declare const BITCOIN_SEQUENCE_RBF = 4294967293;
/**
 * The minimum fee this library should ever use for a transaction (overrides recommended levels).
 *
 * Unit: `sat/byte`
 */
export declare const DEFAULT_MIN_TX_FEE = 1;
export declare const DEFAULT_SINGLESIG_ADDRESS_TYPE = AddressType.Legacy;
export declare const SINGLESIG_ADDRESS_TYPE = AddressType.Legacy;
export declare const DEFAULT_MULTISIG_ADDRESS_TYPE = AddressType.MultisigLegacy;
export declare const DEFAULT_DERIVATION_PATH = "m/44'/5'/0'";
export declare const DEFAULT_NETWORK = NetworkType.Mainnet;
export declare const NETWORK_MAINNET: {
    messagePrefix: string;
    bech32: string;
    bip32: {
        public: number;
        private: number;
    };
    pubKeyHash: number;
    scriptHash: number;
    wif: number;
};
export declare const NETWORK_TESTNET: {
    messagePrefix: string;
    bech32: string;
    bip32: {
        public: number;
        private: number;
    };
    pubKeyHash: number;
    scriptHash: number;
    wif: number;
};
export declare const NETWORKS: {
    [networkType in NetworkType]: BitcoinjsNetwork;
};
export declare const DEFAULT_MAINNET_SERVER: string[];
export declare const DEFAULT_TESTNET_SERVER: string;
export declare const DEFAULT_FEE_LEVEL = FeeLevel.Low;
export declare const DEFAULT_FEE_LEVEL_BLOCK_TARGETS: bitcoinish.FeeLevelBlockTargets;
