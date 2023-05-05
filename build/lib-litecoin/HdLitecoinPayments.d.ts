import { HDNode } from './bip44';
import { HdLitecoinPaymentsConfig } from './types';
import { SinglesigLitecoinPayments } from './SinglesigLitecoinPayments';
export declare class HdLitecoinPayments extends SinglesigLitecoinPayments<HdLitecoinPaymentsConfig> {
    private config;
    readonly derivationPath: string;
    readonly xpub: string;
    readonly xprv: string | null;
    readonly hdNode: HDNode;
    constructor(config: HdLitecoinPaymentsConfig);
    isValidXprv(xprv: string): boolean;
    isValidXpub(xpub: string): boolean;
    getFullConfig(): HdLitecoinPaymentsConfig;
    getPublicConfig(): HdLitecoinPaymentsConfig;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getAddress(index: number): string;
    getKeyPair(index: number): import("./types").LitecoinjsKeyPair;
}
