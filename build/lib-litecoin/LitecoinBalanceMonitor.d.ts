import { bitcoinish } from '../lib-bitcoin';
import { LitecoinBalanceMonitorConfig } from './types';
export declare class LitecoinBalanceMonitor extends bitcoinish.BitcoinishBalanceMonitor {
    constructor(config: LitecoinBalanceMonitorConfig);
}
