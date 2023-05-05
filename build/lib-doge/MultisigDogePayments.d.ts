/// <reference types="node" />
import { BaseDogePayments } from './BaseDogePayments';
import { MultisigDogePaymentsConfig, DogeUnsignedTransaction, DogeSignedTransaction, MultisigAddressType, AddressType } from './types';
import { HdDogePayments } from './HdDogePayments';
import { KeyPairDogePayments } from './KeyPairDogePayments';
import * as bitcoin from 'bitcoinjs-lib';
import { CreateTransactionOptions, ResolveablePayport, PayportOutput } from '../lib-common';
import { Numeric } from '../ts-common';
export declare class MultisigDogePayments extends BaseDogePayments<MultisigDogePaymentsConfig> {
    private config;
    addressType: MultisigAddressType;
    m: number;
    signers: (HdDogePayments | KeyPairDogePayments)[];
    accountIdToSigner: {
        [accountId: string]: HdDogePayments | KeyPairDogePayments;
    };
    constructor(config: MultisigDogePaymentsConfig);
    getFullConfig(): MultisigDogePaymentsConfig;
    getPublicConfig(): MultisigDogePaymentsConfig;
    getEstimateTxSizeInputKey(): string;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getSignerPublicKeyBuffers(index: number): Buffer[];
    getPaymentScript(index: number, addressType?: MultisigAddressType): bitcoin.payments.Payment;
    getAddress(index: number, addressType?: MultisigAddressType): string;
    createTransaction(from: number, to: ResolveablePayport, amount: Numeric, options?: CreateTransactionOptions): Promise<DogeUnsignedTransaction>;
    createMultiOutputTransaction(from: number, to: PayportOutput[], options?: CreateTransactionOptions): Promise<DogeUnsignedTransaction>;
    createMultiInputTransaction(from: number[], to: PayportOutput[], options?: CreateTransactionOptions): Promise<DogeUnsignedTransaction>;
    createSweepTransaction(from: number, to: ResolveablePayport, options?: CreateTransactionOptions): Promise<DogeUnsignedTransaction>;
    /**
     * Combines two of more partially signed transactions. Once the required # of signatures is reached (`m`)
     * the transaction is validated and finalized.
     */
    combinePartiallySignedTransactions(txs: DogeSignedTransaction[]): Promise<DogeSignedTransaction>;
    signTransaction(tx: DogeUnsignedTransaction): Promise<DogeSignedTransaction>;
    getSupportedAddressTypes(): AddressType[];
}
export default MultisigDogePayments;
