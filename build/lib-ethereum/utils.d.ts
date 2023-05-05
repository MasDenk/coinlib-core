import { Logger } from '../ts-common';
import { BlockbookEthereum, NormalizedTxEthereum } from 'blockbook-client';
import { EthereumBlockbookConnectedConfig } from './types';
export declare function retryIfDisconnected<T>(fn: () => Promise<T>, logger: Logger, additionalRetryableErrors?: string[]): Promise<T>;
export declare function resolveServer({ server, requestTimeoutMs, api }: EthereumBlockbookConnectedConfig, logger: Logger): {
    api: BlockbookEthereum;
    server: string[] | null;
};
export declare function getBlockBookTxFromAndToAddress(tx: NormalizedTxEthereum): {
    toAddress: string;
    fromAddress: string;
};
