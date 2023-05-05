import * as bitcoin from 'bitcoinjs-lib';
import { LitecoinjsKeyPair, LitecoinUnsignedTransaction, LitecoinSignedTransaction, SinglesigLitecoinPaymentsConfig, SinglesigAddressType, AddressType } from './types';
import { BaseLitecoinPayments } from './BaseLitecoinPayments';
export declare abstract class SinglesigLitecoinPayments<Config extends SinglesigLitecoinPaymentsConfig> extends BaseLitecoinPayments<Config> {
    addressType: SinglesigAddressType;
    constructor(config: SinglesigLitecoinPaymentsConfig);
    abstract getKeyPair(index: number): LitecoinjsKeyPair;
    getPaymentScript(index: number): bitcoin.payments.Payment;
    signMultisigTransaction(tx: LitecoinUnsignedTransaction): LitecoinSignedTransaction;
    signTransaction(tx: LitecoinUnsignedTransaction): Promise<LitecoinSignedTransaction>;
    getSupportedAddressTypes(): AddressType[];
}
