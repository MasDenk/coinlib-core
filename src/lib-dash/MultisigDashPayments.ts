import { BaseDashPayments } from './BaseDashPayments'
import {
  MultisigDashPaymentsConfig,
  HdDashPaymentsConfig,
  DashUnsignedTransaction,
  DashSignedTransaction,
  MultisigAddressType,
  AddressType,
} from './types'
import { omit } from 'lodash'
import { HdDashPayments } from './HdDashPayments'
import { KeyPairDashPayments } from './KeyPairDashPayments'
import * as bitcoin from 'bitcoinjs-lib'
import { CreateTransactionOptions, ResolveablePayport, PayportOutput } from '../lib-common'
import { bitcoinish } from '../lib-bitcoin'
import { getMultisigPaymentScript } from './helpers'
import { Numeric } from '../ts-common'
import { DEFAULT_MULTISIG_ADDRESS_TYPE } from './constants'

export class MultisigDashPayments extends BaseDashPayments<MultisigDashPaymentsConfig> {
  addressType: MultisigAddressType
  m: number
  signers: (HdDashPayments | KeyPairDashPayments)[]
  accountIdToSigner: { [accountId: string]: HdDashPayments | KeyPairDashPayments } = {}

  constructor(private config: MultisigDashPaymentsConfig) {
    super(config)
    this.addressType = config.addressType || DEFAULT_MULTISIG_ADDRESS_TYPE
    this.m = config.m
    this.signers = config.signers.map((signerConfig, i) => {
      signerConfig = {
        network: this.networkType,
        logger: this.logger,
        ...signerConfig,
      }
      if (signerConfig.network !== this.networkType) {
        throw new Error(
          `MultisigDashPayments is on network ${this.networkType} but signer config ${i} is on ${signerConfig.network}`,
        )
      }
      const payments = HdDashPaymentsConfig.is(signerConfig)
        ? new HdDashPayments(signerConfig)
        : new KeyPairDashPayments(signerConfig)

      payments.getAccountIds().forEach((accountId) => {
        this.accountIdToSigner[accountId] = payments
      })
      return payments
    })
  }

  getFullConfig(): MultisigDashPaymentsConfig {
    return {
      ...this.config,
      network: this.networkType,
      addressType: this.addressType,
    }
  }

  getPublicConfig(): MultisigDashPaymentsConfig {
    return {
      ...omit(this.getFullConfig(), ['logger', 'server', 'signers']),
      signers: this.signers.map((signer) => signer.getPublicConfig()),
    }
  }

  getEstimateTxSizeInputKey() {
    return `${this.addressType}:${this.m}-${this.signers.length}`
  }

  getAccountId(index: number): string {
    throw new Error('Multisig payments does not have single account for an index, use getAccountIds(index) instead')
  }

  getAccountIds(index?: number): string[] {
    return this.signers.reduce((result, signer) => [...result, ...signer.getAccountIds(index)], [] as string[])
  }

  getSignerPublicKeyBuffers(index: number): Buffer[] {
    return this.signers.map((signer) => signer.getKeyPair(index).publicKey)
  }

  getPaymentScript(index: number, addressType?: MultisigAddressType): bitcoin.payments.Payment {
    return getMultisigPaymentScript(
      this.bitcoinjsNetwork,
      addressType || this.addressType,
      this.getSignerPublicKeyBuffers(index),
      this.m,
    )
  }

  getAddress(index: number, addressType?: MultisigAddressType): string {
    const { address } = this.getPaymentScript(index, addressType)
    if (!address) {
      throw new Error('bitcoinjs-lib address derivation returned falsy value')
    }
    return address
  }

  async createTransaction(
    from: number,
    to: ResolveablePayport,
    amount: Numeric,
    options?: CreateTransactionOptions,
  ): Promise<DashUnsignedTransaction> {
    const tx = await super.createTransaction(from, to, amount, options)
    return {
      ...tx,
      multisigData: bitcoinish.createMultisigData(tx.inputUtxos!, this.signers, this.m),
    }
  }

  async createMultiOutputTransaction(
    from: number,
    to: PayportOutput[],
    options: CreateTransactionOptions = {},
  ): Promise<DashUnsignedTransaction> {
    const tx = await super.createMultiOutputTransaction(from, to, options)
    return {
      ...tx,
      multisigData: bitcoinish.createMultisigData(tx.inputUtxos!, this.signers, this.m),
    }
  }

  async createMultiInputTransaction(
    from: number[],
    to: PayportOutput[],
    options: CreateTransactionOptions = {},
  ): Promise<DashUnsignedTransaction> {
    const tx = await super.createMultiInputTransaction(from, to, options)
    return {
      ...tx,
      multisigData: bitcoinish.createMultisigData(tx.inputUtxos!, this.signers, this.m),
    }
  }

  async createSweepTransaction(
    from: number,
    to: ResolveablePayport,
    options: CreateTransactionOptions = {},
  ): Promise<DashUnsignedTransaction> {
    const tx = await super.createSweepTransaction(from, to, options)
    return {
      ...tx,
      multisigData: bitcoinish.createMultisigData(tx.inputUtxos!, this.signers, this.m),
    }
  }

  /**
   * Combines two of more partially signed transactions. Once the required # of signatures is reached (`m`)
   * the transaction is validated and finalized.
   */
  async combinePartiallySignedTransactions(txs: DashSignedTransaction[]): Promise<DashSignedTransaction> {
    const { baseTx, combinedPsbt, updatedMultisigData } = bitcoinish.preCombinePartiallySignedTransactions(
      txs,
      this.psbtOptions,
    )
    return bitcoinish.updateSignedMultisigTx(baseTx, combinedPsbt, updatedMultisigData)
  }

  async signTransaction(tx: DashUnsignedTransaction): Promise<DashSignedTransaction> {
    const partiallySignedTxs = await Promise.all(this.signers.map((signer) => signer.signTransaction(tx)))
    return this.combinePartiallySignedTransactions(partiallySignedTxs)
  }

  getSupportedAddressTypes(): AddressType[] {
    return [AddressType.MultisigLegacy]
  }
}

export default MultisigDashPayments
