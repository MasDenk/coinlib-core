import { SinglesigDogePayments } from './SinglesigDogePayments';
import { KeyPairDogePaymentsConfig, BitcoinjsKeyPair } from './types';
export declare class KeyPairDogePayments extends SinglesigDogePayments<KeyPairDogePaymentsConfig> {
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
    constructor(config: KeyPairDogePaymentsConfig);
    getFullConfig(): KeyPairDogePaymentsConfig;
    getPublicConfig(): KeyPairDogePaymentsConfig;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getKeyPair(index: number): BitcoinjsKeyPair;
    getAddress(index: number): string;
    getPrivateKey(index: number): string;
}
export default KeyPairDogePayments;
