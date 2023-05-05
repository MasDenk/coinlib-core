import Web3 from 'web3';
import { PaymentsConnectionManager } from '../lib-common';
import { EthereumNodesConnection, EthereumPaymentsUtilsConfig } from './types';
import { EthereumPaymentsUtils } from './EthereumPaymentsUtils';
export declare class EthereumConnectionManager implements PaymentsConnectionManager<EthereumNodesConnection, EthereumPaymentsUtilsConfig> {
    connections: {};
    getConnection(connected: EthereumPaymentsUtils): {
        web3: Web3;
        blockbookApi: import("blockbook-client").BlockbookEthereum;
    };
    getConnectionUrl(config: EthereumPaymentsUtilsConfig): string;
    setConnection(config: EthereumPaymentsUtilsConfig, ethereumConnection: EthereumNodesConnection): void;
}
