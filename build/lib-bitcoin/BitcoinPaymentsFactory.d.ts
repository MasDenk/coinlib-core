import { PaymentsFactory, StandardConnectionManager } from '../lib-common';
import { BitcoinPaymentsConfig, BitcoinPaymentsUtilsConfig, BaseBitcoinPaymentsConfig, BitcoinBalanceMonitorConfig } from './types';
import { BlockbookServerAPI } from './bitcoinish/types';
import { BaseBitcoinPayments } from './BaseBitcoinPayments';
import { BitcoinPaymentsUtils } from './BitcoinPaymentsUtils';
import { HdBitcoinPayments } from './HdBitcoinPayments';
import { KeyPairBitcoinPayments } from './KeyPairBitcoinPayments';
import { MultisigBitcoinPayments } from './MultisigBitcoinPayments';
import { BitcoinBalanceMonitor } from './BitcoinBalanceMonitor';
export declare class BitcoinPaymentsFactory extends PaymentsFactory<BitcoinPaymentsUtilsConfig, BitcoinPaymentsUtils, BaseBitcoinPayments<BaseBitcoinPaymentsConfig>, BitcoinBalanceMonitor> {
    readonly packageName = "bitcoin-payments";
    newPayments(config: BitcoinPaymentsConfig): HdBitcoinPayments | KeyPairBitcoinPayments | MultisigBitcoinPayments;
    newUtils(config: BitcoinPaymentsUtilsConfig): BitcoinPaymentsUtils;
    hasBalanceMonitor: boolean;
    newBalanceMonitor(config: BitcoinBalanceMonitorConfig): BitcoinBalanceMonitor;
    connectionManager: StandardConnectionManager<BlockbookServerAPI, {
        network?: import("../lib-common").NetworkType;
        logger?: import("../ts-common").Logger;
    } & {
        server?: string | string[];
        api?: BlockbookServerAPI;
    }>;
}
export default BitcoinPaymentsFactory;
