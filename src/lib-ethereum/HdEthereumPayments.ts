import { BaseEthereumPayments } from './BaseEthereumPayments'
import { HdEthereumPaymentsConfig, EthereumSignatory } from './types'
import { deriveSignatory } from './bip44'
import { Payport } from '../lib-common'
import { omit } from 'lodash'
import { PUBLIC_CONFIG_OMIT_FIELDS } from './constants'

export class HdEthereumPayments extends BaseEthereumPayments<HdEthereumPaymentsConfig> {
  readonly xprv: string | null
  readonly xpub: string

  constructor(config: HdEthereumPaymentsConfig) {
    super(config)
    try {
      this.xprv = ''
      this.xpub = ''
      if (this.isValidXpub(config.hdKey)) {
        this.xpub = config.hdKey
      } else if (this.isValidXprv(config.hdKey)) {
        this.xprv = config.hdKey
        this.xpub = deriveSignatory(config.hdKey, 0).xkeys.xpub
      } else {
        throw new Error(config.hdKey)
      }
    } catch (e) {
      throw new Error(`Account must be a valid xprv or xpub: ${e.message}`)
    }
  }

  static generateNewKeys(): EthereumSignatory {
    return deriveSignatory()
  }

  getXpub(): string {
    return this.xpub
  }

  getPublicConfig(): HdEthereumPaymentsConfig {
    return {
      ...omit(this.getFullConfig(), PUBLIC_CONFIG_OMIT_FIELDS),
      depositKeyIndex: this.depositKeyIndex,
      hdKey: this.getXpub(),
    }
  }

  getAccountId(index: number): string {
    return this.getXpub()
  }

  getAccountIds(): string[] {
    return [this.getXpub()]
  }

  async getPayport(index: number): Promise<Payport> {
    const { address } = deriveSignatory(this.getXpub(), index)
    if (!this.isValidAddress(address)) {
      // This should never happen
      throw new Error(`Cannot get address ${index} - validation failed for derived address`)
    }
    return { address }
  }

  async getPrivateKey(index: number): Promise<string> {
    if (!this.xprv) {
      throw new Error(`Cannot get private key ${index} - HdEthereumPayments was created with an xpub`)
    }

    return deriveSignatory(deriveSignatory(this.xprv, 0).xkeys.xprv, index).keys.prv
  }
}

export default HdEthereumPayments
