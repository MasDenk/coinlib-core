import { PaymentsFactory, StandardConnectionManager } from '../lib-common';
import { bitcoinish } from '../lib-bitcoin';
import { DashPaymentsConfig, DashPaymentsUtilsConfig, BaseDashPaymentsConfig, DashBalanceMonitorConfig } from './types';
import { BaseDashPayments } from './BaseDashPayments';
import { DashPaymentsUtils } from './DashPaymentsUtils';
import { HdDashPayments } from './HdDashPayments';
import { KeyPairDashPayments } from './KeyPairDashPayments';
import { MultisigDashPayments } from './MultisigDashPayments';
import { DashBalanceMonitor } from './DashBalanceMonitor';
export declare class DashPaymentsFactory extends PaymentsFactory<DashPaymentsUtilsConfig, DashPaymentsUtils, BaseDashPayments<BaseDashPaymentsConfig>, DashBalanceMonitor> {
    readonly packageName = "dash-payments";
    newPayments(config: DashPaymentsConfig): HdDashPayments | KeyPairDashPayments | MultisigDashPayments;
    newUtils(config: DashPaymentsUtilsConfig): DashPaymentsUtils;
    hasBalanceMonitor: boolean;
    newBalanceMonitor(config: DashBalanceMonitorConfig): DashBalanceMonitor;
    connectionManager: StandardConnectionManager<bitcoinish.BlockbookServerAPI, {
        network?: import("../lib-common").NetworkType;
        logger?: import("../ts-common").Logger;
    } & {
        server?: string | string[];
        api?: bitcoinish.BlockbookServerAPI;
    }>;
}
export default DashPaymentsFactory;
