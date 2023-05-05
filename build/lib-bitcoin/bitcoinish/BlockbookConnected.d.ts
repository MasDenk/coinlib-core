import { NetworkType } from '../../lib-common';
import { Logger } from '../../ts-common';
import { BlockbookBitcoin } from 'blockbook-client';
import { BlockbookConnectedConfig, BlockbookServerAPI } from './types';
export declare abstract class BlockbookConnected {
    networkType: NetworkType;
    logger: Logger;
    api: BlockbookServerAPI;
    server: string[] | null;
    constructor(config: BlockbookConnectedConfig);
    getApi(): BlockbookBitcoin;
    init(): Promise<void>;
    destroy(): Promise<void>;
}
