import * as bitcoin from 'bitcoinjs-lib';
import { BitcoinjsKeyPair, DashSignedTransaction, SinglesigDashPaymentsConfig, DashUnsignedTransaction, AddressType, SinglesigAddressType } from './types';
import { BaseDashPayments } from './BaseDashPayments';
export declare abstract class SinglesigDashPayments<Config extends SinglesigDashPaymentsConfig> extends BaseDashPayments<Config> {
    addressType: SinglesigAddressType;
    abstract getKeyPair(index: number): BitcoinjsKeyPair;
    constructor(config: SinglesigDashPaymentsConfig);
    getPaymentScript(index: number): bitcoin.payments.Payment;
    signMultisigTransaction(tx: DashUnsignedTransaction): DashSignedTransaction;
    signTransaction(tx: DashUnsignedTransaction): Promise<DashSignedTransaction>;
    getSupportedAddressTypes(): AddressType[];
}
