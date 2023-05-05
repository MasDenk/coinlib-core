/// <reference types="node" />
import { BalanceActivityCallback, GetBalanceActivityOptions, BalanceActivity, BalanceMonitor, RetrieveBalanceActivitiesResult } from '../lib-common';
import { EventEmitter } from 'events';
import { StellarRawTransaction } from './types';
import { StellarConnected } from './StellarConnected';
export declare class StellarBalanceMonitor extends StellarConnected implements BalanceMonitor {
    txEmitter: EventEmitter;
    _subscribeCancellors: Function[];
    destroy(): Promise<void>;
    subscribeAddresses(addresses: string[]): Promise<void>;
    onBalanceActivity(callbackFn: BalanceActivityCallback): void;
    retrieveBalanceActivities(address: string, callbackFn: BalanceActivityCallback, options?: GetBalanceActivityOptions): Promise<RetrieveBalanceActivitiesResult>;
    txToBalanceActivity(address: string, tx: StellarRawTransaction): Promise<BalanceActivity[]>;
}
