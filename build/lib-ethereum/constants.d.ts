import { FeeLevel } from '../lib-common';
import { EthTxType, EthereumAddressFormat } from './types';
export declare const PACKAGE_NAME = "ethereum-payments";
export declare const ETH_SYMBOL = "ETH";
export declare const ETH_NAME = "Ethereum";
export declare const ETH_DECIMAL_PLACES = 18;
export declare const DEFAULT_FULL_NODE: string;
export declare const DEFAULT_SOLIDITY_NODE: string;
export declare const DEFAULT_EVENT_SERVER: string;
export declare const DEFAULT_FEE_LEVEL = FeeLevel.Medium;
export declare const MIN_CONFIRMATIONS = 0;
export declare const DEFAULT_GAS_PRICE_IN_WEI = "50000000000";
export declare const GAS_STATION_URL = "https://ethgasstation.info";
export declare const ETHEREUM_TRANSFER_COST = 50000;
export declare const CONTRACT_DEPLOY_COST = 300000;
export declare const TOKEN_SWEEP_COST = 300000;
export declare const TOKEN_TRANSFER_COST = 300000;
/** Multiply all web3 estimateGas calls by this because it's innacurate */
export declare const GAS_ESTIMATE_MULTIPLIER = 1.5;
export declare const MIN_SWEEPABLE_WEI: string;
export declare const GAS_STATION_FEE_SPEED: {
    low: string;
    medium: string;
    high: string;
};
export declare const MAXIMUM_GAS: {
    [a in EthTxType]: number;
};
export declare const TOKEN_WALLET_DATA_LEGACY: string;
export declare const TOKEN_WALLET_DATA: string;
export declare const TOKEN_WALLET_ABI: any;
export declare const TOKEN_WALLET_ABI_LEGACY: any;
export declare const TOKEN_PROXY_DATA: string;
export declare const TOKEN_METHODS_ABI: any;
export declare const DEPOSIT_KEY_INDEX = 0;
export declare const PUBLIC_CONFIG_OMIT_FIELDS: string[];
export declare const DEFAULT_ADDRESS_FORMAT = EthereumAddressFormat.Lowercase;
export declare const NETWORK_DATA_PROVIDERS: {
    BLOCKBOOK: string;
    INFURA: string;
};
export declare const FULL_ERC20_TOKEN_METHODS_ABI: any;
export declare const BALANCE_ACTIVITY_EVENT = "activity";
export declare const DEFAULT_MAINNET_SERVER: string[];
export declare const DEFAULT_TESTNET_SERVER: string[];
