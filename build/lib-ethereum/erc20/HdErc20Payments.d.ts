import { Payport } from '../../lib-common';
import { BaseErc20Payments } from './BaseErc20Payments';
import { HdErc20PaymentsConfig, EthereumSignatory } from '../types';
export declare class HdErc20Payments extends BaseErc20Payments<HdErc20PaymentsConfig> {
    readonly xprv: string | null;
    readonly xpub: string;
    constructor(config: HdErc20PaymentsConfig);
    static generateNewKeys(): EthereumSignatory;
    getXpub(): string;
    getPublicConfig(): HdErc20PaymentsConfig;
    getAccountId(index: number): string;
    getAccountIds(): string[];
    getAddressSalt(index: number): string;
    getPayport(index: number): Promise<Payport>;
    getPrivateKey(index: number): Promise<string>;
}
export default HdErc20Payments;
