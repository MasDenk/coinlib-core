import { NetworkType } from '../lib-common';
import { RippleAPI } from 'ripple-lib';
import { Logger } from '../ts-common';
import { BaseRippleConfig, RippleServerAPI } from './types';
export declare abstract class RippleConnected {
    networkType: NetworkType;
    logger: Logger;
    api: RippleAPI;
    server: string | null;
    constructor(config?: BaseRippleConfig);
    resolveRippleServer(config: BaseRippleConfig, network: NetworkType): {
        api: RippleServerAPI;
        server: string | null;
    };
    init(): Promise<void>;
    destroy(): Promise<void>;
}
