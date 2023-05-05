import * as t from 'io-ts';
import { CreateTransactionOptions, FromTo, Payport } from '../lib-common';
import { Transaction as TronWebTransaction, TransactionInfo as TronWebTransactionInfo, Block as TronWebBlock } from 'tronweb';
export { TronWebTransaction, TronWebTransactionInfo, TronWebBlock, CreateTransactionOptions };
export declare type TransactionInfoRaw = TronWebTransaction & TronWebTransactionInfo & {
    currentBlock: Pick<TronWebBlock, 'blockID' | 'block_header'>;
};
export declare const BaseTronPaymentsConfig: t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.StringC;
    solidityNode: t.StringC;
    eventServer: t.StringC;
}>]>;
export declare type BaseTronPaymentsConfig = t.TypeOf<typeof BaseTronPaymentsConfig>;
export declare const HdTronPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.StringC;
    solidityNode: t.StringC;
    eventServer: t.StringC;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>;
export declare type HdTronPaymentsConfig = t.TypeOf<typeof HdTronPaymentsConfig>;
export declare const KeyPairTronPaymentsConfig: t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.StringC;
    solidityNode: t.StringC;
    eventServer: t.StringC;
}>]>, t.TypeC<{
    keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
}>]>;
export declare type KeyPairTronPaymentsConfig = t.TypeOf<typeof KeyPairTronPaymentsConfig>;
export declare const TronPaymentsConfig: t.UnionC<[t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.StringC;
    solidityNode: t.StringC;
    eventServer: t.StringC;
}>]>, t.TypeC<{
    hdKey: t.StringC;
}>]>, t.IntersectionC<[t.IntersectionC<[t.PartialC<{
    network: t.Type<import("../lib-common").NetworkType, import("../lib-common").NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>, t.PartialC<{
    fullNode: t.StringC;
    solidityNode: t.StringC;
    eventServer: t.StringC;
}>]>, t.TypeC<{
    keyPairs: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
}>]>]>;
export declare type TronPaymentsConfig = t.TypeOf<typeof TronPaymentsConfig>;
export declare const TronUnsignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
    id: t.StringC;
    amount: t.StringC;
    fee: t.StringC;
}>]>;
export declare type TronUnsignedTransaction = t.TypeOf<typeof TronUnsignedTransaction>;
export declare const TronSignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
}>]>;
export declare type TronSignedTransaction = t.TypeOf<typeof TronSignedTransaction>;
export declare const TronTransactionInfo: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
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
export declare type TronTransactionInfo = t.TypeOf<typeof TronTransactionInfo>;
export declare const TronBroadcastResult: t.IntersectionC<[t.TypeC<{
    id: t.StringC;
}>, t.TypeC<{
    rebroadcast: t.BooleanC;
}>]>;
export declare type TronBroadcastResult = t.TypeOf<typeof TronBroadcastResult>;
export declare type FromToWithPayport = FromTo & {
    fromPayport: Payport;
    toPayport: Payport;
};
