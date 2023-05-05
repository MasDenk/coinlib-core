import { PaymentsFactory, StandardConnectionManager } from '../lib-common';
import { bitcoinish } from '../lib-bitcoin';
import { LitecoinPaymentsConfig, LitecoinPaymentsUtilsConfig, BaseLitecoinPaymentsConfig, LitecoinBalanceMonitorConfig } from './types';
import { BaseLitecoinPayments } from './BaseLitecoinPayments';
import { LitecoinPaymentsUtils } from './LitecoinPaymentsUtils';
import { HdLitecoinPayments } from './HdLitecoinPayments';
import { KeyPairLitecoinPayments } from './KeyPairLitecoinPayments';
import { MultisigLitecoinPayments } from './MultisigLitecoinPayments';
import { LitecoinBalanceMonitor } from './LitecoinBalanceMonitor';
export declare class LitecoinPaymentsFactory extends PaymentsFactory<LitecoinPaymentsUtilsConfig, LitecoinPaymentsUtils, BaseLitecoinPayments<BaseLitecoinPaymentsConfig>, LitecoinBalanceMonitor> {
    readonly packageName = "litecoin-payments";
    newPayments(config: LitecoinPaymentsConfig): HdLitecoinPayments | KeyPairLitecoinPayments | MultisigLitecoinPayments;
    newUtils(config: LitecoinPaymentsUtilsConfig): LitecoinPaymentsUtils;
    hasBalanceMonitor: boolean;
    newBalanceMonitor(config: LitecoinBalanceMonitorConfig): LitecoinBalanceMonitor;
    connectionManager: StandardConnectionManager<bitcoinish.BlockbookServerAPI, {
        network?: import("../lib-common").NetworkType;
        logger?: import("../ts-common").Logger;
    } & {
        server?: string | string[];
        api?: bitcoinish.BlockbookServerAPI;
    }>;
}
export default LitecoinPaymentsFactory;
