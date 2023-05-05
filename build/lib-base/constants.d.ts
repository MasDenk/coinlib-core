import { BitcoinPaymentsFactory } from '../lib-bitcoin';
import { EthereumPaymentsFactory } from '../lib-ethereum';
import { LitecoinPaymentsFactory } from '../lib-litecoin';
import { DogePaymentsFactory } from '../lib-doge';
import { DashPaymentsFactory } from '../lib-dash';
export declare const PAYMENTS_FACTORIES: {
    BTC: BitcoinPaymentsFactory;
    ETH: EthereumPaymentsFactory;
    LTC: LitecoinPaymentsFactory;
    DOGE: DogePaymentsFactory;
    DASH: DashPaymentsFactory;
};
export declare const SUPPORTED_NETWORK_SYMBOLS: ("BTC" | "ETH" | "LTC" | "DOGE" | "DASH")[];
