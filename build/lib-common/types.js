"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFeeRecommendationOptions = exports.BlockInfo = exports.RetrieveBalanceActivitiesResult = exports.NewBlockCallback = exports.BalanceActivityCallback = exports.GetBalanceActivityOptions = exports.BalanceMonitorConfig = exports.BalanceActivity = exports.BalanceActivityType = exports.BaseBroadcastResult = exports.BaseTransactionInfo = exports.BaseSignedTransaction = exports.BaseUnsignedTransaction = exports.MultisigData = exports.MultiInputMultisigData = exports.AddressMultisigData = exports.BaseMultisigData = exports.TransactionCommon = exports.TransactionOutput = exports.TransactionStatusT = exports.TransactionStatus = exports.BalanceResult = exports.ResolvedFeeOption = exports.GetPayportOptions = exports.GetTransactionInfoOptions = exports.CreateTransactionOptions = exports.LookupTxDataByHashes = exports.FilterChangeAddresses = exports.WeightedChangeOutput = exports.UtxoInfo = exports.FeeOption = exports.FeeOptionLevel = exports.FeeOptionCustom = exports.FeeRate = exports.FeeRateTypeT = exports.FeeRateType = exports.AutoFeeLevels = exports.FeeLevelT = exports.FeeLevel = exports.PayportOutput = exports.ResolveablePayport = exports.DerivablePayport = exports.Payport = exports.KeyPairsConfigParam = exports.BaseConfig = exports.NetworkTypeT = exports.NetworkType = exports.NullableOptionalString = void 0;
const t = __importStar(require("io-ts"));
const ts_common_1 = require("../ts-common");
exports.NullableOptionalString = t.union([t.string, t.null, t.undefined]);
var NetworkType;
(function (NetworkType) {
    NetworkType["Mainnet"] = "mainnet";
    NetworkType["Testnet"] = "testnet";
})(NetworkType = exports.NetworkType || (exports.NetworkType = {}));
exports.NetworkTypeT = (0, ts_common_1.enumCodec)(NetworkType, 'NetworkType');
exports.BaseConfig = t.partial({
    network: exports.NetworkTypeT,
    logger: ts_common_1.Logger,
}, 'BaseConfig');
exports.KeyPairsConfigParam = t.union([t.array(exports.NullableOptionalString), t.record(t.number, exports.NullableOptionalString)], 'KeyPairsConfigParam');
exports.Payport = (0, ts_common_1.requiredOptionalCodec)({
    address: t.string,
}, {
    extraId: (0, ts_common_1.nullable)(t.string),
    signerAddress: t.string,
}, 'Payport');
exports.DerivablePayport = (0, ts_common_1.requiredOptionalCodec)({
    index: t.number,
}, {
    addressType: t.string, // enum for each coin payments
}, 'DerivablePayport');
exports.ResolveablePayport = t.union([exports.Payport, exports.DerivablePayport, t.string, t.number], 'ResolveablePayport');
exports.PayportOutput = t.type({
    payport: exports.ResolveablePayport,
    amount: ts_common_1.Numeric,
}, 'PayportOutput');
var FeeLevel;
(function (FeeLevel) {
    FeeLevel["Custom"] = "custom";
    FeeLevel["Low"] = "low";
    FeeLevel["Medium"] = "medium";
    FeeLevel["High"] = "high";
})(FeeLevel = exports.FeeLevel || (exports.FeeLevel = {}));
exports.FeeLevelT = (0, ts_common_1.enumCodec)(FeeLevel, 'FeeLevel');
exports.AutoFeeLevels = t.union([t.literal(FeeLevel.Low), t.literal(FeeLevel.Medium), t.literal(FeeLevel.High)], 'AutoFeeLevels');
var FeeRateType;
(function (FeeRateType) {
    FeeRateType["Main"] = "main";
    FeeRateType["Base"] = "base";
    FeeRateType["BasePerWeight"] = "base/weight";
})(FeeRateType = exports.FeeRateType || (exports.FeeRateType = {}));
exports.FeeRateTypeT = (0, ts_common_1.enumCodec)(FeeRateType, 'FeeRateType');
exports.FeeRate = t.type({
    feeRate: t.string,
    feeRateType: exports.FeeRateTypeT,
}, 'FeeRate');
exports.FeeOptionCustom = (0, ts_common_1.extendCodec)(exports.FeeRate, {}, {
    feeLevel: t.literal(FeeLevel.Custom),
}, 'FeeOptionCustom');
exports.FeeOptionLevel = t.partial({
    feeLevel: t.union([t.literal(FeeLevel.High), t.literal(FeeLevel.Medium), t.literal(FeeLevel.Low)]),
}, 'FeeOptionLevel');
exports.FeeOption = t.union([exports.FeeOptionCustom, exports.FeeOptionLevel], 'FeeOption');
exports.UtxoInfo = (0, ts_common_1.requiredOptionalCodec)({
    txid: t.string,
    vout: t.number,
    value: t.string, // main denomination
}, {
    satoshis: t.union([t.number, t.string]),
    confirmations: t.number,
    height: t.string,
    lockTime: t.string,
    coinbase: t.boolean,
    txHex: t.string,
    scriptPubKeyHex: t.string,
    address: t.string,
    spent: t.boolean,
    signer: t.number, // signing account address or index relative to accountId
}, 'UtxoInfo');
exports.WeightedChangeOutput = t.type({
    address: t.string,
    weight: t.number,
}, 'WeightedChangeOutput');
exports.FilterChangeAddresses = (0, ts_common_1.functionT)('FilterChangeAddresses');
exports.LookupTxDataByHashes = (0, ts_common_1.functionT)('LookupTxDataByHash');
exports.CreateTransactionOptions = (0, ts_common_1.extendCodec)(exports.FeeOption, {}, {
    sequenceNumber: ts_common_1.Numeric,
    payportBalance: ts_common_1.Numeric,
    forcedUtxos: t.array(exports.UtxoInfo),
    availableUtxos: t.array(exports.UtxoInfo),
    useAllUtxos: t.boolean,
    useUnconfirmedUtxos: t.boolean,
    recipientPaysFee: t.boolean,
    maxFeePercent: ts_common_1.Numeric,
    changeAddress: t.union([t.string, t.array(t.string)]),
    lookupTxDataByHashes: exports.LookupTxDataByHashes, // Callback to retrieve cached raw tx data for input hashes for psbt building
}, 'CreateTransactionOptions');
exports.GetTransactionInfoOptions = t.partial({
    changeAddress: t.union([t.string, t.array(t.string)]),
    filterChangeAddresses: exports.FilterChangeAddresses, // Callback to filter out any change addresses from address list
});
exports.GetPayportOptions = t.partial({}, 'GetPayportOptions');
exports.ResolvedFeeOption = t.type({
    targetFeeLevel: exports.FeeLevelT,
    targetFeeRate: t.string,
    targetFeeRateType: exports.FeeRateTypeT,
    feeBase: t.string,
    feeMain: t.string,
}, 'ResolvedFeeOption');
exports.BalanceResult = (0, ts_common_1.requiredOptionalCodec)({
    confirmedBalance: t.string,
    unconfirmedBalance: t.string,
    spendableBalance: t.string,
    requiresActivation: t.boolean,
    sweepable: t.boolean, // balance is high enough to be swept
}, {
    minimumBalance: t.string,
}, 'BalanceResult');
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Unsigned"] = "unsigned";
    TransactionStatus["Signed"] = "signed";
    TransactionStatus["Pending"] = "pending";
    TransactionStatus["Confirmed"] = "confirmed";
    TransactionStatus["Failed"] = "failed";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
