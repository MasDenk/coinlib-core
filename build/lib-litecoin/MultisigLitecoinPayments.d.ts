/// <reference types="node" />
import { BaseLitecoinPayments } from './BaseLitecoinPayments';
import { MultisigLitecoinPaymentsConfig, LitecoinUnsignedTransaction, LitecoinSignedTransaction, MultisigAddressType, AddressType } from './types';
import { HdLitecoinPayments } from './HdLitecoinPayments';
import { KeyPairLitecoinPayments } from './KeyPairLitecoinPayments';
import * as bitcoin from 'bitcoinjs-lib';
import { CreateTransactionOptions, ResolveablePayport, PayportOutput } from '../lib-common';
import { Numeric } from '../ts-common';
export declare class MultisigLitecoinPayments extends BaseLitecoinPayments<MultisigLitecoinPaymentsConfig> {
    private config;
    addressType: MultisigAddressType;
    m: number;
    signers: (HdLitecoinPayments | KeyPairLitecoinPayments)[];
    accountIdToSigner: {
        [accountId: string]: HdLitecoinPayments | KeyPairLitecoinPayments;
    };
    constructor(config: MultisigLitecoinPaymentsConfig);
    getFullConfig(): MultisigLitecoinPaymentsConfig;
    getPublicConfig(): MultisigLitecoinPaymentsConfig;
    getEstimateTxSizeInputKey(): string;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getSignerPublicKeyBuffers(index: number): Buffer[];
    getPaymentScript(index: number, addressType?: MultisigAddressType): bitcoin.payments.Payment;
    getAddress(index: number, addressType?: MultisigAddressType): string;
    createTransaction(from: number, to: ResolveablePayport, amount: Numeric, options?: CreateTransactionOptions): Promise<LitecoinUnsignedTransaction>;
    createMultiOutputTransaction(from: number, to: PayportOutput[], options?: CreateTransactionOptions): Promise<LitecoinUnsignedTransaction>;
    createMultiInputTransaction(from: number[], to: PayportOutput[], options?: CreateTransactionOptions): Promise<LitecoinUnsignedTransaction>;
    createSweepTransaction(from: number, to: ResolveablePayport, options?: CreateTransactionOptions): Promise<LitecoinUnsignedTransaction>;
    /**
     * Combines two of more partially signed transactions. Once the required # of signatures is reached (`m`)
     * the transaction is validated and finalized.
     */
    combinePartiallySignedTransactions(txs: LitecoinSignedTransaction[]): Promise<LitecoinSignedTransaction>;
    signTransaction(tx: LitecoinUnsignedTransaction): Promise<LitecoinSignedTransaction>;
    getSupportedAddressTypes(): AddressType[];
}
export default MultisigLitecoinPayments;
