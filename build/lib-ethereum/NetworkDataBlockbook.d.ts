import { BlockInfo } from '../lib-common';
import { BlockbookEthereum, BlockInfoEthereum, GetAddressDetailsOptions, NormalizedTxEthereum, SpecificTxEthereum } from 'blockbook-client';
import { EthereumBlockbookConnectedConfig, EthereumNetworkDataProvider, EthereumStandardizedERC20Transaction, EthereumStandardizedTransaction } from './types';
export declare class NetworkDataBlockbook implements EthereumNetworkDataProvider {
    private logger;
    private api;
    constructor(config: EthereumBlockbookConnectedConfig);
    init(): Promise<void>;
    destroy(): Promise<void>;
    getApi(): BlockbookEthereum;
    getBlock(id?: string | number): Promise<BlockInfo>;
    standardizeBlock(block: BlockInfoEthereum): {
        id: string;
        height: number;
        time: Date;
    } & {
        previousId?: string;
        raw?: object;
    };
    getCurrentBlockNumber(): Promise<number>;
    getTransaction(txId: string): Promise<EthereumStandardizedTransaction>;
    getAddressDetails(address: string, options?: GetAddressDetailsOptions): Promise<{
        page: number;
        totalPages: number;
        itemsOnPage: number;
    } & {
        address: string;
        balance: string;
        unconfirmedBalance: string;
        unconfirmedTxs: number;
        txs: number;
    } & {
        totalReceived?: string;
        totalSent?: string;
        nonTokenTxs?: number;
        nonce?: string;
        usedTokens?: number;
        erc20Contract?: any;
    } & {
        nonTokenTxs: number;
        nonce: string;
    } & {
        tokens?: ({
            type: "ERC20";
            name: string;
            contract: string;
            transfers: number;
            symbol: string;
        } & {
            balance: string;
        })[];
    } & {
        txids?: string[];
    }>;
    getERC20Transaction(txId: string, tokenAddress: string): Promise<EthereumStandardizedERC20Transaction>;
    getAddressBalance(address: string): Promise<string>;
    getAddressBalanceERC20(address: string, tokenAddress: string): Promise<string>;
    standardizeTransaction(tx: NormalizedTxEthereum, blockInfoTime?: Date): EthereumStandardizedTransaction;
    standardizeERC20Transaction({ tx, txSpecific, tokenSymbol, tokenDecimals, tokenName, }: {
        tx: NormalizedTxEthereum;
        txSpecific: SpecificTxEthereum;
        tokenSymbol: string;
        tokenDecimals: string;
        tokenName: string;
    }): EthereumStandardizedERC20Transaction;
    _retryDced<T>(fn: () => Promise<T>, additionalRetryableErrors?: string[]): Promise<T>;
}
