/// <reference types="node" />
import { BalanceActivity, BalanceActivityCallback, BalanceMonitor, GetBalanceActivityOptions, RetrieveBalanceActivitiesResult, NewBlockCallback, FilterBlockAddressesCallback, BlockInfo } from '../../lib-common';
import { EventEmitter } from 'events';
import { NormalizedTxBitcoin } from 'blockbook-client';
import { BitcoinishBalanceMonitorConfig } from './types';
import { BlockbookConnected } from './BlockbookConnected';
import { BitcoinishPaymentsUtils } from './BitcoinishPaymentsUtils';
export declare abstract class BitcoinishBalanceMonitor extends BlockbookConnected implements BalanceMonitor {
    readonly coinName: string;
    readonly coinSymbol: string;
    readonly utils: BitcoinishPaymentsUtils;
    readonly events: EventEmitter;
    constructor(config: BitcoinishBalanceMonitorConfig);
    destroy(): Promise<void>;
    subscribeAddresses(addresses: string[]): Promise<void>;
    subscribeNewBlock(callbackFn: NewBlockCallback): Promise<void>;
    onBalanceActivity(callbackFn: BalanceActivityCallback): void;
    private accumulateAddressTx;
    retrieveBlockBalanceActivities(blockId: number | string, callbackFn: BalanceActivityCallback, filterRelevantAddresses: FilterBlockAddressesCallback): Promise<BlockInfo>;
    retrieveBalanceActivities(address: string, callbackFn: BalanceActivityCallback, options?: GetBalanceActivityOptions): Promise<RetrieveBalanceActivitiesResult>;
    private extractStandardAddress;
    txToBalanceActivity(address: string, tx: NormalizedTxBitcoin): Promise<BalanceActivity[]>;
}
