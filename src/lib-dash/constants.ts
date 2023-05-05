import { FeeLevel, NetworkType } from '../lib-common'
import { BitcoinjsNetwork, bitcoinish } from '../lib-bitcoin'
import { AddressType, SinglesigAddressType, MultisigAddressType } from './types'

export const PACKAGE_NAME = 'dash-payments'
export const DECIMAL_PLACES = 8
export const COIN_SYMBOL = 'DASH'
export const COIN_NAME = 'Dash'

/**
 * The minimum value a transaction output must be in order to not get rejected by the network.
 *
 * Unit: `satoshis`
 */
export const DEFAULT_DUST_THRESHOLD = 546

/**
 * The minimum fee required by *most* nodes to relay a transaction.
 *
 * Unit: `satoshis`
 */
export const DEFAULT_NETWORK_MIN_RELAY_FEE = 1000

/** Sequence to use for each input such that RBF is opted into */
export const BITCOIN_SEQUENCE_RBF = 0xFFFFFFFD

/**
 * The minimum fee this library should ever use for a transaction (overrides recommended levels).
 *
 * Unit: `sat/byte`
 */
export const DEFAULT_MIN_TX_FEE = 1

export const DEFAULT_SINGLESIG_ADDRESS_TYPE: SinglesigAddressType = AddressType.Legacy
export const SINGLESIG_ADDRESS_TYPE: SinglesigAddressType = AddressType.Legacy
export const DEFAULT_MULTISIG_ADDRESS_TYPE: MultisigAddressType = AddressType.MultisigLegacy

export const DEFAULT_DERIVATION_PATH = "m/44'/5'/0'"

export const DEFAULT_NETWORK = NetworkType.Mainnet

export const NETWORK_MAINNET = {
  messagePrefix: '\x19DarkCoin Signed Message:\n',
  bech32: 'dash',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x4c,
  scriptHash: 0x10,
  wif: 0xcc,
}
export const NETWORK_TESTNET = {
  messagePrefix: '\x19DarkCoin Signed Message:\n',
  bech32: 'dashTest',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x8c,
  scriptHash: 0x13,
  wif: 0xef,
}

export const NETWORKS: { [networkType in NetworkType]: BitcoinjsNetwork } = {
  [NetworkType.Mainnet]: NETWORK_MAINNET,
  [NetworkType.Testnet]: NETWORK_TESTNET,
}

export const DEFAULT_MAINNET_SERVER = process.env.DASH_SERVER_URL
  ? process.env.DASH_SERVER_URL.split(',')
  : ['https://dash1.trezor.io', 'https://dash2.trezor.io']
export const DEFAULT_TESTNET_SERVER = process.env.DASH_TESTNET_SERVER_URL || ''

export const DEFAULT_FEE_LEVEL = FeeLevel.Low

export const DEFAULT_FEE_LEVEL_BLOCK_TARGETS: bitcoinish.FeeLevelBlockTargets = {
  [FeeLevel.High]: 10,
  [FeeLevel.Medium]: 5,
  [FeeLevel.Low]: 1,
}
