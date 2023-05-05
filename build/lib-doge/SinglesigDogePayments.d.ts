import * as bitcoin from 'bitcoinjs-lib';
import { BitcoinjsKeyPair, DogeSignedTransaction, SinglesigDogePaymentsConfig, DogeUnsignedTransaction, AddressType, SinglesigAddressType } from './types';
import { BaseDogePayments } from './BaseDogePayments';
export declare abstract class SinglesigDogePayments<Config extends SinglesigDogePaymentsConfig> extends BaseDogePayments<Config> {
    addressType: SinglesigAddressType;
    abstract getKeyPair(index: number): BitcoinjsKeyPair;
    constructor(config: SinglesigDogePaymentsConfig);
    getPaymentScript(index: number): bitcoin.payments.Payment;
    signMultisigTransaction(tx: DogeUnsignedTransaction): DogeSignedTransaction;
    signTransaction(tx: DogeUnsignedTransaction): Promise<DogeSignedTransaction>;
    getSupportedAddressTypes(): AddressType[];
}
