import { bitcoinish } from '../lib-bitcoin';
import { DogePaymentsUtilsConfig } from './types';
export declare class DogePaymentsUtils extends bitcoinish.BitcoinishPaymentsUtils {
    constructor(config?: DogePaymentsUtilsConfig);
    isValidAddress(address: string): boolean;
    standardizeAddress(address: string): string;
    isValidPublicKey(publicKey: string): boolean;
    isValidPrivateKey(privateKey: string): boolean;
}
