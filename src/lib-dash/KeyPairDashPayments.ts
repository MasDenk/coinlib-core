import { omit } from 'lodash'
import { isUndefined, isString } from '../ts-common'
import { PUBLIC_CONFIG_OMIT_FIELDS } from '../lib-bitcoin'

import { SinglesigDashPayments } from './SinglesigDashPayments'
import { KeyPairDashPaymentsConfig, BitcoinjsKeyPair } from './types'
import { privateKeyToKeyPair, publicKeyToAddress, publicKeyToKeyPair, publicKeyToString } from './helpers'
import { SINGLESIG_ADDRESS_TYPE } from './constants'

export class KeyPairDashPayments extends SinglesigDashPayments<KeyPairDashPaymentsConfig> {
  readonly publicKeys: { [index: number]: string | undefined } = {}
  readonly privateKeys: { [index: number]: string | null | undefined } = {}
  readonly addresses: { [index: number]: string | undefined } = {}

  constructor(private config: KeyPairDashPaymentsConfig) {
    super(config)

    Object.entries(config.keyPairs).forEach(([key, value]) => {
      if (typeof value === 'undefined' || value === null) {
        return
      }

      const i = Number.parseInt(key)
      let publicKey: string | Buffer
      let privateKey: string | null = null

      if (this.isValidPublicKey(value)) {
        publicKey = value
      } else if (this.isValidPrivateKey(value)) {
        publicKey = privateKeyToKeyPair(value, this.bitcoinjsNetwork).publicKey
        privateKey = value
      } else {
        throw new Error(
          `KeyPairDashPaymentsConfig.keyPairs[${i}] is not a valid ${this.networkType} private or public key`,
        )
      }

      const address = publicKeyToAddress(publicKey, this.bitcoinjsNetwork, SINGLESIG_ADDRESS_TYPE)

      this.publicKeys[i] = publicKeyToString(publicKey)
      this.privateKeys[i] = privateKey
      this.addresses[i] = address
    })
  }

  getFullConfig(): KeyPairDashPaymentsConfig {
    return {
      ...this.config,
      network: this.networkType,
    }
  }

  getPublicConfig(): KeyPairDashPaymentsConfig {
    return {
      ...omit(this.getFullConfig(), PUBLIC_CONFIG_OMIT_FIELDS),
      keyPairs: this.publicKeys,
    }
  }

  getAccountId(index: number): string {
    const accountId = this.publicKeys[index] || ''
    if (!accountId) {
      throw new Error(`No KeyPairDashPayments account configured at index ${index}`)
    }
    return accountId
  }

  getAccountIds(index?: number): string[] {
    if (!isUndefined(index)) {
      return [this.getAccountId(index)]
    }
    return Object.values(this.publicKeys).filter(isString)
  }

  getKeyPair(index: number): BitcoinjsKeyPair {
    const privateKey = this.privateKeys[index]
    if (privateKey) {
      return privateKeyToKeyPair(privateKey, this.bitcoinjsNetwork)
    }
    const publicKey = this.publicKeys[index] || ''
    if (!this.isValidPublicKey(publicKey)) {
      throw new Error(`Cannot get publicKey ${index} - keyPair[${index}] is undefined or invalid`)
    }
    return publicKeyToKeyPair(publicKey, this.bitcoinjsNetwork)
  }

  getAddress(index: number): string {
    const address = this.addresses[index] || ''
    if (!this.isValidAddress(address)) {
      throw new Error(`Cannot get address ${index} - keyPair[${index}] is undefined or invalid address`)
    }
    return address
  }

  getPrivateKey(index: number): string {
    const privateKey = this.privateKeys[index] || ''
    if (!this.isValidPrivateKey(privateKey)) {
      throw new Error(`Cannot get private key ${index} - keyPair[${index}] is undefined`)
    }
    return privateKey
  }
}

export default KeyPairDashPayments
