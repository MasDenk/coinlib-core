import { BlockInfo } from '../lib-common';
import { Logger } from '../ts-common';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import Contract from 'web3-eth-contract';
import { BlockTransactionObject, Transaction, TransactionReceipt } from 'web3-eth';
import { EthereumWeb3Config, EthTxType, EthereumNetworkDataProvider, EthereumStandardizedTransaction, EthereumStandardizedERC20Transaction } from './types';
export declare class NetworkDataWeb3 implements EthereumNetworkDataProvider {
    web3: Web3;
    eth: Web3['eth'];
    logger: Logger;
    server: string | null;
    constructor(config: EthereumWeb3Config);
    protected newContract(...args: ConstructorParameters<typeof Contract>): Contract;
    getCurrentBlockNumber(): Promise<number>;
    getTransactionReceipt(txId: string): Promise<TransactionReceipt>;
    getTokenInfo(tokenAddress: string): Promise<{
        tokenSymbol: any;
        tokenDecimals: any;
        tokenName: any;
    }>;
    getBlock(id?: string | number): Promise<BlockInfo>;
    getERC20Transaction(txId: string, tokenAddress: string): Promise<EthereumStandardizedERC20Transaction>;
    getAddressBalance(address: string): Promise<string>;
    getAddressBalanceERC20(address: string, tokenAddress: string): Promise<string>;
    estimateGas(txObject: TransactionConfig, txType: EthTxType): Promise<number>;
    getWeb3Nonce(address: string): Promise<string>;
    getWeb3GasPrice(): Promise<string>;
    getTransaction(txId: string): Promise<EthereumStandardizedTransaction>;
    standardizeBlock(block: BlockTransactionObject): Promise<{
        id: string;
        height: number;
        time: Date;
    } & {
        previousId?: string;
        raw?: object;
    }>;
    standardizeTransaction(tx: Transaction, { blockTime, currentBlockNumber, gasUsed, contractAddress, status, }: {
        blockTime: Date | null;
        currentBlockNumber: number;
        gasUsed: number;
        contractAddress?: string;
        status: boolean;
    }): EthereumStandardizedTransaction;
    standardizeERC20Transaction({ tx, txReceipt, }: {
        tx: Transaction;
        txReceipt: TransactionReceipt;
    }, { blockTime, currentBlockNumber, tokenDecimals, tokenName, tokenSymbol, }: {
        blockTime: Date;
        currentBlockNumber: number;
        tokenDecimals: string;
        tokenName: string;
        tokenSymbol: string;
    }): EthereumStandardizedERC20Transaction;
    _retryDced<T>(fn: () => Promise<T>): Promise<T>;
}
