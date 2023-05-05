import { bitcoinish } from '../lib-bitcoin';
import { DogeBalanceMonitorConfig } from './types';
export declare class DogeBalanceMonitor extends bitcoinish.BitcoinishBalanceMonitor {
    constructor(config: DogeBalanceMonitorConfig);
}
