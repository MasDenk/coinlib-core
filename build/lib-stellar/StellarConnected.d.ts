import { NetworkType, BlockInfo, BigNumber } from '../lib-common';
import { Logger } from '../ts-common';
import * as Stellar from 'stellar-sdk';
import { BaseStellarConfig, StellarRawTransaction } from './types';
export declare abstract class StellarConnected {
    networkType: NetworkType;
    logger: Logger;
    api: Stellar.Server | null;
    server: string | null;
    constructor(config?: BaseStellarConfig);
    getApi(): Stellar.Server;
    init(): Promise<void>;
    destroy(): Promise<void>;
    _retryDced<T>(fn: () => Promise<T>): Promise<T>;
    getBlock(id?: string | number): Promise<BlockInfo>;
    _normalizeTxOperation(tx: StellarRawTransaction): Promise<{
        amount: BigNumber;
        fee: BigNumber;
        fromAddress: string;
        toAddress: string;
    }>;
}
