import * as bitcoin from 'bitcoinjs-lib';
import { UtxoInfo } from '../lib-common';
import { AddressType, bitcoinish } from '../lib-bitcoin';
import { BaseDogePaymentsConfig, PsbtInputData } from './types';
export declare abstract class BaseDogePayments<Config extends BaseDogePaymentsConfig> extends bitcoinish.BitcoinishPayments<Config> {
    readonly maximumFeeRate?: number;
    constructor(config: BaseDogePaymentsConfig);
    abstract addressType: AddressType;
    abstract getPaymentScript(index: number): bitcoin.payments.Payment;
    createServiceTransaction(): Promise<null>;
    isValidAddress(address: string): boolean;
    standardizeAddress(address: string): string;
    isValidPrivateKey(privateKey: string): boolean;
    isValidPublicKey(publicKey: string): boolean;
    /** Return a string that can be passed into estimateDogeTxSize. Override to support multisig */
    getEstimateTxSizeInputKey(): string;
    estimateTxSize(inputCount: number, changeOutputCount: number, externalOutputAddresses: string[]): number;
    getPsbtInputData(utxo: UtxoInfo, paymentScript: bitcoin.payments.Payment, addressType: AddressType): Promise<PsbtInputData>;
    get psbtOptions(): {
        network: {
            messagePrefix: string;
            bech32: string;
            bip32: {
                public: number;
                private: number;
            };
            pubKeyHash: number;
            scriptHash: number;
            wif: number;
        };
        maximumFeeRate: number;
    };
    buildPsbt(paymentTx: bitcoinish.BitcoinishPaymentTx, fromIndex?: number): Promise<bitcoin.Psbt>;
    serializePaymentTx(tx: bitcoinish.BitcoinishPaymentTx, fromIndex: number): Promise<string>;
}
