import { BaseConfig } from '../../lib-common';
import { BitcoinishSignedTransaction, BitcoinishUnsignedTransaction, BitcoinjsKeyPair, BitcoinjsNetwork, BitcoinishPaymentTx } from './types';
import * as bitcoin from 'bitcoinjs-lib';
import { BitcoinishPayments } from './BitcoinishPayments';
export interface PsbtOptsOptional {
    network?: BitcoinjsNetwork;
    maximumFeeRate?: number;
}
export interface SinglesigBitcoinishPayments extends BitcoinishPayments<BaseConfig> {
    psbtOptions: PsbtOptsOptional;
    getAccountId(index: number): string;
    getKeyPair(index: number): BitcoinjsKeyPair;
    buildPsbt(paymentTx: BitcoinishPaymentTx, fromIndex?: number): Promise<bitcoin.Psbt>;
}
export declare function signMultisigTransaction(tx: BitcoinishUnsignedTransaction, context: SinglesigBitcoinishPayments): BitcoinishSignedTransaction;
export declare function signTransaction(tx: BitcoinishUnsignedTransaction, context: SinglesigBitcoinishPayments): Promise<BitcoinishSignedTransaction>;
