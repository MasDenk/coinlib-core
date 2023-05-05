import * as bitcoin from 'bitcoinjs-lib'
import {
  BitcoinjsKeyPair,
  DashSignedTransaction,
  SinglesigDashPaymentsConfig,
  DashUnsignedTransaction,
  AddressType,
  SinglesigAddressType,
} from './types'
import { bitcoinish } from '../lib-bitcoin'
import { BaseDashPayments } from './BaseDashPayments'
import { SINGLESIG_ADDRESS_TYPE } from './constants'

export abstract class SinglesigDashPayments<
  Config extends SinglesigDashPaymentsConfig,
> extends BaseDashPayments<Config> {
  addressType: SinglesigAddressType
  abstract getKeyPair(index: number): BitcoinjsKeyPair

  constructor(config: SinglesigDashPaymentsConfig) {
    super(config)
    this.addressType = config.addressType || SINGLESIG_ADDRESS_TYPE
  }

  getPaymentScript(index: number): bitcoin.payments.Payment {
    return bitcoinish.getSinglesigPaymentScript(
      this.bitcoinjsNetwork,
      this.addressType,
      this.getKeyPair(index).publicKey,
    )
  }

  signMultisigTransaction(tx: DashUnsignedTransaction): DashSignedTransaction {
    return bitcoinish.signMultisigTransaction(tx, this)
  }

  async signTransaction(tx: DashUnsignedTransaction): Promise<DashSignedTransaction> {
    return bitcoinish.signTransaction(tx, this)
  }

  getSupportedAddressTypes(): AddressType[] {
    return [AddressType.Legacy]
  }
}
