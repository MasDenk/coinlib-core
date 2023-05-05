import * as bitcoin from 'bitcoinjs-lib';
import { UtxoInfo } from '../lib-common';
import { BaseBitcoinPaymentsConfig, AddressType, PsbtInputData } from './types';
import { BitcoinishPayments, BitcoinishPaymentTx } from './bitcoinish';
export declare abstract class BaseBitcoinPayments<Config extends BaseBitcoinPaymentsConfig> extends BitcoinishPayments<Config> {
    readonly maximumFeeRate?: number;
    readonly blockcypherToken?: string;
    constructor(config: BaseBitcoinPaymentsConfig);
    abstract getPaymentScript(index: number, addressType?: AddressType): bitcoin.payments.Payment;
    abstract addressType: AddressType;
    createServiceTransaction(): Promise<null>;
    isValidAddress(address: string): boolean;
    standardizeAddress(address: string): string | null;
    isValidPrivateKey(privateKey: string): boolean;
    isValidPublicKey(publicKey: string): boolean;
    /** Return a string that can be passed into estimateBitcoinTxSize. Override to support multisig */
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
    buildPsbt(paymentTx: BitcoinishPaymentTx, fromIndex?: number): Promise<bitcoin.Psbt>;
    serializePaymentTx(tx: BitcoinishPaymentTx, fromIndex?: number): Promise<string>;
}
