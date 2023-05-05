import {
  PaymentsUtils,
  Payport,
  createUnitConverters,
  AutoFeeLevels,
  FeeRate,
  UtxoInfo,
  BalanceResult,
  TransactionStatus,
  TransactionOutput,
  BlockInfo,
  GetFeeRecommendationOptions,
  GetTransactionInfoOptions,
  BigNumber,
  limiter,
} from '../../lib-common'
import { isNil, assertType, Numeric, isUndefined } from '../../ts-common'
import { GetBlockOptions } from 'blockbook-client'

import { DEFAULT_FEE_LEVEL_BLOCK_TARGETS } from './constants'
import { BlockbookConnected } from './BlockbookConnected'
import {
  BitcoinishPaymentsUtilsConfig,
  BitcoinishTransactionInfo,
  BitcoinjsNetwork,
  FeeLevelBlockTargets,
  NormalizedTxBitcoin,
  NormalizedTxBitcoinVout,
} from './types'
import { getBlockbookFeeRecommendation, getBlockcypherFeeRecommendation } from './utils'

type UnitConverters = ReturnType<typeof createUnitConverters>

export abstract class BitcoinishPaymentsUtils extends BlockbookConnected implements PaymentsUtils {
  readonly coinSymbol: string
  readonly coinName: string
  readonly coinDecimals: number
  readonly bitcoinjsNetwork: BitcoinjsNetwork
  readonly networkMinRelayFee: number // base denom
  readonly blockcypherToken?: string
  feeLevelBlockTargets: FeeLevelBlockTargets

  constructor(config: BitcoinishPaymentsUtilsConfig) {
    super(config)
    this.coinSymbol = config.coinSymbol
    this.coinName = config.coinName
    this.coinDecimals = config.coinDecimals
    this.bitcoinjsNetwork = config.bitcoinjsNetwork
    this.networkMinRelayFee = config.networkMinRelayFee
    this.feeLevelBlockTargets = config.feeLevelBlockTargets ?? DEFAULT_FEE_LEVEL_BLOCK_TARGETS
    this.blockcypherToken = config.blockcypherToken

    const unitConverters = createUnitConverters(this.coinDecimals)
    this.toMainDenominationString = unitConverters.toMainDenominationString
    this.toMainDenominationNumber = unitConverters.toMainDenominationNumber
    this.toMainDenominationBigNumber = unitConverters.toMainDenominationBigNumber
    this.toBaseDenominationString = unitConverters.toBaseDenominationString
    this.toBaseDenominationNumber = unitConverters.toBaseDenominationNumber
    this.toBaseDenominationBigNumber = unitConverters.toBaseDenominationBigNumber
  }

  isValidExtraId(extraId: string): boolean {
    return false // utxo coins don't use extraIds
  }

  abstract isValidAddress<O extends { format?: string }>(address: string, options?: O): boolean
  abstract standardizeAddress<O extends { format?: string }>(address: string, options?: O): string | null

  async getBlockcypherFeeRecommendation(feeLevel: AutoFeeLevels): Promise<FeeRate> {
    return getBlockcypherFeeRecommendation(
      feeLevel,
      this.coinSymbol,
      this.networkType,
      this.blockcypherToken,
      this.logger,
    )
  }

  async getBlockbookFeeRecommendation(feeLevel: AutoFeeLevels): Promise<FeeRate> {
    return getBlockbookFeeRecommendation(
      this.feeLevelBlockTargets[feeLevel],
      this.coinSymbol,
      this.networkType,
      this.api,
      this.logger,
    )
  }

  async getFeeRateRecommendation(feeLevel: AutoFeeLevels, options: GetFeeRecommendationOptions = {}): Promise<FeeRate> {
    if (options.source === 'blockcypher') {
      return this.getBlockcypherFeeRecommendation(feeLevel)
    }
    if (options.source === 'blockbook') {
      return this.getBlockbookFeeRecommendation(feeLevel)
    }
    if (options.source) {
      throw new Error(`Unsupported fee recommendation source: ${options.source}`)
    }
    // If no source is explicitly requested, try both
    try {
      // use blockbook by default
      return this.getBlockbookFeeRecommendation(feeLevel)
    } catch (e) {
      this.logger.warn(e.toString())
      // fall back to blockcypher
      return this.getBlockcypherFeeRecommendation(feeLevel)
    }
  }

  private _getPayportValidationMessage(payport: Payport): string | undefined {
    const { address, extraId } = payport
    if (!this.isValidAddress(address)) {
      return 'Invalid payport address'
    }
    if (!isNil(extraId)) {
      return 'Invalid payport extraId'
    }
  }

  getPayportValidationMessage(payport: Payport): string | undefined {
    try {
      payport = assertType(Payport, payport, 'payport')
    } catch (e) {
      return e.message
    }
    return this._getPayportValidationMessage(payport)
  }

