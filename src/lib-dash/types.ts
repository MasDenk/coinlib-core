import * as t from 'io-ts'
import { BaseConfig, FeeRate, BaseTransactionInfo, BaseBroadcastResult, KeyPairsConfigParam } from '../lib-common'
import { extendCodec, enumCodec, requiredOptionalCodec, instanceofCodec } from '../ts-common'
import { Signer as BitcoinjsSigner } from 'bitcoinjs-lib'
import { bitcoinish } from '../lib-bitcoin'
import { PsbtInput, TransactionInput, TransactionOutput } from 'bip174/src/lib/interfaces'

export interface PsbtTxInput extends TransactionInput {
  hash: string | Buffer
}
export interface PsbtTxOutput extends TransactionOutput {
  address: string | undefined
}

export type BitcoinjsKeyPair = BitcoinjsSigner & {
  privateKey?: Buffer
  toWIF(): string
}

export interface PsbtInputData extends PsbtInput, TransactionInput {}

export enum AddressType {
  Legacy = 'p2pkh',
  MultisigLegacy = 'p2sh-p2ms',
}
export const AddressTypeT = enumCodec<AddressType>(AddressType, 'AddressType')

// For unclear reasons tsc throws TS4023 when this type is used in an external module.
// Re-exporting the codec cast to the inferred type helps fix this.
const SinglesigAddressTypeT = t.keyof(
  {
    [AddressType.Legacy]: null,
  },
  'SinglesigAddressType',
)
export type SinglesigAddressType = t.TypeOf<typeof SinglesigAddressTypeT>
export const SinglesigAddressType = SinglesigAddressTypeT as t.Type<SinglesigAddressType>

const MultisigAddressTypeT = t.keyof(
  {
    [AddressType.MultisigLegacy]: null,
  },
  'MultisigAddressType',
)
export type MultisigAddressType = t.TypeOf<typeof MultisigAddressTypeT>
export const MultisigAddressType = MultisigAddressTypeT as t.Type<MultisigAddressType>

export const BitcoinishTxOutput = t.type(
  {
    address: t.string,
    value: t.string,
  },
  'BitcoinishTxOutput',
)
export type BitcoinishTxOutput = t.TypeOf<typeof BitcoinishTxOutput>

export const DashBaseConfig = extendCodec(
  BaseConfig,
  {},
  {
    server: bitcoinish.BlockbookConfigServer,
    api: instanceofCodec(bitcoinish.BlockbookServerAPI),
  },
  'DashBaseConfig',
)
export type DashBaseConfig = t.TypeOf<typeof DashBaseConfig>

export const DashBalanceMonitorConfig = DashBaseConfig
export type DashBalanceMonitorConfig = DashBaseConfig

export const DashPaymentsUtilsConfig = extendCodec(
  DashBaseConfig,
  {},
  {
    blockcypherToken: t.string,
    feeLevelBlockTargets: bitcoinish.FeeLevelBlockTargets,
  },
  'DashPaymentsUtilsConfig',
)
export type DashPaymentsUtilsConfig = t.TypeOf<typeof DashPaymentsUtilsConfig>

export const BaseDashPaymentsConfig = extendCodec(
  DashPaymentsUtilsConfig,
  {},
  {
    minTxFee: FeeRate,
    dustThreshold: t.number,
    networkMinRelayFee: t.number,
    targetUtxoPoolSize: t.number, // # of available utxos to try and maintain
    minChange: t.string, // Soft minimum for each change generated to maintain utxo pool
    maximumFeeRate: t.number, // Hard sat/byte fee cap passed to Psbt constructor
  },
  'BaseDashPaymentsConfig',
)
export type BaseDashPaymentsConfig = t.TypeOf<typeof BaseDashPaymentsConfig>

export const HdDashPaymentsConfig = extendCodec(
  BaseDashPaymentsConfig,
  {
    hdKey: t.string,
  },
  {
    addressType: SinglesigAddressType,
    derivationPath: t.string,
  },
  'HdDashPaymentsConfig',
)
export type HdDashPaymentsConfig = t.TypeOf<typeof HdDashPaymentsConfig>

export const KeyPairDashPaymentsConfig = extendCodec(
  BaseDashPaymentsConfig,
  {
    keyPairs: KeyPairsConfigParam,
  },
  {
    addressType: SinglesigAddressType,
  },
  'KeyPairDashPaymentsConfig',
)
export type KeyPairDashPaymentsConfig = t.TypeOf<typeof KeyPairDashPaymentsConfig>

export const SinglesigDashPaymentsConfig = t.union(
  [HdDashPaymentsConfig, KeyPairDashPaymentsConfig],
  'SinglesigDashPaymentsConfig',
)
export type SinglesigDashPaymentsConfig = t.TypeOf<typeof SinglesigDashPaymentsConfig>

export const MultisigDashPaymentsConfig = extendCodec(
  BaseDashPaymentsConfig,
  {
    m: t.number,
    signers: t.array(SinglesigDashPaymentsConfig),
  },
  {
    addressType: MultisigAddressType,
  },
  'MultisigDashPaymentsConfig',
)
export type MultisigDashPaymentsConfig = t.TypeOf<typeof MultisigDashPaymentsConfig>

export const DashPaymentsConfig = t.union(
  [HdDashPaymentsConfig, KeyPairDashPaymentsConfig, MultisigDashPaymentsConfig],
  'DashPaymentsConfig',
)
export type DashPaymentsConfig = t.TypeOf<typeof DashPaymentsConfig>

export const DashUnsignedTransactionData = bitcoinish.BitcoinishPaymentTx
export type DashUnsignedTransactionData = t.TypeOf<typeof DashUnsignedTransactionData>

export const DashUnsignedTransaction = extendCodec(
  bitcoinish.BitcoinishUnsignedTransaction,
  {
    amount: t.string,
    fee: t.string,
    data: DashUnsignedTransactionData,
  },
  'DashUnsignedTransaction',
)
export type DashUnsignedTransaction = t.TypeOf<typeof DashUnsignedTransaction>

export const DashSignedTransactionData = requiredOptionalCodec(
  {
    hex: t.string,
  },
  {
    // true if `hex` is a partially signed transaction, false if it's finalized
    partial: t.boolean,
    // sha256 hash of the unsignedHex data for facilitating multisig tx combining
    unsignedTxHash: t.string,
    changeOutputs: t.array(BitcoinishTxOutput),
  },
  'DashSignedTransactionData',
)
export type DashSignedTransactionData = t.TypeOf<typeof DashSignedTransactionData>

export const DashSignedTransaction = extendCodec(
  bitcoinish.BitcoinishSignedTransaction,
  {
    data: DashSignedTransactionData,
  },
  'DashSignedTransaction',
)
export type DashSignedTransaction = t.TypeOf<typeof DashSignedTransaction>

export const DashTransactionInfo = extendCodec(BaseTransactionInfo, {}, {}, 'DashTransactionInfo')
export type DashTransactionInfo = t.TypeOf<typeof DashTransactionInfo>

export const DashBroadcastResult = extendCodec(BaseBroadcastResult, {}, {}, 'DashBroadcastResult')
export type DashBroadcastResult = t.TypeOf<typeof DashBroadcastResult>

export const DashBlock = bitcoinish.BlockInfoBitcoin
export type DashBlock = bitcoinish.BlockInfoBitcoin
