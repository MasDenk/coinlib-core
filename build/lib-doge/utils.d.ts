import { DogeBaseConfig } from './types';
import { bitcoinish } from '../lib-bitcoin';
export declare function toBitcoinishConfig<T extends DogeBaseConfig>(config: T): bitcoinish.BitcoinishPaymentsConfig;
