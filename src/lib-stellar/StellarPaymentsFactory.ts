import { PaymentsFactory, StandardConnectionManager } from '../lib-common'
import { assertType } from '../ts-common'

import {
  StellarPaymentsConfig,
  HdStellarPaymentsConfig,
  AccountStellarPaymentsConfig,
  BaseStellarPaymentsConfig,
  StellarBalanceMonitorConfig,
  BaseStellarConfig,
} from './types'
import { PACKAGE_NAME } from './constants'
import { BaseStellarPayments } from './BaseStellarPayments'
import { HdStellarPayments } from './HdStellarPayments'
import { AccountStellarPayments } from './AccountStellarPayments'
import { StellarPaymentsUtils } from './StellarPaymentsUtil'
import { StellarBalanceMonitor } from './StellarBalanceMonitor'

export class StellarPaymentsFactory extends PaymentsFactory<
  BaseStellarConfig,
  StellarPaymentsUtils,
  BaseStellarPayments<BaseStellarConfig>,
  StellarBalanceMonitor
> {
  readonly packageName = PACKAGE_NAME

  newPayments(config: HdStellarPaymentsConfig): HdStellarPayments
  newPayments(config: AccountStellarPaymentsConfig): AccountStellarPayments
  newPayments(config: StellarPaymentsConfig) {
    if (AccountStellarPaymentsConfig.is(config)) {
      return new AccountStellarPayments(config)
    }
    if (HdStellarPaymentsConfig.is(config)) {
      return new HdStellarPayments(config)
    }
    throw new Error(`Cannot instantiate ${this.packageName} for unsupported config`)
  }

  newUtils(config: BaseStellarPaymentsConfig) {
    return new StellarPaymentsUtils(assertType(BaseStellarPaymentsConfig, config, 'config'))
  }

  hasBalanceMonitor = true
  newBalanceMonitor(config: StellarBalanceMonitorConfig) {
    return new StellarBalanceMonitor(assertType(StellarBalanceMonitorConfig, config, 'config'))
  }

  connectionManager = new StandardConnectionManager()
}

export default StellarPaymentsFactory
