import { HDNode } from './bip44';
import { HdDashPaymentsConfig } from './types';
import { SinglesigDashPayments } from './SinglesigDashPayments';
export declare class HdDashPayments extends SinglesigDashPayments<HdDashPaymentsConfig> {
    private config;
    readonly derivationPath: string;
    readonly xpub: string;
    readonly xprv: string | null;
    readonly hdNode: HDNode;
    constructor(config: HdDashPaymentsConfig);
    isValidXprv(xprv: string): boolean;
    isValidXpub(xpub: string): boolean;
    getFullConfig(): HdDashPaymentsConfig;
    getPublicConfig(): HdDashPaymentsConfig;
    getAccountId(index: number): string;
    getAccountIds(index?: number): string[];
    getAddress(index: number): string;
    getKeyPair(index: number): import("./types").BitcoinjsKeyPair;
}
