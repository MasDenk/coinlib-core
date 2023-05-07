import { PaymentsFactory, StandardConnectionManager } from '../lib-common'
import { assertType } from '../ts-common'
import { bitcoinish } from '../lib-bitcoin'

import {
  BitcoinCashPaymentsConfig,
  HdBitcoinCashPaymentsConfig,
  UHdBitcoinCashPaymentsConfig,
  KeyPairBitcoinCashPaymentsConfig,
  MultisigBitcoinCashPaymentsConfig,
  BitcoinCashPaymentsUtilsConfig,
  BaseBitcoinCashPaymentsConfig,
  BitcoinCashBalanceMonitorConfig,
  BitcoinCashBaseConfig,
} from './types'
import { PACKAGE_NAME } from './constants'
import { BaseBitcoinCashPayments } from './BaseBitcoinCashPayments'
import { BitcoinCashPaymentsUtils } from './BitcoinCashPaymentsUtils'
import { HdBitcoinCashPayments } from './HdBitcoinCashPayments'
import { UHdBitcoinCashPayments } from './UHdBitcoinCashPayments'
import { KeyPairBitcoinCashPayments } from './KeyPairBitcoinCashPayments'
import { MultisigBitcoinCashPayments } from './MultisigBitcoinCashPayments'
import { BitcoinCashBalanceMonitor } from './BitcoinCashBalanceMonitor'

export class BitcoinCashPaymentsFactory extends PaymentsFactory<
  BitcoinCashPaymentsUtilsConfig,
  BitcoinCashPaymentsUtils,
  BaseBitcoinCashPayments<BaseBitcoinCashPaymentsConfig>,
  BitcoinCashBalanceMonitor
> {
  readonly packageName = PACKAGE_NAME

  newPayments(config: BitcoinCashPaymentsConfig) {
    if (HdBitcoinCashPaymentsConfig.is(config)) {
      return new HdBitcoinCashPayments(config)
    }
    if (UHdBitcoinCashPaymentsConfig.is(config)) {
      return new UHdBitcoinCashPayments(config)
    }
    if (KeyPairBitcoinCashPaymentsConfig.is(config)) {
      return new KeyPairBitcoinCashPayments(config)
    }
    if (MultisigBitcoinCashPaymentsConfig.is(config)) {
      return new MultisigBitcoinCashPayments(config)
    }
    throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`)
  }

  newUtils(config: BitcoinCashPaymentsUtilsConfig) {
    return new BitcoinCashPaymentsUtils(assertType(BitcoinCashPaymentsUtilsConfig, config, 'config'))
  }

  hasBalanceMonitor = true
  newBalanceMonitor(config: BitcoinCashBalanceMonitorConfig) {
    return new BitcoinCashBalanceMonitor(assertType(BitcoinCashBalanceMonitorConfig, config, 'config'))
  }

  connectionManager = new StandardConnectionManager<bitcoinish.BlockbookServerAPI, BitcoinCashBaseConfig>()
}

export default BitcoinCashPaymentsFactory
