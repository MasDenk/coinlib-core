/// <reference types="node" />
import { NetworkType } from '../lib-common';
import { bitcoinish } from '../lib-bitcoin';
declare const getMultisigPaymentScript: typeof bitcoinish.getMultisigPaymentScript, getSinglesigPaymentScript: typeof bitcoinish.getSinglesigPaymentScript, publicKeyToAddress: typeof bitcoinish.publicKeyToAddress, publicKeyToKeyPair: typeof bitcoinish.publicKeyToKeyPair, publicKeyToString: typeof bitcoinish.publicKeyToString, publicKeyToBuffer: typeof bitcoinish.publicKeyToBuffer, privateKeyToKeyPair: typeof bitcoinish.privateKeyToKeyPair, privateKeyToAddress: typeof bitcoinish.privateKeyToAddress;
export { getMultisigPaymentScript, getSinglesigPaymentScript, publicKeyToAddress, publicKeyToKeyPair, publicKeyToString, publicKeyToBuffer, privateKeyToKeyPair, privateKeyToAddress, };
declare const toMainDenominationBigNumber: (baseNumeric: string | number | import("bignumber.js").default) => import("bignumber.js").default, toMainDenominationString: (baseNumeric: string | number | import("bignumber.js").default) => string, toMainDenominationNumber: (baseNumeric: string | number | import("bignumber.js").default) => number, toBaseDenominationBigNumber: (mainNumeric: string | number | import("bignumber.js").default) => import("bignumber.js").default, toBaseDenominationString: (mainNumeric: string | number | import("bignumber.js").default) => string, toBaseDenominationNumber: (mainNumeric: string | number | import("bignumber.js").default) => number;
export { toMainDenominationBigNumber, toMainDenominationString, toMainDenominationNumber, toBaseDenominationBigNumber, toBaseDenominationString, toBaseDenominationNumber, };
export declare function isValidAddress(address: string, networkType: NetworkType): boolean;
export declare function standardizeAddress(address: string, networkType: NetworkType): string | null;
export declare function isValidPublicKey(publicKey: string | Buffer, networkType: NetworkType): boolean;
export declare function isValidExtraId(extraId: string): boolean;
export declare function isValidPrivateKey(privateKey: string, networkType: NetworkType): boolean;
export declare function estimateDashTxSize(inputCounts: {
    [k: string]: number;
}, outputCounts: {
    [k: string]: number;
}, networkType: NetworkType): number;
