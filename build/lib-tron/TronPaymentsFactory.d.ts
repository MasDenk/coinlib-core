import { PaymentsFactory } from '../lib-common';
import { HdTronPaymentsConfig, KeyPairTronPaymentsConfig, BaseTronPaymentsConfig } from './types';
import { BaseTronPayments } from './BaseTronPayments';
import { HdTronPayments } from './HdTronPayments';
import { KeyPairTronPayments } from './KeyPairTronPayments';
import { TronPaymentsUtils } from './TronPaymentsUtils';
export declare class TronPaymentsFactory extends PaymentsFactory<BaseTronPaymentsConfig, TronPaymentsUtils, BaseTronPayments<BaseTronPaymentsConfig>> {
    readonly packageName = "tron-payments";
    newPayments(config: HdTronPaymentsConfig): HdTronPayments;
    newPayments(config: KeyPairTronPaymentsConfig): KeyPairTronPayments;
    newUtils(config: BaseTronPaymentsConfig): TronPaymentsUtils;
}
export default TronPaymentsFactory;
