/// <reference types="node" />
import { BaseBitcoinPayments } from './BaseBitcoinPayments';
import { MultisigBitcoinPaymentsConfig, BitcoinUnsignedTransaction, BitcoinSignedTransaction, MultisigAddressType, AddressType } from './types';
import { HdBitcoinPayments } from './HdBitcoinPayments';
import { KeyPairBitcoinPayments } from './KeyPairBitcoinPayments';
import * as bitcoin from 'bitcoinjs-lib';
import { CreateTransactionOptions, ResolveablePayport, PayportOutput } from '../lib-common';
import { Numeric } from '../ts-common';
export declare class MultisigBitcoinPayments extends BaseBitcoinPayments<MultisigBitcoinPaymentsConfig> {
    private config;
    addressType: MultisigAddressType;
    m: number;
    signers: (HdBitcoinPayments | KeyPairBitcoinPayments)[];
    accountIdToSigner: {
        [accountId: string]: HdBitcoinPayments | KeyPairBitcoinPayments;
    };
    constructor(config: MultisigBitcoinPaymentsConfig);
    getFullConfig(): MultisigBitcoinPaymentsConfig;
    getPublicConfig(): MultisigBitcoinPaymentsConfig;
    getEstimateTxSizeInputKey(): string;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getSignerPublicKeyBuffers(index: number): Buffer[];
    getPaymentScript(index: number, addressType?: MultisigAddressType): bitcoin.payments.Payment;
    getAddress(index: number, addressType?: MultisigAddressType): string;
    createTransaction(from: number, to: ResolveablePayport, amount: Numeric, options?: CreateTransactionOptions): Promise<BitcoinUnsignedTransaction>;
    createMultiOutputTransaction(from: number, to: PayportOutput[], options?: CreateTransactionOptions): Promise<BitcoinUnsignedTransaction>;
    createMultiInputTransaction(from: number[], to: PayportOutput[], options?: CreateTransactionOptions): Promise<BitcoinUnsignedTransaction>;
    createSweepTransaction(from: number, to: ResolveablePayport, options?: CreateTransactionOptions): Promise<BitcoinUnsignedTransaction>;
    /**
     * Combines two of more partially signed transactions. Once the required # of signatures is reached (`m`)
     * the transaction is validated and finalized.
     */
    combinePartiallySignedTransactions(txs: BitcoinSignedTransaction[]): Promise<BitcoinSignedTransaction>;
    signTransaction(tx: BitcoinUnsignedTransaction): Promise<BitcoinSignedTransaction>;
    getSupportedAddressTypes(): AddressType[];
}
export default MultisigBitcoinPayments;
