import { LitecoinBaseConfig } from './types';
import { bitcoinish } from '../lib-bitcoin';
export declare function toBitcoinishConfig<T extends LitecoinBaseConfig>(config: T): bitcoinish.BitcoinishPaymentsConfig;
