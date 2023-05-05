import { bitcoinish } from '../lib-bitcoin';
import { DashPaymentsUtilsConfig } from './types';
export declare class DashPaymentsUtils extends bitcoinish.BitcoinishPaymentsUtils {
    constructor(config?: DashPaymentsUtilsConfig);
    isValidAddress(address: string): boolean;
    standardizeAddress(address: string): string;
    isValidPublicKey(publicKey: string): boolean;
    isValidPrivateKey(privateKey: string): boolean;
}
