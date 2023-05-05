/// <reference types="node" />
import { NetworkType } from '../lib-common';
import { LitecoinAddressFormat, SinglesigAddressType } from './types';
import { bitcoinish } from '../lib-bitcoin';
declare const getMultisigPaymentScript: typeof bitcoinish.getMultisigPaymentScript, getSinglesigPaymentScript: typeof bitcoinish.getSinglesigPaymentScript, publicKeyToKeyPair: typeof bitcoinish.publicKeyToKeyPair, publicKeyToString: typeof bitcoinish.publicKeyToString, publicKeyToBuffer: typeof bitcoinish.publicKeyToBuffer, privateKeyToKeyPair: typeof bitcoinish.privateKeyToKeyPair;
export { getMultisigPaymentScript, getSinglesigPaymentScript, publicKeyToKeyPair, publicKeyToString, publicKeyToBuffer, privateKeyToKeyPair, };
declare const toMainDenominationBigNumber: (baseNumeric: string | number | import("bignumber.js").default) => import("bignumber.js").default, toMainDenominationString: (baseNumeric: string | number | import("bignumber.js").default) => string, toMainDenominationNumber: (baseNumeric: string | number | import("bignumber.js").default) => number, toBaseDenominationBigNumber: (mainNumeric: string | number | import("bignumber.js").default) => import("bignumber.js").default, toBaseDenominationString: (mainNumeric: string | number | import("bignumber.js").default) => string, toBaseDenominationNumber: (mainNumeric: string | number | import("bignumber.js").default) => number;
export { toMainDenominationBigNumber, toMainDenominationString, toMainDenominationNumber, toBaseDenominationBigNumber, toBaseDenominationString, toBaseDenominationNumber, };
/**
 * Return true if address is a deprecated p2sh address (bitcoin format)
 * 3-prefix: mainnet
 * 2-prefix: testnet
 */
export declare function isDeprecatedP2shAddress(address: string, networkType: NetworkType): boolean;
/**
 * Return true if address is a modern p2sh address
 * M-prefix: mainnet
 * Q-prefix: testnet
 */
export declare function isModernP2shAddress(address: string, networkType: NetworkType): boolean;
/**
 * defined format: return true if address is valid in provided format
 * undefined format: return true if address is valid in *any* format
 */
export declare function isValidAddress(address: string, networkType: NetworkType, format?: LitecoinAddressFormat): boolean;
export declare function standardizeAddress(address: string, networkType: NetworkType, format: LitecoinAddressFormat): string | null;
export declare function isValidPublicKey(publicKey: string | Buffer, networkType: NetworkType): boolean;
export declare function isValidPrivateKey(privateKey: string, networkType: NetworkType): boolean;
export declare function estimateLitecoinTxSize(inputCounts: {
    [k: string]: number;
}, outputCounts: {
    [k: string]: number;
}, networkType: NetworkType): number;
export declare function publicKeyToAddress(publicKey: string | Buffer, networkType: NetworkType, addressType: SinglesigAddressType, format: LitecoinAddressFormat): string;
export declare function privateKeyToAddress(privateKey: string, networkType: NetworkType, addressType: SinglesigAddressType, format: LitecoinAddressFormat): string;
