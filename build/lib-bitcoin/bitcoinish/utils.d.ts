/// <reference types="node" />
import { NetworkType, UtxoInfo, AutoFeeLevels, FeeRate, BigNumber } from '../../lib-common';
import { BlockbookBitcoin } from 'blockbook-client';
import { Logger } from '../../ts-common';
import { AddressType, BlockbookConnectedConfig, BlockbookServerAPI } from './types';
export declare function resolveServer(config: BlockbookConnectedConfig, logger: Logger): {
    api: BlockbookServerAPI;
    server: string[] | null;
};
export declare function retryIfDisconnected<T>(fn: () => Promise<T>, api: BlockbookBitcoin, logger: Logger, additionalRetryableErrors?: string[]): Promise<T>;
/** returns the sum of a particular field in an array of items */
export declare function sumField<T extends {
    [key: string]: any;
}>(items: T[], field: keyof T): BigNumber;
/**
 * Sum the utxos values (main denomination)
 */
export declare function sumUtxoValue(utxos: UtxoInfo[], includeUnconfirmed?: boolean): BigNumber;
export declare function countOccurences<T extends string[]>(a: T): {
    [key: string]: number;
};
/**
 * Shuffle the utxos for input selection.
 */
export declare function shuffleUtxos<T extends UtxoInfo>(utxoList: T[]): T[];
export declare function isConfirmedUtxo(utxo: UtxoInfo): boolean;
export declare function sha256FromHex(hex: string): string;
export declare function getBlockcypherFeeRecommendation(feeLevel: AutoFeeLevels, coinSymbol: string, networkType: NetworkType, blockcypherToken: string | undefined, logger: Logger): Promise<FeeRate>;
export declare function getBlockbookFeeRecommendation(blockTarget: number, coinSymbol: string, networkType: NetworkType, blockbookClient: BlockbookBitcoin, logger: Logger): Promise<FeeRate>;
export declare const ADDRESS_INPUT_WEIGHTS: {
    [k in AddressType]: number;
};
export declare const ADDRESS_OUTPUT_WEIGHTS: {
    [k in AddressType]: number;
};
/**
 * Estimate the size of a bitcoin tx in vbytes
 *
 * Usage:
 *
 * `estimateTxSize({'p2sh-p2ms:2-4':4},{'p2pkh':1,'1J5d68gBGsNS8bxMGBnjCHorYCYGXQnM65': 1})`
 *   Means "4 inputs of P2SH Multisig, 1 output of P2PKH, and one output to 1J5d68gBGsNS8bxMGBnjCHorYCYGXQnM65"
 *
 * `estimateTxSize({'p2pkh':1,'p2sh-p2wsh-p2ms:2-3':2},{'p2wpkh':2})`
 *   means "1 P2PKH input and 2 Multisig segwit P2SH (2 of 3) inputs along with 2 native segwit outputs"
 *
 * Adapted from: https://gist.github.com/junderw/b43af3253ea5865ed52cb51c200ac19c
 *
 * @param toOutputScript - An function equivalent to bitcoin.address.toOutputScript without the network arg
 *    ie (address) => bitcoin.address.toOutputScript(address, bitcoin.networks.testnet)
 */
export declare function estimateTxSize(inputCounts: {
    [k: string]: number;
}, outputCounts: {
    [k: string]: number;
}, toOutputScript: (address: string) => Buffer): number;
export declare function bip32MagicNumberToPrefix(magicNum: number): string;
