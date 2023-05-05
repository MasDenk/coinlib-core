import { BitcoinishBalanceMonitor } from './bitcoinish/BitcoinishBalanceMonitor';
import { BitcoinBalanceMonitorConfig } from './types';
export declare class BitcoinBalanceMonitor extends BitcoinishBalanceMonitor {
    constructor(config: BitcoinBalanceMonitorConfig);
}
