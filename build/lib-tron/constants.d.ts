import { FeeLevel } from '../lib-common';
export declare const PACKAGE_NAME = "tron-payments";
export declare const COIN_SYMBOL = "TRX";
export declare const COIN_NAME = "Tron";
export declare const DECIMAL_PLACES = 6;
export declare const MIN_BALANCE_SUN = 100000;
export declare const MIN_BALANCE_TRX = 0.1;
export declare const DEFAULT_FULL_NODE: string;
export declare const DEFAULT_SOLIDITY_NODE: string;
export declare const DEFAULT_EVENT_SERVER: string;
export declare const DEFAULT_FEE_LEVEL = FeeLevel.Medium;
export declare const TX_EXPIRATION_EXTENSION_SECONDS: number;
/** Milliseconds to wait past tx expiration before recognizing it as expired. */
export declare const EXPIRATION_FUDGE_MS: number;
export declare const PUBLIC_CONFIG_OMIT_FIELDS: string[];
