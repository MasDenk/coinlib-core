import { PaymentsFactory, StandardConnectionManager } from '../lib-common';
import { bitcoinish } from '../lib-bitcoin';
import { DogePaymentsConfig, DogePaymentsUtilsConfig, BaseDogePaymentsConfig, DogeBalanceMonitorConfig } from './types';
import { BaseDogePayments } from './BaseDogePayments';
import { DogePaymentsUtils } from './DogePaymentsUtils';
import { HdDogePayments } from './HdDogePayments';
import { KeyPairDogePayments } from './KeyPairDogePayments';
import { MultisigDogePayments } from './MultisigDogePayments';
import { DogeBalanceMonitor } from './DogeBalanceMonitor';
export declare class DogePaymentsFactory extends PaymentsFactory<DogePaymentsUtilsConfig, DogePaymentsUtils, BaseDogePayments<BaseDogePaymentsConfig>, DogeBalanceMonitor> {
    readonly packageName = "doge-payments";
    newPayments(config: DogePaymentsConfig): HdDogePayments | KeyPairDogePayments | MultisigDogePayments;
    newUtils(config: DogePaymentsUtilsConfig): DogePaymentsUtils;
    hasBalanceMonitor: boolean;
    newBalanceMonitor(config: DogeBalanceMonitorConfig): DogeBalanceMonitor;
    connectionManager: StandardConnectionManager<bitcoinish.BlockbookServerAPI, {
        network?: import("../lib-common").NetworkType;
        logger?: import("../ts-common").Logger;
    } & {
        server?: string | string[];
        api?: bitcoinish.BlockbookServerAPI;
    }>;
}
export default DogePaymentsFactory;