  validatePayport(payport: Payport): void {
    payport = assertType(Payport, payport, 'payport')
    const message = this._getPayportValidationMessage(payport)
    if (message) {
      throw new Error(message)
    }
  }

  validateAddress(address: string): void {
    if (!this.isValidAddress(address)) {
      throw new Error(`Invalid ${this.coinName} address: ${address}`)
    }
  }

  isValidPayport(payport: Payport): boolean {
    return Payport.is(payport) && !this._getPayportValidationMessage(payport)
  }

  toMainDenomination(amount: Numeric): string {
    return this.toMainDenominationString(amount)
  }

  toBaseDenomination(amount: Numeric): string {
    return this.toBaseDenominationString(amount)
  }

  toMainDenominationString: UnitConverters['toMainDenominationString']
  toMainDenominationNumber: UnitConverters['toMainDenominationNumber']
  toMainDenominationBigNumber: UnitConverters['toMainDenominationBigNumber']

  toBaseDenominationString: UnitConverters['toMainDenominationString']
  toBaseDenominationNumber: UnitConverters['toMainDenominationNumber']
  toBaseDenominationBigNumber: UnitConverters['toMainDenominationBigNumber']

  async getBlock(id?: string | number, options: GetBlockOptions & { includeTxs?: boolean } = {}): Promise<BlockInfo> {
    if (isUndefined(id)) {
      id = await this.getCurrentBlockHash()
    }
    const { includeTxs, ...getBlockOptions } = options
    const raw = await limiter.schedule(() => this.getApi().getBlock(id!, getBlockOptions))
    if (!raw.time) {
      throw new Error(`${this.coinSymbol} block ${id ?? 'latest'} missing timestamp`)
    }
    return {
      id: raw.hash,
      height: raw.height,
      previousId: raw.previousBlockHash,
      time: new Date(raw.time * 1000),
      raw: {
        ...raw,
        txs: includeTxs ? raw.txs : undefined,
      },
    }
  }

  async getCurrentBlockHash() {
    const bestBlock = await limiter.schedule(() => this.getApi().getBestBlock())
    return bestBlock.hash
  }

  async getCurrentBlockNumber() {
    const bestBlock = await limiter.schedule(() => this.getApi().getBestBlock())
    return bestBlock.height
  }

  isAddressBalanceSweepable(balance: Numeric): boolean {
    return this.toBaseDenominationNumber(balance) > this.networkMinRelayFee
  }

  async getAddressBalance(address: string): Promise<BalanceResult> {
    const result = await limiter.schedule(() => this.getApi().getAddressDetails(address, { details: 'basic' }))
    const confirmedBalance = this.toMainDenominationBigNumber(result.balance)
    const unconfirmedBalance = this.toMainDenominationBigNumber(result.unconfirmedBalance)
    const spendableBalance = confirmedBalance.plus(unconfirmedBalance)
    this.logger.debug('getBalance', address, confirmedBalance, unconfirmedBalance)
    return {
      confirmedBalance: confirmedBalance.toString(),
      unconfirmedBalance: unconfirmedBalance.toString(),
      spendableBalance: spendableBalance.toString(),
      sweepable: this.isAddressBalanceSweepable(spendableBalance),
      requiresActivation: false,
    }
  }

  async getAddressUtxos(address: string): Promise<UtxoInfo[]> {
    const utxosRaw = await limiter.schedule(() => this.getApi().getUtxosForAddress(address))
    const txsById: { [txid: string]: NormalizedTxBitcoin } = {}
    const utxos: UtxoInfo[] = await Promise.all(
      utxosRaw.map(async (data) => {
        const { value, height, lockTime, coinbase } = data

        // Retrieve the raw tx data to enable returning raw hex data. Memoize in a temporary object for efficiency
        const tx = txsById[data.txid] ?? (await limiter.schedule(() => this.getApi().getTx(data.txid)))
        txsById[data.txid] = tx
        const output = tx.vout[data.vout]
        const res: UtxoInfo = {
          ...data,
          satoshis: Number.parseInt(value),
          value: this.toMainDenominationString(value),
          height: isUndefined(height) || height <= 0 ? undefined : String(height),
          lockTime: isUndefined(lockTime) ? undefined : String(lockTime),
          coinbase: Boolean(coinbase),
          txHex: tx.hex,
          scriptPubKeyHex: output?.hex,
          address: output?.addresses?.[0],
          spent: false,
        }
        return res
      }),
    )
    return utxos
  }

  async getAddressNextSequenceNumber() {
    return null
  }

