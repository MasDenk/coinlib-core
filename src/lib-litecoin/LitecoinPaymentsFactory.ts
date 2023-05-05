import { PaymentsFactory, StandardConnectionManager } from '../lib-common'
import { assertType } from '../ts-common'
import { bitcoinish } from '../lib-bitcoin'

import {
  LitecoinPaymentsConfig,
  HdLitecoinPaymentsConfig,
  KeyPairLitecoinPaymentsConfig,
  MultisigLitecoinPaymentsConfig,
  LitecoinPaymentsUtilsConfig,
  BaseLitecoinPaymentsConfig,
  LitecoinBalanceMonitorConfig,
  LitecoinBaseConfig,
} from './types'
import { PACKAGE_NAME } from './constants'
import { BaseLitecoinPayments } from './BaseLitecoinPayments'
import { LitecoinPaymentsUtils } from './LitecoinPaymentsUtils'
import { HdLitecoinPayments } from './HdLitecoinPayments'
import { KeyPairLitecoinPayments } from './KeyPairLitecoinPayments'
import { MultisigLitecoinPayments } from './MultisigLitecoinPayments'
import { LitecoinBalanceMonitor } from './LitecoinBalanceMonitor'

export class LitecoinPaymentsFactory extends PaymentsFactory<
  LitecoinPaymentsUtilsConfig,
  LitecoinPaymentsUtils,
  BaseLitecoinPayments<BaseLitecoinPaymentsConfig>,
  LitecoinBalanceMonitor
> {
  readonly packageName = PACKAGE_NAME

  newPayments(config: LitecoinPaymentsConfig) {
    if (HdLitecoinPaymentsConfig.is(config)) {
      return new HdLitecoinPayments(config)
    }
    if (KeyPairLitecoinPaymentsConfig.is(config)) {
      return new KeyPairLitecoinPayments(config)
    }
    if (MultisigLitecoinPaymentsConfig.is(config)) {
      return new MultisigLitecoinPayments(config)
    }
    throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`)
  }

  newUtils(config: LitecoinPaymentsUtilsConfig) {
    return new LitecoinPaymentsUtils(assertType(LitecoinPaymentsUtilsConfig, config, 'config'))
  }

  hasBalanceMonitor = true
  newBalanceMonitor(config: LitecoinBalanceMonitorConfig) {
    return new LitecoinBalanceMonitor(assertType(LitecoinBalanceMonitorConfig, config, 'config'))
  }

  connectionManager = new StandardConnectionManager<bitcoinish.BlockbookServerAPI, LitecoinBaseConfig>()
}

export default LitecoinPaymentsFactory
