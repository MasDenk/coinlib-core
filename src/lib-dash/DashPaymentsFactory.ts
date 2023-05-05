import { PaymentsFactory, StandardConnectionManager } from '../lib-common'
import { assertType } from '../ts-common'
import { bitcoinish } from '../lib-bitcoin'

import {
  DashPaymentsConfig,
  HdDashPaymentsConfig,
  KeyPairDashPaymentsConfig,
  MultisigDashPaymentsConfig,
  DashPaymentsUtilsConfig,
  BaseDashPaymentsConfig,
  DashBalanceMonitorConfig,
  DashBaseConfig,
} from './types'
import { PACKAGE_NAME } from './constants'
import { BaseDashPayments } from './BaseDashPayments'
import { DashPaymentsUtils } from './DashPaymentsUtils'
import { HdDashPayments } from './HdDashPayments'
import { KeyPairDashPayments } from './KeyPairDashPayments'
import { MultisigDashPayments } from './MultisigDashPayments'
import { DashBalanceMonitor } from './DashBalanceMonitor'

export class DashPaymentsFactory extends PaymentsFactory<
  DashPaymentsUtilsConfig,
  DashPaymentsUtils,
  BaseDashPayments<BaseDashPaymentsConfig>,
  DashBalanceMonitor
> {
  readonly packageName = PACKAGE_NAME

  newPayments(config: DashPaymentsConfig) {
    if (HdDashPaymentsConfig.is(config)) {
      return new HdDashPayments(config)
    }
    if (KeyPairDashPaymentsConfig.is(config)) {
      return new KeyPairDashPayments(config)
    }
    if (MultisigDashPaymentsConfig.is(config)) {
      return new MultisigDashPayments(config)
    }
    throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`)
  }

  newUtils(config: DashPaymentsUtilsConfig) {
    return new DashPaymentsUtils(assertType(DashPaymentsUtilsConfig, config, 'config'))
  }

  hasBalanceMonitor = true
  newBalanceMonitor(config: DashBalanceMonitorConfig) {
    return new DashBalanceMonitor(assertType(DashBalanceMonitorConfig, config, 'config'))
  }

  connectionManager = new StandardConnectionManager<bitcoinish.BlockbookServerAPI, DashBaseConfig>()
}

export default DashPaymentsFactory
