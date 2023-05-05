import * as t from 'io-ts';
import { BitcoinPaymentsUtils } from '../lib-bitcoin';
import { EthereumPaymentsUtils } from '../lib-ethereum';
import { LitecoinPaymentsUtils } from '../lib-litecoin';
import { DogePaymentsUtils } from '../lib-doge';
import { DashPaymentsUtils } from '../lib-dash';
export declare type CoinPaymentsUtilsClasses = {
    BTC: BitcoinPaymentsUtils;
    ETH: EthereumPaymentsUtils;
    LTC: LitecoinPaymentsUtils;
    DOGE: DogePaymentsUtils;
    DASH: DashPaymentsUtils;
};
export declare const basePaymentsConfigCodecs: {
    BTC: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>;
    ETH: t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        blockbookNode: t.StringC;
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
    LTC: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>;
    DOGE: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>;
    DASH: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>;
};
export declare const CoinPaymentsBaseConfigs: t.TypeC<{
    BTC: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>;
    ETH: t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        blockbookNode: t.StringC;
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
    LTC: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>;
    DOGE: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>;
    DASH: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>;
}>;
export declare type CoinPaymentsBaseConfigs = t.TypeOf<typeof CoinPaymentsBaseConfigs>;
export declare const paymentsConfigCodecs: {
    BTC: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.MultisigLegacy | import("../lib-bitcoin").AddressType.MultisigSegwitP2SH | import("../lib-bitcoin").AddressType.MultisigSegwitNative, import("../lib-bitcoin").AddressType.MultisigLegacy | import("../lib-bitcoin").AddressType.MultisigSegwitP2SH | import("../lib-bitcoin").AddressType.MultisigSegwitNative, unknown>;
    }>]>]>;
    ETH: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        blockbookNode: t.StringC;
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
    LTC: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.MultisigLegacy | import("../lib-litecoin").AddressType.MultisigSegwitP2SH | import("../lib-litecoin").AddressType.MultisigSegwitNative, import("../lib-litecoin").AddressType.MultisigLegacy | import("../lib-litecoin").AddressType.MultisigSegwitP2SH | import("../lib-litecoin").AddressType.MultisigSegwitNative, unknown>;
    }>]>]>;
    DOGE: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.MultisigLegacy, import("../lib-doge").AddressType.MultisigLegacy, unknown>;
    }>]>]>;
    DASH: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.MultisigLegacy, import("../lib-dash").AddressType.MultisigLegacy, unknown>;
    }>]>]>;
};
export declare const CoinPaymentsConfigs: t.TypeC<{
    BTC: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.MultisigLegacy | import("../lib-bitcoin").AddressType.MultisigSegwitP2SH | import("../lib-bitcoin").AddressType.MultisigSegwitNative, import("../lib-bitcoin").AddressType.MultisigLegacy | import("../lib-bitcoin").AddressType.MultisigSegwitP2SH | import("../lib-bitcoin").AddressType.MultisigSegwitNative, unknown>;
    }>]>]>;
    ETH: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        blockbookNode: t.StringC;
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
    LTC: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.MultisigLegacy | import("../lib-litecoin").AddressType.MultisigSegwitP2SH | import("../lib-litecoin").AddressType.MultisigSegwitNative, import("../lib-litecoin").AddressType.MultisigLegacy | import("../lib-litecoin").AddressType.MultisigSegwitP2SH | import("../lib-litecoin").AddressType.MultisigSegwitNative, unknown>;
    }>]>]>;
    DOGE: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.MultisigLegacy, import("../lib-doge").AddressType.MultisigLegacy, unknown>;
    }>]>]>;
    DASH: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.MultisigLegacy, import("../lib-dash").AddressType.MultisigLegacy, unknown>;
    }>]>]>;
}>;
export declare type CoinPaymentsConfigs = t.TypeOf<typeof CoinPaymentsConfigs>;
export declare const SupportedCoinPaymentsSymbol: t.KeyofC<{
    BTC: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, import("../lib-bitcoin").AddressType.Legacy | import("../lib-bitcoin").AddressType.SegwitP2SH | import("../lib-bitcoin").AddressType.SegwitNative, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-bitcoin").AddressType.MultisigLegacy | import("../lib-bitcoin").AddressType.MultisigSegwitP2SH | import("../lib-bitcoin").AddressType.MultisigSegwitNative, import("../lib-bitcoin").AddressType.MultisigLegacy | import("../lib-bitcoin").AddressType.MultisigSegwitP2SH | import("../lib-bitcoin").AddressType.MultisigSegwitNative, unknown>;
    }>]>]>;
    ETH: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        fullNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        parityNode: t.UnionC<[t.StringC, t.UndefinedC]>;
        blockbookNode: t.StringC;
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
        blockbookApi: t.Type<import("blockbook-client").BlockbookEthereum, import("blockbook-client").BlockbookEthereum, unknown>;
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
    LTC: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            validAddressFormat: t.Type<import("../lib-litecoin").LitecoinAddressFormat, import("../lib-litecoin").LitecoinAddressFormat, unknown>;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, import("../lib-litecoin").AddressType.Legacy | import("../lib-litecoin").AddressType.SegwitP2SH | import("../lib-litecoin").AddressType.SegwitNative, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-litecoin").AddressType.MultisigLegacy | import("../lib-litecoin").AddressType.MultisigSegwitP2SH | import("../lib-litecoin").AddressType.MultisigSegwitNative, import("../lib-litecoin").AddressType.MultisigLegacy | import("../lib-litecoin").AddressType.MultisigSegwitP2SH | import("../lib-litecoin").AddressType.MultisigSegwitNative, unknown>;
    }>]>]>;
    DOGE: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-doge").AddressType.Legacy, import("../lib-doge").AddressType.Legacy, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-doge").AddressType.MultisigLegacy, import("../lib-doge").AddressType.MultisigLegacy, unknown>;
    }>]>]>;
    DASH: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        hdKey: t.StringC;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
    }>]>, t.PartialC<{
        minTxFee: t.TypeC<{
            feeRate: t.StringC;
            feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
        }>;
        dustThreshold: t.NumberC;
        networkMinRelayFee: t.NumberC;
        targetUtxoPoolSize: t.NumberC;
        minChange: t.StringC;
        maximumFeeRate: t.NumberC;
    }>]>, t.TypeC<{
        m: t.NumberC;
        signers: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            hdKey: t.StringC;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
            derivationPath: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
            network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
            logger: import("../ts-common").LoggerC;
        }>, t.PartialC<{
            server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
            api: t.Type<import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, import("../lib-bitcoin/bitcoinish").BlockbookServerAPI, unknown>;
        }>]>, t.PartialC<{
            blockcypherToken: t.StringC;
            feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
        }>]>, t.PartialC<{
            minTxFee: t.TypeC<{
                feeRate: t.StringC;
                feeRateType: t.Type<import("../lib-common").FeeRateType, import("../lib-common").FeeRateType, unknown>;
            }>;
            dustThreshold: t.NumberC;
            networkMinRelayFee: t.NumberC;
            targetUtxoPoolSize: t.NumberC;
            minChange: t.StringC;
            maximumFeeRate: t.NumberC;
        }>]>, t.TypeC<{
            keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
        }>, t.PartialC<{
            addressType: t.Type<import("../lib-dash").AddressType.Legacy, import("../lib-dash").AddressType.Legacy, unknown>;
        }>]>]>>;
    }>, t.PartialC<{
        addressType: t.Type<import("../lib-dash").AddressType.MultisigLegacy, import("../lib-dash").AddressType.MultisigLegacy, unknown>;
    }>]>]>;
}>;
export declare type SupportedCoinPaymentsSymbol = t.TypeOf<typeof SupportedCoinPaymentsSymbol>;
export declare type CoinPaymentsPartialConfigs = {
    [T in SupportedCoinPaymentsSymbol]?: Partial<CoinPaymentsConfigs[T]>;
};
export declare const CoinPaymentsPartialConfigs: t.Type<CoinPaymentsPartialConfigs, CoinPaymentsPartialConfigs, unknown>;
export declare const CoinPaymentsConfig: t.IntersectionC<[t.Type<CoinPaymentsPartialConfigs, CoinPaymentsPartialConfigs, unknown>, t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
    seed: t.StringC;
}>]>;
export declare type CoinPaymentsConfig = t.TypeOf<typeof CoinPaymentsConfig>;
