import { HDNode } from '../lib-common';
import baseX from 'base-x';
import { RippleSignatory } from './types';
export declare const RIPPLE_B58_DICT = "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz";
export declare const base58: baseX.BaseConverter;
export declare const derivationPath = "m/44'/144'/0'";
export declare function deriveSignatory(hdKey: string, index: number): RippleSignatory;
export declare function xprvToXpub(xprv: string | HDNode): string;
export declare function generateNewKeys(): {
    xpub: string;
    xprv: string;
};
export declare function hdNodeToPublicKey(key: HDNode): string;
export declare function hdNodeToPrivateKey(key: HDNode): string;
/**
 * Source: https://xrpl.org/accounts.html#address-encoding
 */
export declare function publicKeyToAddress(pubkeyHex: string): string;
