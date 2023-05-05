import { BitcoinishPaymentsUtils } from './bitcoinish';
import { BitcoinPaymentsUtilsConfig } from './types';
export declare class BitcoinPaymentsUtils extends BitcoinishPaymentsUtils {
    constructor(config?: BitcoinPaymentsUtilsConfig);
    isValidAddress(address: string): boolean;
    standardizeAddress(address: string): string | null;
    isValidPublicKey(privateKey: string): boolean;
    isValidPrivateKey(privateKey: string): boolean;
}
