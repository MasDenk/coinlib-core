import { BaseConfig } from './types';
export interface PaymentsConnectionManager<Connection, // connection type
Config extends BaseConfig> {
    connections: {
        [url: string]: Connection;
    };
    getConnection(x: any): Connection;
    getConnectionUrl(c: Config): string | string[] | null;
    setConnection(c: Config, t: Connection): void;
}
