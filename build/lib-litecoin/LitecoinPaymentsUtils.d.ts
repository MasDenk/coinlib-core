import { bitcoinish } from '../lib-bitcoin';
import { LitecoinPaymentsUtilsConfig, LitecoinAddressFormat } from './types';
export declare class LitecoinPaymentsUtils extends bitcoinish.BitcoinishPaymentsUtils {
    readonly validAddressFormat?: LitecoinAddressFormat;
    constructor(config?: LitecoinPaymentsUtilsConfig);
    isValidAddress(address: string, options?: {
        format?: string;
    }): boolean;
    standardizeAddress(address: string, options?: {
        format?: string;
    }): string;
    isValidPublicKey(publicKey: string): boolean;
    isValidPrivateKey(privateKey: string): boolean;
}
