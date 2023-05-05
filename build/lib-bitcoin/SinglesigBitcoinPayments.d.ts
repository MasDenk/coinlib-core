import { BitcoinjsKeyPair, BitcoinUnsignedTransaction, BitcoinSignedTransaction, SinglesigBitcoinPaymentsConfig, SinglesigAddressType, AddressType } from './types';
import { BaseBitcoinPayments } from './BaseBitcoinPayments';
import { SinglesigBitcoinishPayments } from './bitcoinish';
export declare abstract class SinglesigBitcoinPayments<Config extends SinglesigBitcoinPaymentsConfig> extends BaseBitcoinPayments<Config> implements SinglesigBitcoinishPayments {
    addressType: SinglesigAddressType;
    constructor(config: SinglesigBitcoinPaymentsConfig);
    abstract getKeyPair(index: number): BitcoinjsKeyPair;
    getPaymentScript(index: number, addressType?: SinglesigAddressType): import("bitcoinjs-lib").Payment;
    signMultisigTransaction(tx: BitcoinUnsignedTransaction): BitcoinSignedTransaction;
    signTransaction(tx: BitcoinUnsignedTransaction): Promise<BitcoinSignedTransaction>;
    getSupportedAddressTypes(): AddressType[];
}
