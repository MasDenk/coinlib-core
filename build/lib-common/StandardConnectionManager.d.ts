import { PaymentsConnectionManager } from './PaymentsConnectionManager';
import { BaseConfig } from './types';
export declare class StandardConnectionManager<Connection, Config extends {
    api?: Connection;
    server?: string | string[] | null;
} & BaseConfig> implements PaymentsConnectionManager<Connection, Config> {
    connections: {
        [url: string]: Connection;
    };
    getConnection(connected: any): any;
    getConnectionUrl(config: Config): string | string[];
    setConnection(config: Config, connection: Connection): void;
}
