import { SinglesigLitecoinPayments } from './SinglesigLitecoinPayments';
import { KeyPairLitecoinPaymentsConfig, LitecoinjsKeyPair } from './types';
export declare class KeyPairLitecoinPayments extends SinglesigLitecoinPayments<KeyPairLitecoinPaymentsConfig> {
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
    constructor(config: KeyPairLitecoinPaymentsConfig);
    getFullConfig(): KeyPairLitecoinPaymentsConfig;
    getPublicConfig(): KeyPairLitecoinPaymentsConfig;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getKeyPair(index: number): LitecoinjsKeyPair;
    getAddress(index: number): string;
    getPrivateKey(index: number): string;
}
export default KeyPairLitecoinPayments;
