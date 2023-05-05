import { DashPaymentsUtils } from './DashPaymentsUtils'
import { bitcoinish } from '../lib-bitcoin'
import { DashBalanceMonitorConfig } from './types'
import { toBitcoinishConfig } from './utils'

export class DashBalanceMonitor extends bitcoinish.BitcoinishBalanceMonitor {
  constructor(config: DashBalanceMonitorConfig) {
    super({
      ...toBitcoinishConfig(config),
      utils: new DashPaymentsUtils(config),
    })
  }
}
