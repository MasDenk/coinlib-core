import * as t from 'io-ts';
import { createUnitConverters, BlockInfo } from '../lib-common';
import { BlockbookEthereum, BlockInfoEthereum } from 'blockbook-client';
import Web3 from 'web3';
export declare enum EthereumAddressFormat {
    Lowercase = "lowercase",
    Checksum = "checksum"
}
export declare const EthereumAddressFormatT: t.Type<EthereumAddressFormat, EthereumAddressFormat, unknown>;
export declare type EthTxType = 'ETHEREUM_TRANSFER' | 'CONTRACT_DEPLOY' | 'TOKEN_SWEEP' | 'TOKEN_TRANSFER';
export declare const EthereumSignatory: t.TypeC<{
    address: t.StringC;
    keys: t.TypeC<{
        pub: t.StringC;
        prv: t.StringC;
    }>;
    xkeys: t.TypeC<{
        xprv: t.StringC;
        xpub: t.StringC;
    }>;
}>;
export declare type EthereumSignatory = t.TypeOf<typeof EthereumSignatory>;
export declare const EthereumPaymentsUtilsConfig: t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>;
export declare type EthereumPaymentsUtilsConfig = t.TypeOf<typeof EthereumPaymentsUtilsConfig>;
export declare const BaseEthereumPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>;
export declare type BaseEthereumPaymentsConfig = t.TypeOf<typeof BaseEthereumPaymentsConfig>;
export declare const HdEthereumPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>;
export declare type HdEthereumPaymentsConfig = t.TypeOf<typeof HdEthereumPaymentsConfig>;
export declare const KeyPairEthereumPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
}>]>;
export declare type KeyPairEthereumPaymentsConfig = t.TypeOf<typeof KeyPairEthereumPaymentsConfig>;
export declare const BaseErc20PaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    tokenAddress: t.StringC;
}>, t.PartialC<{
    masterAddress: t.StringC;
}>]>;
export declare type BaseErc20PaymentsConfig = t.TypeOf<typeof BaseErc20PaymentsConfig>;
export declare const HdErc20PaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    tokenAddress: t.StringC;
}>, t.PartialC<{
    masterAddress: t.StringC;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>;
export declare type HdErc20PaymentsConfig = t.TypeOf<typeof HdErc20PaymentsConfig>;
export declare const KeyPairErc20PaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    tokenAddress: t.StringC;
}>, t.PartialC<{
    masterAddress: t.StringC;
}>]>, t.TypeC<{
    keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
}>]>;
export declare type KeyPairErc20PaymentsConfig = t.TypeOf<typeof KeyPairErc20PaymentsConfig>;
export declare const Erc20PaymentsConfig: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    tokenAddress: t.StringC;
}>, t.PartialC<{
    masterAddress: t.StringC;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    tokenAddress: t.StringC;
}>, t.PartialC<{
    masterAddress: t.StringC;
}>]>, t.TypeC<{
    keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
}>]>]>;
export declare type Erc20PaymentsConfig = t.TypeOf<typeof Erc20PaymentsConfig>;
export declare const EthereumPaymentsConfig: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
}>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    tokenAddress: t.StringC;
}>, t.PartialC<{
    masterAddress: t.StringC;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.PartialC<{
    depositKeyIndex: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>, t.TypeC<{
    tokenAddress: t.StringC;
}>, t.PartialC<{
    masterAddress: t.StringC;
}>]>, t.TypeC<{
    keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
}>]>]>;
export declare type EthereumPaymentsConfig = t.TypeOf<typeof EthereumPaymentsConfig>;
export declare const EthereumTransactionOptions: t.IntersectionC<[t.IntersectionC<[t.UnionC<[t.IntersectionC<[t.TypeC<{
    feeRate: t.StringC;
    feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
}>, t.PartialC<{
    feeLevel: t.LiteralC<import("../lib-common").FeeLevel.Custom>;
}>]>, t.PartialC<{
    feeLevel: t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.High>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.Low>]>;
}>]>, t.PartialC<{
    sequenceNumber: t.UnionC<[t.StringC, t.NumberC, import("../ts-common").BigNumberC]>;
    payportBalance: t.UnionC<[t.StringC, t.NumberC, import("../ts-common").BigNumberC]>;
    forcedUtxos: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        satoshis: t.UnionC<[t.NumberC, t.StringC]>;
        confirmations: t.NumberC;
        height: t.StringC;
        lockTime: t.StringC;
        coinbase: t.BooleanC;
        txHex: t.StringC;
        scriptPubKeyHex: t.StringC;
        address: t.StringC;
        spent: t.BooleanC;
        signer: t.NumberC;
    }>]>>;
    availableUtxos: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        satoshis: t.UnionC<[t.NumberC, t.StringC]>;
        confirmations: t.NumberC;
        height: t.StringC;
        lockTime: t.StringC;
        coinbase: t.BooleanC;
        txHex: t.StringC;
        scriptPubKeyHex: t.StringC;
        address: t.StringC;
        spent: t.BooleanC;
        signer: t.NumberC;
    }>]>>;
    useAllUtxos: t.BooleanC;
    useUnconfirmedUtxos: t.BooleanC;
    recipientPaysFee: t.BooleanC;
    maxFeePercent: t.UnionC<[t.StringC, t.NumberC, import("../ts-common").BigNumberC]>;
    changeAddress: t.UnionC<[t.StringC, t.ArrayC<t.StringC>]>;
    lookupTxDataByHashes: import("../ts-common").FunctionC<import("../lib-common").LookupTxDataByHashes>;
}>]>, t.PartialC<{
    data: t.StringC;
    gas: t.UnionC<[t.StringC, t.NumberC, import("../ts-common").BigNumberC]>;
    proxyAddress: t.StringC;
}>]>;
export declare type EthereumTransactionOptions = t.TypeOf<typeof EthereumTransactionOptions>;
export declare const EthereumUnsignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    status: t.Type<import("../lib-common").TransactionStatus, import("../lib-common").TransactionStatus, unknown>;
    id: t.UnionC<[t.StringC, t.NullC]>;
    fromAddress: t.UnionC<[t.StringC, t.NullC]>;
    toAddress: t.UnionC<[t.StringC, t.NullC]>;
    fromIndex: t.UnionC<[t.NumberC, t.NullC]>;
    toIndex: t.UnionC<[t.NumberC, t.NullC]>;
    amount: t.UnionC<[t.StringC, t.NullC]>;
    fee: t.UnionC<[t.StringC, t.NullC]>;
}>, t.PartialC<{
    fromExtraId: t.UnionC<[t.StringC, t.NullC]>;
    toExtraId: t.UnionC<[t.StringC, t.NullC]>;
    sequenceNumber: t.UnionC<[t.UnionC<[t.StringC, t.NumberC]>, t.NullC]>;
    inputUtxos: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        satoshis: t.UnionC<[t.NumberC, t.StringC]>;
        confirmations: t.NumberC;
        height: t.StringC;
        lockTime: t.StringC;
        coinbase: t.BooleanC;
        txHex: t.StringC;
        scriptPubKeyHex: t.StringC;
        address: t.StringC;
        spent: t.BooleanC;
        signer: t.NumberC;
    }>]>>;
    outputUtxos: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        satoshis: t.UnionC<[t.NumberC, t.StringC]>;
        confirmations: t.NumberC;
        height: t.StringC;
        lockTime: t.StringC;
        coinbase: t.BooleanC;
        txHex: t.StringC;
        scriptPubKeyHex: t.StringC;
        address: t.StringC;
        spent: t.BooleanC;
        signer: t.NumberC;
    }>]>>;
    externalOutputs: t.ArrayC<t.IntersectionC<[t.TypeC<{
        address: t.StringC;
        value: t.StringC;
    }>, t.PartialC<{
        extraId: t.UnionC<[t.StringC, t.NullC]>;
    }>]>>;
    weight: t.NumberC;
    chainId: t.StringC;
}>]>, t.TypeC<{
    fromAddress: t.StringC;
    toAddress: t.StringC;
    fromIndex: t.UnionC<[t.NumberC, t.NullC]>;
    targetFeeLevel: t.Type<import("../lib-common").FeeLevel, import("../lib-common").FeeLevel, unknown>;
    targetFeeRate: t.UnionC<[t.StringC, t.NullC]>;
    targetFeeRateType: t.UnionC<[t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>, t.NullC]>;
}>, t.PartialC<{
    multisigData: t.UnionC<[t.TypeC<{
        m: t.NumberC;
        accountIds: t.ArrayC<t.StringC>;
        publicKeys: t.ArrayC<t.StringC>;
        signedAccountIds: t.ArrayC<t.StringC>;
    }>, t.RecordC<t.StringC, t.IntersectionC<[t.TypeC<{
        m: t.NumberC;
        accountIds: t.ArrayC<t.StringC>;
        publicKeys: t.ArrayC<t.StringC>;
        signedAccountIds: t.ArrayC<t.StringC>;
    }>, t.TypeC<{
        signerIndex: t.NumberC;
        inputIndices: t.ArrayC<t.NumberC>;
    }>]>>]>;
}>]>, t.TypeC<{
    status: t.LiteralC<import("../lib-common").TransactionStatus.Unsigned>;
    data: t.ObjectC;
}>]>, t.TypeC<{
    amount: t.StringC;
    fee: t.StringC;
}>]>;
export declare type EthereumUnsignedTransaction = t.TypeOf<typeof EthereumUnsignedTransaction>;
export declare const EthereumSignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    status: t.Type<import("../lib-common").TransactionStatus, import("../lib-common").TransactionStatus, unknown>;
    id: t.UnionC<[t.StringC, t.NullC]>;
    fromAddress: t.UnionC<[t.StringC, t.NullC]>;
    toAddress: t.UnionC<[t.StringC, t.NullC]>;
    fromIndex: t.UnionC<[t.NumberC, t.NullC]>;
    toIndex: t.UnionC<[t.NumberC, t.NullC]>;
    amount: t.UnionC<[t.StringC, t.NullC]>;
    fee: t.UnionC<[t.StringC, t.NullC]>;
}>, t.PartialC<{
    fromExtraId: t.UnionC<[t.StringC, t.NullC]>;
    toExtraId: t.UnionC<[t.StringC, t.NullC]>;
    sequenceNumber: t.UnionC<[t.UnionC<[t.StringC, t.NumberC]>, t.NullC]>;
    inputUtxos: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        satoshis: t.UnionC<[t.NumberC, t.StringC]>;
        confirmations: t.NumberC;
        height: t.StringC;
        lockTime: t.StringC;
        coinbase: t.BooleanC;
        txHex: t.StringC;
        scriptPubKeyHex: t.StringC;
        address: t.StringC;
        spent: t.BooleanC;
        signer: t.NumberC;
    }>]>>;
    outputUtxos: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        satoshis: t.UnionC<[t.NumberC, t.StringC]>;
        confirmations: t.NumberC;
        height: t.StringC;
        lockTime: t.StringC;
        coinbase: t.BooleanC;
        txHex: t.StringC;
        scriptPubKeyHex: t.StringC;
        address: t.StringC;
        spent: t.BooleanC;
        signer: t.NumberC;
    }>]>>;
    externalOutputs: t.ArrayC<t.IntersectionC<[t.TypeC<{
        address: t.StringC;
        value: t.StringC;
    }>, t.PartialC<{
        extraId: t.UnionC<[t.StringC, t.NullC]>;
    }>]>>;
    weight: t.NumberC;
    chainId: t.StringC;
}>]>, t.TypeC<{
    fromAddress: t.StringC;
    toAddress: t.StringC;
    fromIndex: t.UnionC<[t.NumberC, t.NullC]>;
    targetFeeLevel: t.Type<import("../lib-common").FeeLevel, import("../lib-common").FeeLevel, unknown>;
    targetFeeRate: t.UnionC<[t.StringC, t.NullC]>;
    targetFeeRateType: t.UnionC<[t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>, t.NullC]>;
}>, t.PartialC<{
    multisigData: t.UnionC<[t.TypeC<{
        m: t.NumberC;
        accountIds: t.ArrayC<t.StringC>;
        publicKeys: t.ArrayC<t.StringC>;
        signedAccountIds: t.ArrayC<t.StringC>;
    }>, t.RecordC<t.StringC, t.IntersectionC<[t.TypeC<{
        m: t.NumberC;
        accountIds: t.ArrayC<t.StringC>;
        publicKeys: t.ArrayC<t.StringC>;
        signedAccountIds: t.ArrayC<t.StringC>;
    }>, t.TypeC<{
        signerIndex: t.NumberC;
        inputIndices: t.ArrayC<t.NumberC>;
    }>]>>]>;
}>]>, t.TypeC<{
    status: t.LiteralC<import("../lib-common").TransactionStatus.Signed>;
    id: t.StringC;
    amount: t.StringC;
    fee: t.StringC;
    data: t.ObjectC;
}>]>, t.TypeC<{
    data: t.TypeC<{
        hex: t.StringC;
    }>;
}>]>;
export declare type EthereumSignedTransaction = t.TypeOf<typeof EthereumSignedTransaction>;
export declare const EthereumTransactionInfo: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    status: t.Type<import("../lib-common").TransactionStatus, import("../lib-common").TransactionStatus, unknown>;
    id: t.UnionC<[t.StringC, t.NullC]>;
    fromAddress: t.UnionC<[t.StringC, t.NullC]>;
    toAddress: t.UnionC<[t.StringC, t.NullC]>;
    fromIndex: t.UnionC<[t.NumberC, t.NullC]>;
    toIndex: t.UnionC<[t.NumberC, t.NullC]>;
    amount: t.UnionC<[t.StringC, t.NullC]>;
    fee: t.UnionC<[t.StringC, t.NullC]>;
}>, t.PartialC<{
    fromExtraId: t.UnionC<[t.StringC, t.NullC]>;
    toExtraId: t.UnionC<[t.StringC, t.NullC]>;
    sequenceNumber: t.UnionC<[t.UnionC<[t.StringC, t.NumberC]>, t.NullC]>;
    inputUtxos: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        satoshis: t.UnionC<[t.NumberC, t.StringC]>;
        confirmations: t.NumberC;
        height: t.StringC;
        lockTime: t.StringC;
        coinbase: t.BooleanC;
        txHex: t.StringC;
        scriptPubKeyHex: t.StringC;
        address: t.StringC;
        spent: t.BooleanC;
        signer: t.NumberC;
    }>]>>;
    outputUtxos: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vout: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        satoshis: t.UnionC<[t.NumberC, t.StringC]>;
        confirmations: t.NumberC;
        height: t.StringC;
        lockTime: t.StringC;
        coinbase: t.BooleanC;
        txHex: t.StringC;
        scriptPubKeyHex: t.StringC;
        address: t.StringC;
        spent: t.BooleanC;
        signer: t.NumberC;
    }>]>>;
    externalOutputs: t.ArrayC<t.IntersectionC<[t.TypeC<{
        address: t.StringC;
        value: t.StringC;
    }>, t.PartialC<{
        extraId: t.UnionC<[t.StringC, t.NullC]>;
    }>]>>;
    weight: t.NumberC;
    chainId: t.StringC;
}>]>, t.TypeC<{
    id: t.StringC;
    amount: t.StringC;
    fee: t.StringC;
    isExecuted: t.BooleanC;
    isConfirmed: t.BooleanC;
    confirmations: t.NumberC;
    confirmationId: t.UnionC<[t.StringC, t.NullC]>;
    confirmationTimestamp: t.UnionC<[import("../ts-common").DateC, t.NullC]>;
    data: t.ObjectC;
}>, t.PartialC<{
    currentBlockNumber: t.UnionC<[t.StringC, t.NumberC]>;
    confirmationNumber: t.UnionC<[t.StringC, t.NumberC]>;
}>]>;
export declare type EthereumTransactionInfo = t.TypeOf<typeof EthereumTransactionInfo>;
export declare const EthereumBroadcastResult: t.TypeC<{
    id: t.StringC;
}>;
export declare type EthereumBroadcastResult = t.TypeOf<typeof EthereumBroadcastResult>;
export declare const EthereumResolvedFeeOption: t.IntersectionC<[t.TypeC<{
    targetFeeLevel: t.Type<import("../lib-common").FeeLevel, import("../lib-common").FeeLevel, unknown>;
    targetFeeRate: t.StringC;
    targetFeeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
    feeBase: t.StringC;
    feeMain: t.StringC;
}>, t.TypeC<{
    gasPrice: t.StringC;
}>]>;
export declare type EthereumResolvedFeeOption = t.TypeOf<typeof EthereumResolvedFeeOption>;
export declare const EthereumFeeOption: t.IntersectionC<[t.UnionC<[t.IntersectionC<[t.TypeC<{
    feeRate: t.StringC;
    feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
}>, t.PartialC<{
    feeLevel: t.LiteralC<import("../lib-common").FeeLevel.Custom>;
}>]>, t.PartialC<{
    feeLevel: t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.High>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.Low>]>;
}>]>, t.PartialC<{
    isSweep: t.BooleanC;
}>]>;
export declare type EthereumFeeOption = t.TypeOf<typeof EthereumFeeOption>;
export declare const EthereumFeeOptionCustom: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    feeRate: t.StringC;
    feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
}>, t.PartialC<{
    feeLevel: t.LiteralC<import("../lib-common").FeeLevel.Custom>;
}>]>, t.PartialC<{
    isSweep: t.BooleanC;
}>]>;
export declare type EthereumFeeOptionCustom = t.TypeOf<typeof EthereumFeeOptionCustom>;
export declare const BaseDenominationOptions: t.IntersectionC<[t.ObjectC, t.PartialC<{
    rounding: t.UnionC<[t.LiteralC<1>, t.LiteralC<2>, t.LiteralC<3>, t.LiteralC<4>, t.LiteralC<5>, t.LiteralC<6>, t.LiteralC<7>, t.LiteralC<8>]>;
}>]>;
export declare type BaseDenominationOptions = t.TypeOf<typeof BaseDenominationOptions>;
export declare const EthereumBlockbookConfigServer: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
export declare type EthereumBlockbookConfigServer = t.TypeOf<typeof EthereumBlockbookConfigServer>;
export declare const EthereumBlockbookConnectedConfig: t.IntersectionC<[t.TypeC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    decimals: t.NumberC;
    api: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    requestTimeoutMs: t.NumberC;
}>]>;
export declare type EthereumBlockbookConnectedConfig = t.TypeOf<typeof EthereumBlockbookConnectedConfig>;
export declare const EthereumWeb3Config: t.IntersectionC<[t.TypeC<{
    web3: t.Type<Web3, Web3, unknown>;
}>, t.PartialC<{
    decimals: t.NumberC;
    fullNode: t.StringC;
    providerOptions: t.AnyC;
    logger: import("../ts-common").LoggerC;
}>]>;
export declare type EthereumWeb3Config = t.TypeOf<typeof EthereumWeb3Config>;
export declare const BlockBookConfig: t.IntersectionC<[t.TypeC<{
    nodes: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
}>, t.PartialC<{
    requestTimeoutMs: t.NumberC;
    api: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
}>]>;
export declare const NetworkDataConfig: t.IntersectionC<[t.TypeC<{
    web3Config: t.IntersectionC<[t.TypeC<{
        web3: t.Type<Web3, Web3, unknown>;
    }>, t.PartialC<{
        decimals: t.NumberC;
        fullNode: t.StringC;
        providerOptions: t.AnyC;
        logger: import("../ts-common").LoggerC;
    }>]>;
    blockBookConfig: t.IntersectionC<[t.TypeC<{
        nodes: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    }>, t.PartialC<{
        requestTimeoutMs: t.NumberC;
        api: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    }>]>;
}>, t.PartialC<{
    parityUrl: t.StringC;
    logger: import("../ts-common").LoggerC;
    gasStationUrl: t.StringC;
    requestTimeoutMs: t.NumberC;
}>]>;
export declare type NetworkDataConfig = t.TypeOf<typeof NetworkDataConfig>;
export declare const EthereumBalanceMonitorConfig: t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
    blockbookNode: t.StringC;
    blockbookApi: t.Type<BlockbookEthereum, BlockbookEthereum, unknown>;
    gasStation: t.UnionC<[t.StringC, t.UndefinedC]>;
    symbol: t.UnionC<[t.StringC, t.UndefinedC]>;
    name: t.UnionC<[t.StringC, t.UndefinedC]>;
    decimals: t.NumberC;
    providerOptions: t.AnyC;
    web3: t.AnyC;
    tokenAddress: t.StringC;
    requestTimeoutMs: t.UnionC<[t.NumberC, t.UndefinedC]>;
}>]>;
export declare type EthereumBalanceMonitorConfig = EthereumPaymentsUtilsConfig;
export declare const EthereumBlock: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    page: t.NumberC;
    totalPages: t.NumberC;
    itemsOnPage: t.NumberC;
}>, t.IntersectionC<[t.TypeC<{
    hash: t.StringC;
    height: t.NumberC;
    confirmations: t.NumberC;
    size: t.NumberC;
    version: t.NumberC;
    merkleRoot: t.StringC;
    nonce: t.StringC;
    bits: t.StringC;
    difficulty: t.StringC;
    txCount: t.NumberC;
}>, t.PartialC<{
    previousBlockHash: t.StringC;
    nextBlockHash: t.StringC;
    time: t.NumberC;
    txs: t.ArrayC<t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vin: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
        }>, t.PartialC<{
            txid: t.StringC;
            vout: t.NumberC;
            sequence: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
            value: t.StringC;
            hex: t.StringC;
            asm: t.StringC;
            coinbase: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        vout: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
            addresses: t.UnionC<[t.ArrayC<t.StringC>, t.NullC]>;
        }>, t.PartialC<{
            value: t.StringC;
            spent: t.BooleanC;
            spentTxId: t.StringC;
            spentIndex: t.NumberC;
            spentHeight: t.NumberC;
            hex: t.StringC;
            asm: t.StringC;
            type: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        blockHeight: t.NumberC;
        confirmations: t.NumberC;
        blockTime: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        version: t.NumberC;
        lockTime: t.NumberC;
        blockHash: t.StringC;
        size: t.NumberC;
        valueIn: t.StringC;
        fees: t.StringC;
        hex: t.StringC;
        tokenTransfers: t.ArrayC<t.TypeC<{
            type: t.StringC;
            from: t.StringC;
            to: t.StringC;
            token: t.StringC;
            name: t.StringC;
            symbol: t.StringC;
            decimals: t.NumberC;
            value: t.StringC;
        }>>;
        ethereumSpecific: t.TypeC<{
            status: t.NumberC;
            nonce: t.NumberC;
            gasLimit: t.NumberC;
            gasUsed: t.NumberC;
            gasPrice: t.StringC;
        }>;
    }>]>>;
}>]>]>, t.PartialC<{
    txs: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
        txid: t.StringC;
        vin: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
        }>, t.PartialC<{
            txid: t.StringC;
            vout: t.NumberC;
            sequence: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
            value: t.StringC;
            hex: t.StringC;
            asm: t.StringC;
            coinbase: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        vout: t.ArrayC<t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
            addresses: t.UnionC<[t.ArrayC<t.StringC>, t.NullC]>;
        }>, t.PartialC<{
            value: t.StringC;
            spent: t.BooleanC;
            spentTxId: t.StringC;
            spentIndex: t.NumberC;
            spentHeight: t.NumberC;
            hex: t.StringC;
            asm: t.StringC;
            type: t.StringC;
            isAddress: t.BooleanC;
        }>]>>;
        blockHeight: t.NumberC;
        confirmations: t.NumberC;
        blockTime: t.NumberC;
        value: t.StringC;
    }>, t.PartialC<{
        version: t.NumberC;
        lockTime: t.NumberC;
        blockHash: t.StringC;
        size: t.NumberC;
        valueIn: t.StringC;
        fees: t.StringC;
        hex: t.StringC;
        tokenTransfers: t.ArrayC<t.TypeC<{
            type: t.StringC;
            from: t.StringC;
            to: t.StringC;
            token: t.StringC;
            name: t.StringC;
            symbol: t.StringC;
            decimals: t.NumberC;
            value: t.StringC;
        }>>;
        ethereumSpecific: t.TypeC<{
            status: t.NumberC;
            nonce: t.NumberC;
            gasLimit: t.NumberC;
            gasUsed: t.NumberC;
            gasPrice: t.StringC;
        }>;
    }>]>, t.TypeC<{
        vin: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
        }>, t.PartialC<{
            txid: t.StringC;
            vout: t.NumberC;
            sequence: t.NumberC;
            addresses: t.ArrayC<t.StringC>;
            value: t.StringC;
            hex: t.StringC;
            asm: t.StringC;
            coinbase: t.StringC;
            isAddress: t.BooleanC;
        }>]>, t.TypeC<{
            addresses: t.ArrayC<t.StringC>;
        }>]>>;
        vout: t.ArrayC<t.IntersectionC<[t.IntersectionC<[t.TypeC<{
            n: t.NumberC;
            addresses: t.UnionC<[t.ArrayC<t.StringC>, t.NullC]>;
        }>, t.PartialC<{
            value: t.StringC;
            spent: t.BooleanC;
            spentTxId: t.StringC;
            spentIndex: t.NumberC;
            spentHeight: t.NumberC;
            hex: t.StringC;
            asm: t.StringC;
            type: t.StringC;
            isAddress: t.BooleanC;
        }>]>, t.TypeC<{
            value: t.StringC;
        }>]>>;
        fees: t.StringC;
        ethereumSpecific: t.TypeC<{
            status: t.NumberC;
            nonce: t.NumberC;
            gasLimit: t.NumberC;
            gasUsed: t.NumberC;
            gasPrice: t.StringC;
        }>;
    }>]>>;
}>]>;
export declare type EthereumBlock = BlockInfoEthereum;
export declare type UnitConverters = ReturnType<typeof createUnitConverters>;
export interface EthereumNodesConnection {
    web3: Web3;
    blockbookApi: BlockbookEthereum;
}
export interface EthereumStandardizedTransaction {
    from: string;
    to: string;
    nonce: number;
    txHash: string;
    blockHeight: number;
    blockHash: string;
    blockTime: Date | null;
    value: string;
    confirmations: number;
    gasUsed: number;
    gasPrice: string;
    raw: object;
    contractAddress?: string;
    status: boolean;
}
export interface EthereumStandardizedERC20Transaction extends EthereumStandardizedTransaction {
    tokenSymbol: string;
    tokenName: string;
    tokenDecimals: string;
    txInput: string;
    receipt: {
        gasUsed: string;
        status: string | boolean;
        logs: any[];
    };
}
export interface EthereumNetworkDataProvider {
    getBlock(id?: string | number): Promise<BlockInfo>;
    getCurrentBlockNumber(): Promise<number>;
    getAddressBalance(address: string): Promise<string>;
    getAddressBalanceERC20(address: string, tokenAddress: string): Promise<string>;
    getERC20Transaction(txId: string, tokenAddress: string): Promise<EthereumStandardizedERC20Transaction>;
    getTransaction(txId: string): Promise<EthereumStandardizedTransaction>;
}
