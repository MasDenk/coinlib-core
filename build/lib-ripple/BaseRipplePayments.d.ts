import { BasePayments, BalanceResult, FeeOption, ResolvedFeeOption, Payport, ResolveablePayport, PayportOutput, CreateTransactionOptions } from '../lib-common';
import { Numeric } from '../ts-common';
import { Adjustment } from 'ripple-lib/dist/npm/common/types/objects';
import { BaseRipplePaymentsConfig, RippleUnsignedTransaction, RippleSignedTransaction, RippleBroadcastResult, RippleTransactionInfo, RippleCreateTransactionOptions, FromToWithPayport, RippleSignatory } from './types';
import { RipplePaymentsUtils } from './RipplePaymentsUtils';
export declare abstract class BaseRipplePayments<Config extends BaseRipplePaymentsConfig> extends RipplePaymentsUtils implements BasePayments<Config, RippleUnsignedTransaction, RippleSignedTransaction, RippleBroadcastResult, RippleTransactionInfo> {
    config: Config;
    constructor(config: Config);
    getFullConfig(): Config;
    getPublicConfig(): any;
    abstract getPublicAccountConfig(): Config;
    abstract getAccountIds(): string[];
    abstract getAccountId(index: number): string;
    abstract getHotSignatory(): RippleSignatory;
    abstract getDepositSignatory(): RippleSignatory;
    abstract isReadOnly(): boolean;
    private doGetPayport;
    private doResolvePayport;
    resolvePayport(payport: ResolveablePayport): Promise<Payport>;
    resolveFromTo(from: number, to: ResolveablePayport): Promise<FromToWithPayport>;
    getPayport(index: number): Promise<Payport>;
    requiresBalanceMonitor(): boolean;
    getAddressesToMonitor(): string[];
    isSweepableBalance(balance: Numeric, payport?: ResolveablePayport): boolean;
    /**
     * @deprecated use createServiceTransaction instead
     */
    initAccounts(): Promise<void>;
    getBalance(payportOrIndex: ResolveablePayport): Promise<BalanceResult>;
    usesUtxos(): boolean;
    getUtxos(): Promise<any[]>;
    usesSequenceNumber(): boolean;
    getNextSequenceNumber(payportOrIndex: ResolveablePayport): Promise<string>;
    resolveIndexFromAdjustment(adjustment: Adjustment): number | null;
    resolveFeeOption(feeOption: FeeOption): Promise<ResolvedFeeOption>;
    private resolvePayportSpendableBalance;
    private assertSufficientAddressBalance;
    private doCreateTransaction;
    createTransaction(from: number, to: ResolveablePayport, amount: string, options?: RippleCreateTransactionOptions): Promise<RippleUnsignedTransaction>;
    createServiceTransaction(from: number, options?: RippleCreateTransactionOptions): Promise<RippleUnsignedTransaction>;
    createSweepTransaction(from: number, to: ResolveablePayport, options?: RippleCreateTransactionOptions): Promise<RippleUnsignedTransaction>;
    signTransaction(unsignedTx: RippleUnsignedTransaction): Promise<RippleSignedTransaction>;
    broadcastTransaction(signedTx: RippleSignedTransaction): Promise<RippleBroadcastResult>;
    createMultiOutputTransaction(from: number, to: PayportOutput[], options?: CreateTransactionOptions): Promise<null>;
    createMultiInputTransaction(from: number[], to: PayportOutput[], options?: CreateTransactionOptions): Promise<null>;
}
