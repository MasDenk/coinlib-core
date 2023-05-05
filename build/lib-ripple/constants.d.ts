import { NetworkType, AutoFeeLevels } from '../lib-common';
import { RippleCreateTransactionOptions } from './types';
export declare const PACKAGE_NAME = "ripple-payments";
export declare const COIN_SYMBOL = "XRP";
export declare const COIN_NAME = "Ripple";
export declare const DECIMAL_PLACES = 6;
export declare const MIN_BALANCE = 20;
export declare const DEFAULT_CREATE_TRANSACTION_OPTIONS: RippleCreateTransactionOptions;
export declare const DEFAULT_MAX_LEDGER_VERSION_OFFSET = 1000;
/**
 * Source: https://github.com/ripple/ripple-lib/blob/develop/src/common/schemas/objects/address.json
 */
export declare const ADDRESS_REGEX: RegExp;
export declare const EXTRA_ID_REGEX: RegExp;
/**
 * Source: crypto-regex
 */
export declare const XPUB_REGEX: RegExp;
export declare const XPRV_REGEX: RegExp;
export declare const NOT_FOUND_ERRORS: string[];
export declare const CONNECTION_ERRORS: string[];
export declare const RETRYABLE_ERRORS: string[];
export declare const MAX_API_CALL_RETRIES = 2;
export declare const DEFAULT_NETWORK = NetworkType.Mainnet;
export declare const DEFAULT_MAINNET_SERVER = "wss://s1.ripple.com";
export declare const DEFAULT_TESTNET_SERVER = "wss://s.altnet.rippletest.net:51233";
export declare const DEFAULT_FEE_LEVEL: AutoFeeLevels;
export declare const PUBLIC_CONFIG_OMIT_FIELDS: string[];
export declare const FEE_LEVEL_CUSHIONS: {
    low: number;
    medium: number;
    high: number;
};
