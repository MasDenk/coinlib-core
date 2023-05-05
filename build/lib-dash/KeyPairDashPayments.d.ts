import { SinglesigDashPayments } from './SinglesigDashPayments';
import { KeyPairDashPaymentsConfig, BitcoinjsKeyPair } from './types';
export declare class KeyPairDashPayments extends SinglesigDashPayments<KeyPairDashPaymentsConfig> {
    private config;
    readonly publicKeys: {
        [index: number]: string | undefined;
    };
    readonly privateKeys: {
        [index: number]: string | null | undefined;
    };
    readonly addresses: {
        [index: number]: string | undefined;
    };
    constructor(config: KeyPairDashPaymentsConfig);
    getFullConfig(): KeyPairDashPaymentsConfig;
    getPublicConfig(): KeyPairDashPaymentsConfig;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getKeyPair(index: number): BitcoinjsKeyPair;
    getAddress(index: number): string;
    getPrivateKey(index: number): string;
}
export default KeyPairDashPayments;
