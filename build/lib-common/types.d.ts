import * as t from 'io-ts';
export declare type MaybePromise<T> = Promise<T> | T;
export declare const NullableOptionalString: t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>;
export declare type NullableOptionalString = t.TypeOf<typeof NullableOptionalString>;
export declare enum NetworkType {
    Mainnet = "mainnet",
    Testnet = "testnet"
}
export declare const NetworkTypeT: t.Type<NetworkType, NetworkType, unknown>;
export declare const BaseConfig: t.PartialC<{
    network: t.Type<NetworkType, NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>;
export declare type BaseConfig = t.TypeOf<typeof BaseConfig>;
export declare const KeyPairsConfigParam: t.UnionC<[t.ArrayC<t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>, t.RecordC<t.NumberC, t.UnionC<[t.StringC, t.NullC, t.UndefinedC]>>]>;
export declare type KeyPairsConfigParam = t.TypeOf<typeof KeyPairsConfigParam>;
export declare const Payport: t.IntersectionC<[t.TypeC<{
    address: t.StringC;
}>, t.PartialC<{
    extraId: t.UnionC<[t.StringC, t.NullC]>;
    signerAddress: t.StringC;
}>]>;
export declare type Payport = t.TypeOf<typeof Payport>;
export declare const DerivablePayport: t.IntersectionC<[t.TypeC<{
    index: t.NumberC;
}>, t.PartialC<{
    addressType: t.StringC;
}>]>;
export declare type DerivablePayport = t.TypeOf<typeof DerivablePayport>;
export declare const ResolveablePayport: t.UnionC<[t.IntersectionC<[t.TypeC<{
    address: t.StringC;
}>, t.PartialC<{
    extraId: t.UnionC<[t.StringC, t.NullC]>;
    signerAddress: t.StringC;
}>]>, t.IntersectionC<[t.TypeC<{
    index: t.NumberC;
}>, t.PartialC<{
    addressType: t.StringC;
}>]>, t.StringC, t.NumberC]>;
export declare type ResolveablePayport = t.TypeOf<typeof ResolveablePayport>;
export declare const PayportOutput: t.TypeC<{
    payport: t.UnionC<[t.IntersectionC<[t.TypeC<{
        address: t.StringC;
    }>, t.PartialC<{
        extraId: t.UnionC<[t.StringC, t.NullC]>;
        signerAddress: t.StringC;
    }>]>, t.IntersectionC<[t.TypeC<{
        index: t.NumberC;
    }>, t.PartialC<{
        addressType: t.StringC;
    }>]>, t.StringC, t.NumberC]>;
    amount: t.UnionC<[t.StringC, t.NumberC, import("../ts-common").BigNumberC]>;
}>;
export declare type PayportOutput = t.TypeOf<typeof PayportOutput>;
export declare enum FeeLevel {
    Custom = "custom",
    Low = "low",
    Medium = "medium",
    High = "high"
}
export declare const FeeLevelT: t.Type<FeeLevel, FeeLevel, unknown>;
export declare const AutoFeeLevels: t.UnionC<[t.LiteralC<FeeLevel.Low>, t.LiteralC<FeeLevel.Medium>, t.LiteralC<FeeLevel.High>]>;
export declare type AutoFeeLevels = t.TypeOf<typeof AutoFeeLevels>;
export declare enum FeeRateType {
    Main = "main",
    Base = "base",
    BasePerWeight = "base/weight"
}
export declare const FeeRateTypeT: t.Type<FeeRateType, FeeRateType, unknown>;
export declare const FeeRate: t.TypeC<{
    feeRate: t.StringC;
    feeRateType: t.Type<FeeRateType, FeeRateType, unknown>;
}>;
export declare type FeeRate = t.TypeOf<typeof FeeRate>;
export declare const FeeOptionCustom: t.IntersectionC<[t.TypeC<{
    feeRate: t.StringC;
    feeRateType: t.Type<FeeRateType, FeeRateType, unknown>;
}>, t.PartialC<{
    feeLevel: t.LiteralC<FeeLevel.Custom>;
}>]>;
export declare type FeeOptionCustom = t.TypeOf<typeof FeeOptionCustom>;
export declare const FeeOptionLevel: t.PartialC<{
    feeLevel: t.UnionC<[t.LiteralC<FeeLevel.High>, t.LiteralC<FeeLevel.Medium>, t.LiteralC<FeeLevel.Low>]>;
}>;
export declare type FeeOptionLevel = t.TypeOf<typeof FeeOptionLevel>;
export declare const FeeOption: t.UnionC<[t.IntersectionC<[t.TypeC<{
    feeRate: t.StringC;
    feeRateType: t.Type<FeeRateType, FeeRateType, unknown>;
}>, t.PartialC<{
    feeLevel: t.LiteralC<FeeLevel.Custom>;
}>]>, t.PartialC<{
    feeLevel: t.UnionC<[t.LiteralC<FeeLevel.High>, t.LiteralC<FeeLevel.Medium>, t.LiteralC<FeeLevel.Low>]>;
}>]>;
export declare type FeeOption = t.TypeOf<typeof FeeOption>;
export declare const UtxoInfo: t.IntersectionC<[t.TypeC<{
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
}>]>;
export declare type UtxoInfo = t.TypeOf<typeof UtxoInfo>;
export declare const WeightedChangeOutput: t.TypeC<{
    address: t.StringC;
    weight: t.NumberC;
}>;
export declare type WeightedChangeOutput = t.TypeOf<typeof WeightedChangeOutput>;
export declare type FilterChangeAddresses = (addresses: string[]) => Promise<string[]>;
export declare const FilterChangeAddresses: import("../ts-common").FunctionC<FilterChangeAddresses>;
/** Callback should return any known tx data hex strings (useful for caching) */
export declare type LookupTxDataByHashes = (txHashes: string[]) => Promise<{
    [hash: string]: string;
}>;
export declare const LookupTxDataByHashes: import("../ts-common").FunctionC<LookupTxDataByHashes>;
export declare const CreateTransactionOptions: t.IntersectionC<[t.UnionC<[t.IntersectionC<[t.TypeC<{
    feeRate: t.StringC;
    feeRateType: t.Type<FeeRateType, FeeRateType, unknown>;
}>, t.PartialC<{
    feeLevel: t.LiteralC<FeeLevel.Custom>;
}>]>, t.PartialC<{
    feeLevel: t.UnionC<[t.LiteralC<FeeLevel.High>, t.LiteralC<FeeLevel.Medium>, t.LiteralC<FeeLevel.Low>]>;
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
    lookupTxDataByHashes: import("../ts-common").FunctionC<LookupTxDataByHashes>;
}>]>;
export declare type CreateTransactionOptions = t.TypeOf<typeof CreateTransactionOptions>;
export declare const GetTransactionInfoOptions: t.PartialC<{
    changeAddress: t.UnionC<[t.StringC, t.ArrayC<t.StringC>]>;
    filterChangeAddresses: import("../ts-common").FunctionC<FilterChangeAddresses>;
}>;
export declare type GetTransactionInfoOptions = t.TypeOf<typeof GetTransactionInfoOptions>;
export declare const GetPayportOptions: t.PartialC<{}>;
export declare type GetPayportOptions = t.TypeOf<typeof GetPayportOptions>;
export declare const ResolvedFeeOption: t.TypeC<{
    targetFeeLevel: t.Type<FeeLevel, FeeLevel, unknown>;
    targetFeeRate: t.StringC;
    targetFeeRateType: t.Type<FeeRateType, FeeRateType, unknown>;
    feeBase: t.StringC;
    feeMain: t.StringC;
}>;
export declare type ResolvedFeeOption = t.TypeOf<typeof ResolvedFeeOption>;
export declare const BalanceResult: t.IntersectionC<[t.TypeC<{
    confirmedBalance: t.StringC;
    unconfirmedBalance: t.StringC;
    spendableBalance: t.StringC;
    requiresActivation: t.BooleanC;
    sweepable: t.BooleanC;
}>, t.PartialC<{
    minimumBalance: t.StringC;
}>]>;
export declare type BalanceResult = t.TypeOf<typeof BalanceResult>;
export declare enum TransactionStatus {
    Unsigned = "unsigned",
    Signed = "signed",
    Pending = "pending",
    Confirmed = "confirmed",
    Failed = "failed"
}
export declare const TransactionStatusT: t.Type<TransactionStatus, TransactionStatus, unknown>;
export declare const TransactionOutput: t.IntersectionC<[t.TypeC<{
    address: t.StringC;
    value: t.StringC;
}>, t.PartialC<{
    extraId: t.UnionC<[t.StringC, t.NullC]>;
}>]>;
export declare type TransactionOutput = t.TypeOf<typeof TransactionOutput>;
export declare const TransactionCommon: t.IntersectionC<[t.TypeC<{
    status: t.Type<TransactionStatus, TransactionStatus, unknown>;
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
}>]>;
export declare type TransactionCommon = t.TypeOf<typeof TransactionCommon>;
export declare const BaseMultisigData: t.TypeC<{
    m: t.NumberC;
    accountIds: t.ArrayC<t.StringC>;
    publicKeys: t.ArrayC<t.StringC>;
    signedAccountIds: t.ArrayC<t.StringC>;
}>;
export declare type BaseMultisigData = t.TypeOf<typeof BaseMultisigData>;
export declare const AddressMultisigData: t.IntersectionC<[t.TypeC<{
    m: t.NumberC;
    accountIds: t.ArrayC<t.StringC>;
    publicKeys: t.ArrayC<t.StringC>;
    signedAccountIds: t.ArrayC<t.StringC>;
}>, t.TypeC<{
    signerIndex: t.NumberC;
    inputIndices: t.ArrayC<t.NumberC>;
}>]>;
export declare type AddressMultisigData = t.TypeOf<typeof AddressMultisigData>;
export declare const MultiInputMultisigData: t.RecordC<t.StringC, t.IntersectionC<[t.TypeC<{
    m: t.NumberC;
    accountIds: t.ArrayC<t.StringC>;
    publicKeys: t.ArrayC<t.StringC>;
    signedAccountIds: t.ArrayC<t.StringC>;
}>, t.TypeC<{
    signerIndex: t.NumberC;
    inputIndices: t.ArrayC<t.NumberC>;
}>]>>;
export declare type MultiInputMultisigData = t.TypeOf<typeof MultiInputMultisigData>;
export declare const MultisigData: t.UnionC<[t.TypeC<{
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
export declare type MultisigData = t.TypeOf<typeof MultisigData>;
export declare const BaseUnsignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    status: t.Type<TransactionStatus, TransactionStatus, unknown>;
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
    targetFeeLevel: t.Type<FeeLevel, FeeLevel, unknown>;
    targetFeeRate: t.UnionC<[t.StringC, t.NullC]>;
    targetFeeRateType: t.UnionC<[t.Type<FeeRateType, FeeRateType, unknown>, t.NullC]>;
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
    status: t.LiteralC<TransactionStatus.Unsigned>;
    data: t.ObjectC;
}>]>;
export declare type BaseUnsignedTransaction = t.TypeOf<typeof BaseUnsignedTransaction>;
export declare const BaseSignedTransaction: t.IntersectionC<[t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    status: t.Type<TransactionStatus, TransactionStatus, unknown>;
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
    targetFeeLevel: t.Type<FeeLevel, FeeLevel, unknown>;
    targetFeeRate: t.UnionC<[t.StringC, t.NullC]>;
    targetFeeRateType: t.UnionC<[t.Type<FeeRateType, FeeRateType, unknown>, t.NullC]>;
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
    status: t.LiteralC<TransactionStatus.Signed>;
    id: t.StringC;
    amount: t.StringC;
    fee: t.StringC;
    data: t.ObjectC;
}>]>;
export declare type BaseSignedTransaction = t.TypeOf<typeof BaseSignedTransaction>;
export declare const BaseTransactionInfo: t.IntersectionC<[t.IntersectionC<[t.TypeC<{
    status: t.Type<TransactionStatus, TransactionStatus, unknown>;
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
export declare type BaseTransactionInfo = t.TypeOf<typeof BaseTransactionInfo>;
export declare const BaseBroadcastResult: t.TypeC<{
    id: t.StringC;
}>;
export declare type BaseBroadcastResult = t.TypeOf<typeof BaseBroadcastResult>;
export declare const BalanceActivityType: t.UnionC<[t.LiteralC<"in">, t.LiteralC<"out">, t.LiteralC<"fee">]>;
export declare type BalanceActivityType = t.TypeOf<typeof BalanceActivityType>;
export declare const BalanceActivity: t.IntersectionC<[t.TypeC<{
    type: t.UnionC<[t.LiteralC<"in">, t.LiteralC<"out">, t.LiteralC<"fee">]>;
    networkType: t.Type<NetworkType, NetworkType, unknown>;
    networkSymbol: t.StringC;
    assetSymbol: t.StringC;
    address: t.StringC;
    extraId: t.UnionC<[t.StringC, t.NullC]>;
    amount: t.StringC;
    externalId: t.StringC;
    activitySequence: t.StringC;
    confirmationId: t.StringC;
    confirmationNumber: t.UnionC<[t.StringC, t.NumberC]>;
    timestamp: import("../ts-common").DateC;
}>, t.PartialC<{
    confirmations: t.NumberC;
    utxosSpent: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
    utxosCreated: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
    tokenAddress: t.StringC;
}>]>;
export declare type BalanceActivity = t.TypeOf<typeof BalanceActivity>;
export declare const BalanceMonitorConfig: t.PartialC<{
    network: t.Type<NetworkType, NetworkType, unknown>;
    logger: import("../ts-common").LoggerC;
}>;
export declare type BalanceMonitorConfig = t.TypeOf<typeof BalanceMonitorConfig>;
export declare const GetBalanceActivityOptions: t.PartialC<{
    from: t.UnionC<[t.UnionC<[t.StringC, t.NumberC, import("../ts-common").BigNumberC]>, t.IntersectionC<[t.TypeC<{
        type: t.UnionC<[t.LiteralC<"in">, t.LiteralC<"out">, t.LiteralC<"fee">]>;
        networkType: t.Type<NetworkType, NetworkType, unknown>;
        networkSymbol: t.StringC;
        assetSymbol: t.StringC;
        address: t.StringC;
        extraId: t.UnionC<[t.StringC, t.NullC]>;
        amount: t.StringC;
        externalId: t.StringC;
        activitySequence: t.StringC;
        confirmationId: t.StringC;
        confirmationNumber: t.UnionC<[t.StringC, t.NumberC]>;
        timestamp: import("../ts-common").DateC;
    }>, t.PartialC<{
        confirmations: t.NumberC;
        utxosSpent: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
        utxosCreated: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
        tokenAddress: t.StringC;
    }>]>]>;
    to: t.UnionC<[t.UnionC<[t.StringC, t.NumberC, import("../ts-common").BigNumberC]>, t.IntersectionC<[t.TypeC<{
        type: t.UnionC<[t.LiteralC<"in">, t.LiteralC<"out">, t.LiteralC<"fee">]>;
        networkType: t.Type<NetworkType, NetworkType, unknown>;
        networkSymbol: t.StringC;
        assetSymbol: t.StringC;
        address: t.StringC;
        extraId: t.UnionC<[t.StringC, t.NullC]>;
        amount: t.StringC;
        externalId: t.StringC;
        activitySequence: t.StringC;
        confirmationId: t.StringC;
        confirmationNumber: t.UnionC<[t.StringC, t.NumberC]>;
        timestamp: import("../ts-common").DateC;
    }>, t.PartialC<{
        confirmations: t.NumberC;
        utxosSpent: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
        utxosCreated: t.ArrayC<t.IntersectionC<[t.TypeC<{
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
        tokenAddress: t.StringC;
    }>]>]>;
}>;
export declare type GetBalanceActivityOptions = t.TypeOf<typeof GetBalanceActivityOptions>;
export declare type BalanceActivityCallback = (ba: BalanceActivity[], rawTx?: any) => Promise<void> | void;
export declare const BalanceActivityCallback: import("../ts-common").FunctionC<BalanceActivityCallback>;
export declare type NewBlockCallback = (b: {
    height: number;
    hash: string;
}) => Promise<void> | void;
export declare const NewBlockCallback: import("../ts-common").FunctionC<NewBlockCallback>;
export declare type FromTo = Pick<BaseUnsignedTransaction, 'fromAddress' | 'fromIndex' | 'fromExtraId' | 'toAddress' | 'toIndex' | 'toExtraId'> & {
    fromPayport: Payport;
    toPayport: Payport;
};
export declare const RetrieveBalanceActivitiesResult: t.TypeC<{
    from: t.StringC;
    to: t.StringC;
}>;
export declare type RetrieveBalanceActivitiesResult = t.TypeOf<typeof RetrieveBalanceActivitiesResult>;
export declare const BlockInfo: t.IntersectionC<[t.TypeC<{
    id: t.StringC;
    height: t.NumberC;
    time: import("../ts-common").DateC;
}>, t.PartialC<{
    previousId: t.StringC;
    raw: t.ObjectC;
}>]>;
export declare type BlockInfo = t.TypeOf<typeof BlockInfo>;
export declare type FilterBlockAddressesBlockInfo = BlockInfo & {
    page: number;
};
export declare type FilterBlockAddressesCallback = (addresses: string[], blockInfo: FilterBlockAddressesBlockInfo) => string[] | Promise<string[]>;
export declare const GetFeeRecommendationOptions: t.PartialC<{
    source: t.StringC;
}>;
export declare type GetFeeRecommendationOptions = t.TypeOf<typeof GetFeeRecommendationOptions>;
export declare type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
