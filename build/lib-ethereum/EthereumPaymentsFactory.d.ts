import { PaymentsFactory } from '../lib-common';
import { EthereumBalanceMonitorConfig, EthereumPaymentsUtilsConfig, HdEthereumPaymentsConfig, KeyPairEthereumPaymentsConfig, HdErc20PaymentsConfig, KeyPairErc20PaymentsConfig } from './types';
import { EthereumConnectionManager } from './EthereumConnectionManager';
import { BaseEthereumPayments } from './BaseEthereumPayments';
import { EthereumPaymentsUtils } from './EthereumPaymentsUtils';
import { HdEthereumPayments } from './HdEthereumPayments';
import { KeyPairEthereumPayments } from './KeyPairEthereumPayments';
import { HdErc20Payments } from './erc20/HdErc20Payments';
import { KeyPairErc20Payments } from './erc20/KeyPairErc20Payments';
import { EthereumBalanceMonitor } from './EthereumBalanceMonitor';
export declare class EthereumPaymentsFactory extends PaymentsFactory<EthereumPaymentsUtilsConfig, EthereumPaymentsUtils, BaseEthereumPayments<EthereumPaymentsUtilsConfig>, EthereumBalanceMonitor> {
    readonly packageName = "ethereum-payments";
    newPayments(config: HdErc20PaymentsConfig): HdErc20Payments;
    newPayments(config: KeyPairErc20PaymentsConfig): KeyPairErc20Payments;
    newPayments(config: HdEthereumPaymentsConfig): HdEthereumPayments;
    newPayments(config: KeyPairEthereumPaymentsConfig): KeyPairEthereumPayments;
    newUtils(config: EthereumPaymentsUtilsConfig): EthereumPaymentsUtils;
    hasBalanceMonitor: boolean;
    newBalanceMonitor(config: EthereumBalanceMonitorConfig): EthereumBalanceMonitor;
    connectionManager: EthereumConnectionManager;
}
export default EthereumPaymentsFactory;
