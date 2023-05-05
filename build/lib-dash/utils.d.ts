import { DashBaseConfig } from './types';
import { bitcoinish } from '../lib-bitcoin';
export declare function toBitcoinishConfig<T extends DashBaseConfig>(config: T): bitcoinish.BitcoinishPaymentsConfig;
