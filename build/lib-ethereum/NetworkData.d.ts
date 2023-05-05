import { AutoFeeLevels, BlockInfo, FunctionPropertyNames, NewBlockCallback } from '../lib-common';
import { GetAddressDetailsOptions, NormalizedTxEthereum } from 'blockbook-client';
import { TransactionConfig } from 'web3-core';
import { EthereumNetworkDataProvider, EthereumStandardizedERC20Transaction, EthereumStandardizedTransaction, EthTxType, NetworkDataConfig } from './types';
export declare class NetworkData {
    private gasStationUrl;
    private parityUrl;
    private logger;
    private blockBookService;
    private web3Service;
    constructor(config: NetworkDataConfig);
    connectBlockBook(): Promise<void>;
    disconnectBlockBook(): Promise<void>;
    callBlockbookWithWeb3Fallback<K extends FunctionPropertyNames<EthereumNetworkDataProvider>>(methodName: K, ...args: Parameters<EthereumNetworkDataProvider[K]>): Promise<ReturnType<EthereumNetworkDataProvider[K]>>;
    getBlock(blockId: string | number): Promise<BlockInfo>;
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
    getGasAndNonceForNewTx(txType: EthTxType, speed: AutoFeeLevels, from: string, to: string, data?: string): Promise<{
        pricePerGasUnit: string;
        nonce: string;
        amountOfGas: number;
    }>;
    getNonce(address: string): Promise<string>;
    getGasPrice(speed: AutoFeeLevels): Promise<string>;
    estimateGas(txObject: TransactionConfig, txType: EthTxType): Promise<number>;
    getERC20Transaction(txId: string, tokenAddress: string): Promise<EthereumStandardizedERC20Transaction>;
    getTransaction(txId: string): Promise<EthereumStandardizedTransaction>;
    getCurrentBlockNumber(): Promise<number>;
    getAddressBalance(address: string): Promise<string>;
    getAddressBalanceERC20(address: string, tokenAddress: string): Promise<string>;
    private getParityNonce;
    private getGasStationGasPrice;
    getTxRaw(txId: string): Promise<{
        txid: string;
        vin: ({
            n: number;
        } & {
            txid?: string;
            vout?: number;
            sequence?: number;
            addresses?: string[];
            value?: string;
            hex?: string;
            asm?: string;
            coinbase?: string;
            isAddress?: boolean;
        })[];
        vout: ({
            n: number;
            addresses: string[];
        } & {
            value?: string;
            spent?: boolean;
            spentTxId?: string;
            spentIndex?: number;
            spentHeight?: number;
            hex?: string;
            asm?: string;
            type?: string;
            isAddress?: boolean;
        })[];
        blockHeight: number;
        confirmations: number;
        blockTime: number;
        value: string;
    } & {
        version?: number;
        lockTime?: number;
        blockHash?: string;
        size?: number;
        valueIn?: string;
        fees?: string;
        hex?: string;
        tokenTransfers?: {
            type: string;
            from: string;
            to: string;
            token: string;
            name: string;
            symbol: string;
            decimals: number;
            value: string;
        }[];
        ethereumSpecific?: {
            status: number;
            nonce: number;
            gasLimit: number;
            gasUsed: number;
            gasPrice: string;
        };
    } & {
        vin: ({
            n: number;
        } & {
            txid?: string;
            vout?: number;
            sequence?: number;
            addresses?: string[];
            value?: string;
            hex?: string;
            asm?: string;
            coinbase?: string;
            isAddress?: boolean;
        } & {
            addresses: string[];
        })[];
        vout: ({
            n: number;
            addresses: string[];
        } & {
            value?: string;
            spent?: boolean;
            spentTxId?: string;
            spentIndex?: number;
            spentHeight?: number;
            hex?: string;
            asm?: string;
            type?: string;
            isAddress?: boolean;
        } & {
            value: string;
        })[];
        fees: string;
        ethereumSpecific: {
            status: number;
            nonce: number;
            gasLimit: number;
            gasUsed: number;
            gasPrice: string;
        };
    }>;
    subscribeAddresses(addresses: string[], callbackFn: (address: string, rawTx: NormalizedTxEthereum) => Promise<void>): Promise<void>;
    subscribeNewBlock(callbackFn: NewBlockCallback): Promise<void>;
    _retryDced<T>(fn: () => Promise<T>): Promise<T>;
}
