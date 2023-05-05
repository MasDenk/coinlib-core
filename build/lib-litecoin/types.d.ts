/// <reference types="node" />
import * as t from 'io-ts';
import { Signer as BitcoinjsSigner } from 'bitcoinjs-lib';
import { bitcoinish } from '../lib-bitcoin';
import { PsbtInput, TransactionInput } from 'bip174/src/lib/interfaces';
export declare enum LitecoinAddressFormat {
    Deprecated = "deprecated",
    Modern = "modern"
}
export declare const LitecoinAddressFormatT: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
export declare type LitecoinjsKeyPair = BitcoinjsSigner & {
    privateKey?: Buffer;
    toWIF(): string;
};
export interface PsbtInputData extends PsbtInput, TransactionInput {
}
export declare enum AddressType {
    Legacy = "p2pkh",
    SegwitP2SH = "p2sh-p2wpkh",
    SegwitNative = "p2wpkh",
    MultisigLegacy = "p2sh-p2ms",
    MultisigSegwitP2SH = "p2sh-p2wsh-p2ms",
    MultisigSegwitNative = "p2wsh-p2ms"
}
export declare const AddressTypeT: t.Type<AddressType, AddressType, unknown>;
declare const SinglesigAddressTypeT: t.KeyofC<{
    p2pkh: any;
    "p2sh-p2wpkh": any;
    p2wpkh: any;
}>;
export declare type SinglesigAddressType = t.TypeOf<typeof SinglesigAddressTypeT>;
export declare const SinglesigAddressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
declare const MultisigAddressTypeT: t.KeyofC<{
    "p2sh-p2ms": any;
    "p2sh-p2wsh-p2ms": any;
    "p2wsh-p2ms": any;
}>;
export declare type MultisigAddressType = t.TypeOf<typeof MultisigAddressTypeT>;
export declare const MultisigAddressType: t.Type<AddressType.MultisigLegacy | AddressType.MultisigSegwitP2SH | AddressType.MultisigSegwitNative, AddressType.MultisigLegacy | AddressType.MultisigSegwitP2SH | AddressType.MultisigSegwitNative, unknown>;
export declare const BitcoinishTxOutput: t.TypeC<{
    address: t.StringC;
    value: t.StringC;
}>;
export declare type BitcoinishTxOutput = t.TypeOf<typeof BitcoinishTxOutput>;
export declare const LitecoinBaseConfig: t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>;
export declare type LitecoinBaseConfig = t.TypeOf<typeof LitecoinBaseConfig>;
export declare const LitecoinBalanceMonitorConfig: t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>;
export declare type LitecoinBalanceMonitorConfig = LitecoinBaseConfig;
export declare const LitecoinPaymentsUtilsConfig: t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
    feeLevelBlockTargets: t.RecordC<t.UnionC<[t.LiteralC<import("../lib-common").FeeLevel.Low>, t.LiteralC<import("../lib-common").FeeLevel.Medium>, t.LiteralC<import("../lib-common").FeeLevel.High>]>, t.NumberC>;
}>]>;
export declare type LitecoinPaymentsUtilsConfig = t.TypeOf<typeof LitecoinPaymentsUtilsConfig>;
export declare const BaseLitecoinPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
export declare type BaseLitecoinPaymentsConfig = t.TypeOf<typeof BaseLitecoinPaymentsConfig>;
export declare const HdLitecoinPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
    addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
    derivationPath: t.StringC;
}>]>;
export declare type HdLitecoinPaymentsConfig = t.TypeOf<typeof HdLitecoinPaymentsConfig>;
export declare const KeyPairLitecoinPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
    addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
}>]>;
export declare type KeyPairLitecoinPaymentsConfig = t.TypeOf<typeof KeyPairLitecoinPaymentsConfig>;
export declare const SinglesigLitecoinPaymentsConfig: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
    addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
    derivationPath: t.StringC;
}>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
    addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
}>]>]>;
export declare type SinglesigLitecoinPaymentsConfig = t.TypeOf<typeof SinglesigLitecoinPaymentsConfig>;
export declare const MultisigLitecoinPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
        api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
        addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
        addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
    }>]>]>>;
}>, t.PartialC<{
    addressType: t.Type<AddressType.MultisigLegacy | AddressType.MultisigSegwitP2SH | AddressType.MultisigSegwitNative, AddressType.MultisigLegacy | AddressType.MultisigSegwitP2SH | AddressType.MultisigSegwitNative, unknown>;
}>]>;
export declare type MultisigLitecoinPaymentsConfig = t.TypeOf<typeof MultisigLitecoinPaymentsConfig>;
export declare const LitecoinPaymentsConfig: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
    addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
    derivationPath: t.StringC;
}>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
    addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
}>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
    api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
}>]>, t.PartialC<{
    blockcypherToken: t.StringC;
    validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
        api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
        addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
        derivationPath: t.StringC;
    }>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
        network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
        logger: import("../ts-common").LoggerC;
    }>, t.PartialC<{
        server: t.UnionC<[t.StringC, t.ArrayC<t.StringC>, t.NullC]>;
        api: t.Type<bitcoinish.BlockbookServerAPI, bitcoinish.BlockbookServerAPI, unknown>;
    }>]>, t.PartialC<{
        blockcypherToken: t.StringC;
        validAddressFormat: t.Type<LitecoinAddressFormat, LitecoinAddressFormat, unknown>;
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
        addressType: t.Type<AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, AddressType.Legacy | AddressType.SegwitP2SH | AddressType.SegwitNative, unknown>;
    }>]>]>>;
}>, t.PartialC<{
    addressType: t.Type<AddressType.MultisigLegacy | AddressType.MultisigSegwitP2SH | AddressType.MultisigSegwitNative, AddressType.MultisigLegacy | AddressType.MultisigSegwitP2SH | AddressType.MultisigSegwitNative, unknown>;
}>]>]>;
export declare type LitecoinPaymentsConfig = t.TypeOf<typeof LitecoinPaymentsConfig>;
export declare const LitecoinUnsignedTransactionData: t.IntersectionC<[t.TypeC<{
    inputs: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
    outputs: t.ArrayC<t.TypeC<{
        address: t.StringC;
        value: t.StringC;
    }>>;
    fee: t.StringC;
    change: t.StringC;
    changeAddress: t.UnionC<[t.StringC, t.NullC]>;
}>, t.PartialC<{
    inputTotal: t.StringC;
    externalOutputs: t.ArrayC<t.TypeC<{
        address: t.StringC;
        value: t.StringC;
    }>>;
    externalOutputTotal: t.StringC;
    changeOutputs: t.ArrayC<t.TypeC<{
        address: t.StringC;
        value: t.StringC;
    }>>;
    rawHex: t.StringC;
    rawHash: t.StringC;
    weight: t.NumberC;
}>]>;
export declare type LitecoinUnsignedTransactionData = t.TypeOf<typeof LitecoinUnsignedTransactionData>;
export declare const LitecoinUnsignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    data: t.IntersectionC<[t.TypeC<{
        inputs: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
        outputs: t.ArrayC<t.TypeC<{
            address: t.StringC;
            value: t.StringC;
        }>>;
        fee: t.StringC;
        change: t.StringC;
        changeAddress: t.UnionC<[t.StringC, t.NullC]>;
    }>, t.PartialC<{
        inputTotal: t.StringC;
        externalOutputs: t.ArrayC<t.TypeC<{
            address: t.StringC;
            value: t.StringC;
        }>>;
        externalOutputTotal: t.StringC;
        changeOutputs: t.ArrayC<t.TypeC<{
            address: t.StringC;
            value: t.StringC;
        }>>;
        rawHex: t.StringC;
        rawHash: t.StringC;
        weight: t.NumberC;
    }>]>;
}>]>, t.TypeC<{
    amount: t.StringC;
    fee: t.StringC;
    data: t.IntersectionC<[t.TypeC<{
        inputs: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
        outputs: t.ArrayC<t.TypeC<{
            address: t.StringC;
            value: t.StringC;
        }>>;
        fee: t.StringC;
        change: t.StringC;
        changeAddress: t.UnionC<[t.StringC, t.NullC]>;
    }>, t.PartialC<{
        inputTotal: t.StringC;
        externalOutputs: t.ArrayC<t.TypeC<{
            address: t.StringC;
            value: t.StringC;
        }>>;
        externalOutputTotal: t.StringC;
        changeOutputs: t.ArrayC<t.TypeC<{
            address: t.StringC;
            value: t.StringC;
        }>>;
        rawHex: t.StringC;
        rawHash: t.StringC;
        weight: t.NumberC;
    }>]>;
}>]>;
export declare type LitecoinUnsignedTransaction = t.TypeOf<typeof LitecoinUnsignedTransaction>;
export declare const LitecoinSignedTransactionData: t.IntersectionC<[t.TypeC<{
    hex: t.StringC;
}>, t.PartialC<{
    partial: t.BooleanC;
    unsignedTxHash: t.StringC;
    changeOutputs: t.ArrayC<t.TypeC<{
        address: t.StringC;
        value: t.StringC;
    }>>;
}>]>;
export declare type LitecoinSignedTransactionData = t.TypeOf<typeof LitecoinSignedTransactionData>;
export declare const LitecoinSignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    data: t.IntersectionC<[t.TypeC<{
        hex: t.StringC;
    }>, t.PartialC<{
        partial: t.BooleanC;
        unsignedTxHash: t.StringC;
        changeOutputs: t.ArrayC<t.TypeC<{
            address: t.StringC;
            value: t.StringC;
        }>>;
    }>]>;
}>]>, t.TypeC<{
    data: t.IntersectionC<[t.TypeC<{
        hex: t.StringC;
    }>, t.PartialC<{
        partial: t.BooleanC;
        unsignedTxHash: t.StringC;
        changeOutputs: t.ArrayC<t.TypeC<{
            address: t.StringC;
            value: t.StringC;
        }>>;
    }>]>;
}>]>;
export declare type LitecoinSignedTransaction = t.TypeOf<typeof LitecoinSignedTransaction>;
export declare const LitecoinTransactionInfo: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
export declare type LitecoinTransactionInfo = t.TypeOf<typeof LitecoinTransactionInfo>;
export declare const LitecoinBroadcastResult: t.TypeC<{
    id: t.StringC;
}>;
export declare type LitecoinBroadcastResult = t.TypeOf<typeof LitecoinBroadcastResult>;
export declare const LitecoinBlock: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
        vin: t.ArrayC<t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
            value: t.StringC;
        }>]>, t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
            coinbase: t.StringC;
        }>]>]>>;
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
        valueIn: t.StringC;
        fees: t.StringC;
    }>]>>;
}>]>;
export declare type LitecoinBlock = bitcoinish.BlockInfoBitcoin;
export {};
