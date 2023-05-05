import * as t from 'io-ts';
import { CreateTransactionOptions, Payport, FromTo } from '../lib-common';
import { FormattedTransactionType as RippleTransaction, RippleAPI } from 'ripple-lib';
import { KeyPair } from 'ripple-lib/dist/npm/transaction/types';
declare type PromiseValue<T> = T extends Promise<infer X> ? X : never;
declare type RippleLedger = PromiseValue<ReturnType<RippleAPI['getLedger']>>;
export { RippleTransaction, RippleLedger, CreateTransactionOptions };
export declare type TransactionInfoRaw = RippleTransaction & {
    currentLedger: RippleLedger;
};
export declare class RippleServerAPI extends RippleAPI {
}
export declare const BaseRippleConfig: t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.NullC]>;
    api: t.Type<RippleServerAPI, RippleServerAPI, unknown>;
}>]>;
export declare type BaseRippleConfig = t.TypeOf<typeof BaseRippleConfig>;
export declare const RippleBalanceMonitorConfig: t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.NullC]>;
    api: t.Type<RippleServerAPI, RippleServerAPI, unknown>;
}>]>;
export declare type RippleBalanceMonitorConfig = t.TypeOf<typeof RippleBalanceMonitorConfig>;
export declare const BaseRipplePaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.NullC]>;
    api: t.Type<RippleServerAPI, RippleServerAPI, unknown>;
}>]>, t.PartialC<{
    maxLedgerVersionOffset: t.NumberC;
}>]>;
export declare type BaseRipplePaymentsConfig = t.TypeOf<typeof BaseRipplePaymentsConfig>;
export declare const HdRipplePaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.NullC]>;
    api: t.Type<RippleServerAPI, RippleServerAPI, unknown>;
}>]>, t.PartialC<{
    maxLedgerVersionOffset: t.NumberC;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>;
export declare type HdRipplePaymentsConfig = t.TypeOf<typeof HdRipplePaymentsConfig>;
export declare const RippleKeyPair: t.TypeC<{
    publicKey: t.StringC;
    privateKey: t.StringC;
}>;
export declare type RippleKeyPair = t.TypeOf<typeof RippleKeyPair>;
export declare const RippleSecretPair: t.TypeC<{
    address: t.StringC;
    secret: t.StringC;
}>;
export declare type RippleSecretPair = t.TypeOf<typeof RippleSecretPair>;
/**
 * address, or secret+address, or public+private key
 */
export declare const RippleAccountConfig: t.UnionC<[t.StringC, t.TypeC<{
    address: t.StringC;
    secret: t.StringC;
}>, t.TypeC<{
    publicKey: t.StringC;
    privateKey: t.StringC;
}>]>;
export declare type RippleAccountConfig = t.TypeOf<typeof RippleAccountConfig>;
export declare const AccountRipplePaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.NullC]>;
    api: t.Type<RippleServerAPI, RippleServerAPI, unknown>;
}>]>, t.PartialC<{
    maxLedgerVersionOffset: t.NumberC;
}>]>, t.TypeC<{
    hotAccount: t.UnionC<[t.StringC, t.TypeC<{
        address: t.StringC;
        secret: t.StringC;
    }>, t.TypeC<{
        publicKey: t.StringC;
        privateKey: t.StringC;
    }>]>;
    depositAccount: t.UnionC<[t.StringC, t.TypeC<{
        address: t.StringC;
        secret: t.StringC;
    }>, t.TypeC<{
        publicKey: t.StringC;
        privateKey: t.StringC;
    }>]>;
}>]>;
export declare type AccountRipplePaymentsConfig = t.TypeOf<typeof AccountRipplePaymentsConfig>;
export declare const RipplePaymentsConfig: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.NullC]>;
    api: t.Type<RippleServerAPI, RippleServerAPI, unknown>;
}>]>, t.PartialC<{
    maxLedgerVersionOffset: t.NumberC;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>, t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    server: t.UnionC<[t.StringC, t.NullC]>;
    api: t.Type<RippleServerAPI, RippleServerAPI, unknown>;
}>]>, t.PartialC<{
    maxLedgerVersionOffset: t.NumberC;
}>]>, t.TypeC<{
    hotAccount: t.UnionC<[t.StringC, t.TypeC<{
        address: t.StringC;
        secret: t.StringC;
    }>, t.TypeC<{
        publicKey: t.StringC;
        privateKey: t.StringC;
    }>]>;
    depositAccount: t.UnionC<[t.StringC, t.TypeC<{
        address: t.StringC;
        secret: t.StringC;
    }>, t.TypeC<{
        publicKey: t.StringC;
        privateKey: t.StringC;
    }>]>;
}>]>]>;
export declare type RipplePaymentsConfig = t.TypeOf<typeof RipplePaymentsConfig>;
export declare const RippleUnsignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
export declare type RippleUnsignedTransaction = t.TypeOf<typeof RippleUnsignedTransaction>;
export declare const RippleSignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    id: t.StringC;
}>]>;
export declare type RippleSignedTransaction = t.TypeOf<typeof RippleSignedTransaction>;
export declare const RippleTransactionInfo: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
}>]>, t.TypeC<{
    confirmationNumber: t.UnionC<[t.StringC, t.NullC]>;
}>]>;
export declare type RippleTransactionInfo = t.TypeOf<typeof RippleTransactionInfo>;
export declare const RippleBroadcastResult: t.IntersectionC<[t.TypeC<{
    id: t.StringC;
}>, t.TypeC<{
    rebroadcast: t.BooleanC;
    data: t.ObjectC;
}>]>;
export declare type RippleBroadcastResult = t.TypeOf<typeof RippleBroadcastResult>;
export declare const RippleCreateTransactionOptions: t.IntersectionC<[t.IntersectionC<[t.UnionC<[t.IntersectionC<[t.TypeC<{
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
    maxLedgerVersionOffset: t.NumberC;
}>]>;
export declare type RippleCreateTransactionOptions = t.TypeOf<typeof RippleCreateTransactionOptions>;
export declare type FromToWithPayport = FromTo & {
    fromPayport: Payport;
    toPayport: Payport;
};
export declare type RippleSignatory = {
    address: string;
    secret: string | KeyPair;
};
