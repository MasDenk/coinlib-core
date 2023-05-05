import { BitcoinjsKeyPair } from './types';
import { BitcoinjsNetwork, bitcoinish } from '../lib-bitcoin';
import { HDNode } from '../lib-common';
declare const convertXPrefixHdKeys: typeof bitcoinish.convertXPrefixHdKeys;
export { HDNode, convertXPrefixHdKeys };
/**
 * Split full path into array of indices
 *
 * @example "m/44'/0'/0'/1/23" -> ["44'", "0'", "0'", "1", "23"]
 */
export declare function splitDerivationPath(path: string): string[];
/**
 * Derive the base HDNode required for deriveKeyPair, deriveAddress, and derivePrivateKey functions
 *
 * This partially applies the derivation path starting at the already derived depth of the provided key.
 */
export declare function deriveHDNode(hdKey: string, derivationPath: string, network: BitcoinjsNetwork): HDNode;
export declare function deriveKeyPair(baseNode: HDNode, index: number, network: BitcoinjsNetwork): BitcoinjsKeyPair;
export declare function deriveAddress(baseNode: HDNode, index: number, network: BitcoinjsNetwork): string;
export declare function derivePrivateKey(baseNode: HDNode, index: number, network: BitcoinjsNetwork): string;
export declare function xprvToXpub(xprv: string, derivationPath: string, network: BitcoinjsNetwork): string;
export declare function isValidXprv(xprv: string, network?: BitcoinjsNetwork): boolean;
export declare function isValidXpub(xpub: string, network?: BitcoinjsNetwork): boolean;
/** Return string error if invalid, undefined otherwise */
export declare function validateHdKey(hdKey: string, network?: BitcoinjsNetwork): string | undefined;
