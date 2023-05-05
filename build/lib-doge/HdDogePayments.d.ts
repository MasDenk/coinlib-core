import { HDNode } from './bip44';
import { HdDogePaymentsConfig } from './types';
import { SinglesigDogePayments } from './SinglesigDogePayments';
export declare class HdDogePayments extends SinglesigDogePayments<HdDogePaymentsConfig> {
    private config;
    readonly derivationPath: string;
    readonly xpub: string;
    readonly xprv: string | null;
    readonly hdNode: HDNode;
    constructor(config: HdDogePaymentsConfig);
    isValidXprv(xprv: string): boolean;
    isValidXpub(xpub: string): boolean;
    getFullConfig(): HdDogePaymentsConfig;
    getPublicConfig(): HdDogePaymentsConfig;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getAddress(index: number): string;
    getKeyPair(index: number): import("./types").BitcoinjsKeyPair;
}
