import { bitcoinish } from '../lib-bitcoin';
import { DashBalanceMonitorConfig } from './types';
export declare class DashBalanceMonitor extends bitcoinish.BitcoinishBalanceMonitor {
    constructor(config: DashBalanceMonitorConfig);
}
