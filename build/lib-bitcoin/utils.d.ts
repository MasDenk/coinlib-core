import { BitcoinBaseConfig } from './types';
import { BitcoinishPaymentsConfig } from './bitcoinish';
export declare function toBitcoinishConfig<T extends BitcoinBaseConfig>(config: T): BitcoinishPaymentsConfig;
