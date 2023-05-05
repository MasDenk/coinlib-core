import { PaymentsFactory, StandardConnectionManager } from '../lib-common';
import { HdRipplePaymentsConfig, AccountRipplePaymentsConfig, BaseRipplePaymentsConfig, RippleBalanceMonitorConfig, BaseRippleConfig, RippleServerAPI } from './types';
import { BaseRipplePayments } from './BaseRipplePayments';
import { HdRipplePayments } from './HdRipplePayments';
import { AccountRipplePayments } from './AccountRipplePayments';
import { RipplePaymentsUtils } from './RipplePaymentsUtils';
import { RippleBalanceMonitor } from './RippleBalanceMonitor';
export declare class RipplePaymentsFactory extends PaymentsFactory<BaseRippleConfig, RipplePaymentsUtils, BaseRipplePayments<BaseRippleConfig>, RippleBalanceMonitor> {
    readonly packageName = "ripple-payments";
    newPayments(config: HdRipplePaymentsConfig): HdRipplePayments;
    newPayments(config: AccountRipplePaymentsConfig): AccountRipplePayments;
    newUtils(config: BaseRipplePaymentsConfig): RipplePaymentsUtils;
    hasBalanceMonitor: boolean;
    newBalanceMonitor(config: RippleBalanceMonitorConfig): RippleBalanceMonitor;
    connectionManager: StandardConnectionManager<RippleServerAPI, {
        network?: import("../lib-common").NetworkType;
        logger?: import("../ts-common").Logger;
    } & {
        server?: string;
        api?: RippleServerAPI;
    }>;
}
export default RipplePaymentsFactory;
