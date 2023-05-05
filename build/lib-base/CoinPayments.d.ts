import { Logger } from '../ts-common';
import { PaymentsFactory, AnyPayments, NetworkType } from '../lib-common';
import { CoinPaymentsConfig, SupportedCoinPaymentsSymbol, CoinPaymentsPartialConfigs } from './types';
export declare class CoinPayments {
    readonly config: CoinPaymentsConfig;
    readonly payments: {
        [A in SupportedCoinPaymentsSymbol]?: AnyPayments;
    };
    readonly accountIds: string[];
    readonly network: NetworkType;
    readonly logger: Logger;
    private readonly seedBuffer?;
    constructor(config: CoinPaymentsConfig);
    /** Get the global payments factory for a network */
    static getFactory(networkSymbol: SupportedCoinPaymentsSymbol): PaymentsFactory;
    private newPayments;
    getPublicConfig(): CoinPaymentsConfig;
    getAccountIds(): string[];
    forNetwork<T extends SupportedCoinPaymentsSymbol>(networkSymbol: T, extraConfig?: CoinPaymentsPartialConfigs[T]): AnyPayments;
    isNetworkSupported(networkSymbol: string): networkSymbol is SupportedCoinPaymentsSymbol;
    isNetworkConfigured(networkSymbol: string): boolean;
}
export default CoinPayments;
