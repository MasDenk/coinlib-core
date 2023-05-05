/// <reference types="node" />
import { BlockInfo, BalanceActivity, BalanceActivityCallback, BalanceMonitor, FilterBlockAddressesCallback, GetBalanceActivityOptions, RetrieveBalanceActivitiesResult, NewBlockCallback } from '../lib-common';
import { NormalizedTxEthereum } from 'blockbook-client';
import { EventEmitter } from 'events';
import { EthereumPaymentsUtils } from './EthereumPaymentsUtils';
export declare class EthereumBalanceMonitor extends EthereumPaymentsUtils implements BalanceMonitor {
    readonly events: EventEmitter;
    init(): Promise<void>;
    destroy(): Promise<void>;
    getTxWithMemoization(txId: string, cache: {
        [txid: string]: NormalizedTxEthereum;
    }): Promise<{
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
    subscribeAddresses(addresses: string[]): Promise<void>;
    onBalanceActivity(callbackFn: BalanceActivityCallback): void;
    retrieveBalanceActivities(address: string, callbackFn: BalanceActivityCallback, options: GetBalanceActivityOptions): Promise<RetrieveBalanceActivitiesResult>;
    private getAllInvolvedAddresses;
    retrieveBlockBalanceActivities(blockId: string | number, callbackFn: BalanceActivityCallback, filterRelevantAddresses: FilterBlockAddressesCallback): Promise<BlockInfo>;
    private getActivityType;
    private getSelfBalanceActivities;
    private getBalanceActivityForNonTokenTransfer;
    txToBalanceActivity(address: string, tx: NormalizedTxEthereum): Promise<BalanceActivity[]>;
    subscribeNewBlock(callbackFn: NewBlockCallback): Promise<void>;
}