exports.TransactionStatusT = (0, ts_common_1.enumCodec)(TransactionStatus, 'TransactionStatus');
exports.TransactionOutput = (0, ts_common_1.requiredOptionalCodec)({
    address: t.string,
    value: t.string,
}, {
    extraId: (0, ts_common_1.nullable)(t.string),
}, 'TransactionOutput');
exports.TransactionCommon = (0, ts_common_1.requiredOptionalCodec)({
    status: exports.TransactionStatusT,
    id: (0, ts_common_1.nullable)(t.string),
    fromAddress: (0, ts_common_1.nullable)(t.string),
    toAddress: (0, ts_common_1.nullable)(t.string),
    fromIndex: (0, ts_common_1.nullable)(t.number),
    toIndex: (0, ts_common_1.nullable)(t.number),
    amount: (0, ts_common_1.nullable)(t.string),
    fee: (0, ts_common_1.nullable)(t.string), // total fee in main denomination
}, {
    fromExtraId: (0, ts_common_1.nullable)(t.string),
    toExtraId: (0, ts_common_1.nullable)(t.string),
    sequenceNumber: (0, ts_common_1.nullable)(t.union([t.string, t.number])),
    inputUtxos: t.array(exports.UtxoInfo),
    outputUtxos: t.array(exports.UtxoInfo),
    externalOutputs: t.array(exports.TransactionOutput),
    weight: t.number,
    chainId: t.string,
}, 'TransactionCommon');
exports.BaseMultisigData = t.type({
    m: t.number,
    // Parallel arrays
    accountIds: t.array(t.string),
    publicKeys: t.array(t.string),
    // Accounts that have already signed (not parallel)
    signedAccountIds: t.array(t.string),
}, 'BitcoinMultisigData');
exports.AddressMultisigData = (0, ts_common_1.extendCodec)(exports.BaseMultisigData, {
    signerIndex: t.number,
    inputIndices: t.array(t.number),
}, 'AddressMultisigData');
exports.MultiInputMultisigData = t.record(t.string, exports.AddressMultisigData, 'MultiInputMultisigData');
exports.MultisigData = t.union([exports.BaseMultisigData, exports.MultiInputMultisigData]);
const UnsignedCommon = (0, ts_common_1.extendCodec)(exports.TransactionCommon, {
    fromAddress: t.string,
    toAddress: t.string,
    fromIndex: (0, ts_common_1.nullable)(t.number),
    targetFeeLevel: exports.FeeLevelT,
    targetFeeRate: (0, ts_common_1.nullable)(t.string),
    targetFeeRateType: (0, ts_common_1.nullable)(exports.FeeRateTypeT), // fee rate type requested upon creation
}, {
    multisigData: exports.MultisigData,
}, 'UnsignedCommon');
exports.BaseUnsignedTransaction = (0, ts_common_1.extendCodec)(UnsignedCommon, {
    status: t.literal(TransactionStatus.Unsigned),
    data: t.object,
}, 'BaseUnsignedTransaction');
exports.BaseSignedTransaction = (0, ts_common_1.extendCodec)(UnsignedCommon, {
    status: t.literal(TransactionStatus.Signed),
    id: t.string,
    amount: t.string,
    fee: t.string,
    data: t.object,
}, 'BaseSignedTransaction');
exports.BaseTransactionInfo = (0, ts_common_1.extendCodec)(exports.TransactionCommon, {
    id: t.string,
    amount: t.string,
    fee: t.string,
    isExecuted: t.boolean,
    isConfirmed: t.boolean,
    confirmations: t.number,
    confirmationId: (0, ts_common_1.nullable)(t.string),
    confirmationTimestamp: (0, ts_common_1.nullable)(ts_common_1.DateT),
    data: t.object,
}, {
    currentBlockNumber: t.union([t.string, t.number]),
    confirmationNumber: t.union([t.string, t.number]), // eg block number in which tx was included
}, 'BaseTransactionInfo');
exports.BaseBroadcastResult = t.type({
    id: t.string,
}, 'BaseBroadcastResult');
exports.BalanceActivityType = t.union([t.literal('in'), t.literal('out'), t.literal('fee')], 'BalanceActivityType');
exports.BalanceActivity = (0, ts_common_1.requiredOptionalCodec)({
    type: exports.BalanceActivityType,
    networkType: exports.NetworkTypeT,
    networkSymbol: t.string,
    assetSymbol: t.string,
    address: t.string,
    extraId: (0, ts_common_1.nullable)(t.string),
    amount: t.string,
    externalId: t.string,
    activitySequence: t.string,
    confirmationId: t.string,
    confirmationNumber: t.union([t.string, t.number]),
    timestamp: ts_common_1.DateT,
}, {
    confirmations: t.number,
    // Utxos spent in this transaction applicable to the address
    utxosSpent: t.array(exports.UtxoInfo),
    // Utxos create in this transaction applicable to the address
    utxosCreated: t.array(exports.UtxoInfo),
    tokenAddress: t.string,
}, 'BalanceActivity');
exports.BalanceMonitorConfig = exports.BaseConfig;
exports.GetBalanceActivityOptions = t.partial({
    from: t.union([ts_common_1.Numeric, exports.BalanceActivity]),
    to: t.union([ts_common_1.Numeric, exports.BalanceActivity]),
}, 'GetBalanceActivityOptions');
exports.BalanceActivityCallback = (0, ts_common_1.functionT)('BalanceActivityCallback');
exports.NewBlockCallback = (0, ts_common_1.functionT)('NewBlockCallback');
exports.RetrieveBalanceActivitiesResult = t.type({
    from: t.string,
    to: t.string,
}, 'RetrieveBalanceActivitiesResult');
exports.BlockInfo = (0, ts_common_1.requiredOptionalCodec)({
    id: t.string,
    height: t.number,
    time: ts_common_1.DateT,
}, {
    previousId: t.string,
    raw: t.object,
}, 'BlockInfo');
exports.GetFeeRecommendationOptions = t.partial({
    source: t.string, // ie blockbook, blockcypher, ethgasstation, etc
}, 'GetFeeRecommendationOptions');
//# sourceMappingURL=types.js.map