  txVoutToUtxoInfo(tx: NormalizedTxBitcoin, output: NormalizedTxBitcoinVout): UtxoInfo & TransactionOutput {
    return {
      txid: tx.txid,
      vout: output.n,
      satoshis: new BigNumber(output.value).toNumber(),
      value: this.toMainDenominationString(output.value),
      confirmations: tx.confirmations,
      height: tx.blockHeight > 0 ? String(tx.blockHeight) : undefined,
      coinbase: tx.valueIn === '0' && tx.value !== '0',
      lockTime: tx.lockTime ? String(tx.lockTime) : undefined,
      txHex: tx.hex,
      scriptPubKeyHex: output.hex,
      address: this.standardizeAddress(output.addresses?.[0] ?? '') ?? '',
      spent: Boolean(output.spent),
    }
  }

  async getTransactionInfo(txId: string, options?: GetTransactionInfoOptions): Promise<BitcoinishTransactionInfo> {
    const tx = await limiter.schedule(() => this.getApi().getTx(txId))
    const txSpecific = await limiter.schedule(() => this.getApi().getTxSpecific(txId))

    // Our "weight" for fee purposes is vbytes, but that isn't a thing on all networks (BCH, DOGE)
    const weight = txSpecific.vsize || txSpecific.size

    const fee = this.toMainDenominationString(tx.fees)

    const currentBlockNumber = await this.getCurrentBlockNumber()

    const confirmationId = tx.blockHash || null
    const confirmationNumber = tx.blockHeight ? String(tx.blockHeight) : undefined
    const confirmationTimestamp = tx.blockTime ? new Date(tx.blockTime * 1000) : null
    if (tx.confirmations >= 0x7fffffff) {
      // If confirmations exceeds the max value of a signed 32 bit integer, assume we have bad data
      // Blockbook sometimes returns a confirmations count equal to `0xFFFFFFFF` when unconfirmed
      // Bitcoin won't have that many confirmations for 40,000 years
      this.logger.log(
        `Blockbook returned confirmations count for tx ${txId} that's way too big to be real (${tx.confirmations}), assuming 0`,
      )
      tx.confirmations = 0
    }
    const isConfirmed = Boolean(tx.confirmations && tx.confirmations > 0)
    const status = isConfirmed ? TransactionStatus.Confirmed : TransactionStatus.Pending
    const inputUtxos = tx.vin.map((utxo) => ({
      txid: utxo.txid || '',
      vout: utxo.vout || 0,
      value: this.toMainDenominationString(utxo.value ?? 0),
      address: utxo.addresses?.[0],
      satoshis: Number.parseInt(utxo.value ?? '0'),
    }))

    const fromAddresses = tx.vin.map(({ addresses = [] }) => {
      return this.standardizeAddress(addresses[0]) || ''
    })

    let changeAddresses = [...fromAddresses]
    if (options?.changeAddress) {
      if (Array.isArray(options?.changeAddress)) {
        changeAddresses = changeAddresses.concat(options.changeAddress)
      } else {
        changeAddresses.push(options.changeAddress)
      }
    }

    let fromAddress = 'batch'
    if (fromAddresses.length === 0) {
      throw new Error(`Unable to determine fromAddress of ${this.coinSymbol} tx ${txId}`)
    } else if (fromAddresses.length === 1) {
      fromAddress = fromAddresses[0]
    }

    const outputUtxos = tx.vout.map((output) => this.txVoutToUtxoInfo(tx, output as NormalizedTxBitcoinVout))
    const outputAddresses = outputUtxos.map(({ address }) => address)

    let externalAddresses = outputAddresses.filter((oA) => !changeAddresses.includes(oA))
    if (options?.filterChangeAddresses) {
      externalAddresses = await options.filterChangeAddresses(externalAddresses)
    }

    const externalOutputs = outputUtxos
      .map(({ address, value }) => ({ address, value }))
      .filter(({ address }) => externalAddresses.includes(address))

    const amount = externalOutputs.reduce((total, { value }) => total.plus(value), new BigNumber(0)).toFixed()

    let toAddress = 'batch'
    if (externalOutputs.length === 0) {
      // throw new Error(`${this.coinSymbol} transaction has no external outputs ${txId}`)
    } else if (externalOutputs.length === 1) {
      toAddress = externalOutputs[0].address
    }

    return {
      status,
      id: tx.txid,
      fromIndex: null,
      fromAddress,
      fromExtraId: null,
      toIndex: null,
      toAddress,
      toExtraId: null,
      amount,
      fee,
      sequenceNumber: null,
      confirmationId,
      confirmationNumber,
      currentBlockNumber,
      confirmationTimestamp,
      isExecuted: isConfirmed,
      isConfirmed,
      confirmations: tx.confirmations,
      data: tx,
      inputUtxos,
      outputUtxos,
      externalOutputs,
      weight,
    }
  }
}
