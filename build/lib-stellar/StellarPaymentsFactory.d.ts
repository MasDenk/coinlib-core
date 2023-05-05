import { PaymentsFactory, StandardConnectionManager } from '../lib-common';
import { HdStellarPaymentsConfig, AccountStellarPaymentsConfig, BaseStellarPaymentsConfig, StellarBalanceMonitorConfig, BaseStellarConfig } from './types';
import { BaseStellarPayments } from './BaseStellarPayments';
import { HdStellarPayments } from './HdStellarPayments';
import { AccountStellarPayments } from './AccountStellarPayments';
import { StellarPaymentsUtils } from './StellarPaymentsUtil';
import { StellarBalanceMonitor } from './StellarBalanceMonitor';
export declare class StellarPaymentsFactory extends PaymentsFactory<BaseStellarConfig, StellarPaymentsUtils, BaseStellarPayments<BaseStellarConfig>, StellarBalanceMonitor> {
    readonly packageName = "stellar-payments";
    newPayments(config: HdStellarPaymentsConfig): HdStellarPayments;
    newPayments(config: AccountStellarPaymentsConfig): AccountStellarPayments;
    newUtils(config: BaseStellarPaymentsConfig): StellarPaymentsUtils;
    hasBalanceMonitor: boolean;
    newBalanceMonitor(config: StellarBalanceMonitorConfig): StellarBalanceMonitor;
    connectionManager: StandardConnectionManager<unknown, {
        api?: unknown;
        server?: string | string[];
    } & {
        network?: import("../lib-common").NetworkType;
        logger?: import("../ts-common").Logger;
    }>;
}
export default StellarPaymentsFactory;
