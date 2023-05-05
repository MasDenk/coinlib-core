/// <reference types="node" />
import { BaseDashPayments } from './BaseDashPayments';
import { MultisigDashPaymentsConfig, DashUnsignedTransaction, DashSignedTransaction, MultisigAddressType, AddressType } from './types';
import { HdDashPayments } from './HdDashPayments';
import { KeyPairDashPayments } from './KeyPairDashPayments';
import * as bitcoin from 'bitcoinjs-lib';
import { CreateTransactionOptions, ResolveablePayport, PayportOutput } from '../lib-common';
import { Numeric } from '../ts-common';
export declare class MultisigDashPayments extends BaseDashPayments<MultisigDashPaymentsConfig> {
    private config;
    addressType: MultisigAddressType;
    m: number;
    signers: (HdDashPayments | KeyPairDashPayments)[];
    accountIdToSigner: {
        [accountId: string]: HdDashPayments | KeyPairDashPayments;
    };
    constructor(config: MultisigDashPaymentsConfig);
    getFullConfig(): MultisigDashPaymentsConfig;
    getPublicConfig(): MultisigDashPaymentsConfig;
    getEstimateTxSizeInputKey(): string;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getSignerPublicKeyBuffers(index: number): Buffer[];
    getPaymentScript(index: number, addressType?: MultisigAddressType): bitcoin.payments.Payment;
    getAddress(index: number, addressType?: MultisigAddressType): string;
    createTransaction(from: number, to: ResolveablePayport, amount: Numeric, options?: CreateTransactionOptions): Promise<DashUnsignedTransaction>;
    createMultiOutputTransaction(from: number, to: PayportOutput[], options?: CreateTransactionOptions): Promise<DashUnsignedTransaction>;
    createMultiInputTransaction(from: number[], to: PayportOutput[], options?: CreateTransactionOptions): Promise<DashUnsignedTransaction>;
    createSweepTransaction(from: number, to: ResolveablePayport, options?: CreateTransactionOptions): Promise<DashUnsignedTransaction>;
    /**
     * Combines two of more partially signed transactions. Once the required # of signatures is reached (`m`)
     * the transaction is validated and finalized.
     */
    combinePartiallySignedTransactions(txs: DashSignedTransaction[]): Promise<DashSignedTransaction>;
    signTransaction(tx: DashUnsignedTransaction): Promise<DashSignedTransaction>;
    getSupportedAddressTypes(): AddressType[];
}
export default MultisigDashPayments;
