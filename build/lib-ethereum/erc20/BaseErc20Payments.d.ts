import { ResolveablePayport, Payport } from '../../lib-common';
import { Numeric } from '../../ts-common';
import { BaseErc20PaymentsConfig, EthereumUnsignedTransaction, EthereumTransactionOptions } from '../types';
import { BaseEthereumPayments } from '../BaseEthereumPayments';
export declare abstract class BaseErc20Payments<Config extends BaseErc20PaymentsConfig> extends BaseEthereumPayments<Config> {
    depositKeyIndex: number;
    masterAddress: string;
    tokenAddress: string;
    constructor(config: Config);
    abstract getAddressSalt(index: number): string;
    abstract getPayport(index: number): Promise<Payport>;
    isSweepableBalance(balance: Numeric): Promise<boolean>;
    createTransaction(from: number | string, to: ResolveablePayport, amountMain: string, options?: EthereumTransactionOptions): Promise<EthereumUnsignedTransaction>;
    createSweepTransaction(from: string | number, to: ResolveablePayport, options?: EthereumTransactionOptions): Promise<EthereumUnsignedTransaction>;
    getNextSequenceNumber(payport: ResolveablePayport): Promise<string>;
    private getEthBaseBalance;
    private logTopicToAddress;
}
export default BaseErc20Payments;
