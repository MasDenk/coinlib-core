import * as bitcoin from 'bitcoinjs-lib';
import { UtxoInfo } from '../lib-common';
import { bitcoinish } from '../lib-bitcoin';
import { BaseLitecoinPaymentsConfig, AddressType, PsbtInputData, LitecoinAddressFormat } from './types';
import { LitecoinPaymentsUtils } from './LitecoinPaymentsUtils';
export declare abstract class BaseLitecoinPayments<Config extends BaseLitecoinPaymentsConfig> extends bitcoinish.BitcoinishPayments<Config> {
    readonly maximumFeeRate?: number;
    readonly validAddressFormat?: LitecoinAddressFormat;
    readonly utils: LitecoinPaymentsUtils;
    constructor(config: BaseLitecoinPaymentsConfig);
    abstract getPaymentScript(index: number): bitcoin.payments.Payment;
    abstract addressType: AddressType;
    isValidAddress(address: string, options?: {
        format?: string;
    }): boolean;
    standardizeAddress(address: string, options?: {
        format?: string;
    }): string;
    isValidPrivateKey(privateKey: string): boolean;
    isValidPublicKey(publicKey: string): boolean;
    /** Return a string that can be passed into estimateLitecoinTxSize. Override to support multisig */
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
