import * as t from 'io-ts'
import { extendCodec, Logger } from '../ts-common'
import { NetworkTypeT } from '../lib-common'
// import { TronPaymentsConfig, BaseTronPaymentsConfig, TronPaymentsUtils } from '../lib-tron'
// import { RipplePaymentsConfig, BaseRipplePaymentsConfig, RipplePaymentsUtils } from '../lib-ripple'
// import { StellarPaymentsConfig, BaseStellarPaymentsConfig, StellarPaymentsUtils } from '../lib-stellar'
import { BitcoinPaymentsConfig, BaseBitcoinPaymentsConfig, BitcoinPaymentsUtils } from '../lib-bitcoin'
import { EthereumPaymentsConfig, BaseEthereumPaymentsConfig, EthereumPaymentsUtils } from '../lib-ethereum'
import { LitecoinPaymentsConfig, BaseLitecoinPaymentsConfig, LitecoinPaymentsUtils } from '../lib-litecoin'
// import {
//   BitcoinCashPaymentsConfig,
//   BaseBitcoinCashPaymentsConfig,
//   BitcoinCashPaymentsUtils
// } from '@bitaccess/coinlib-bitcoin-cash';
import { DogePaymentsConfig, BaseDogePaymentsConfig, DogePaymentsUtils } from '../lib-doge'
import { DashPaymentsConfig, BaseDashPaymentsConfig, DashPaymentsUtils } from '../lib-dash'

// TODO ^

export type CoinPaymentsUtilsClasses = {
  // TRX: TronPaymentsUtils
  // XRP: RipplePaymentsUtils
  // XLM: StellarPaymentsUtils
  BTC: BitcoinPaymentsUtils
  ETH: EthereumPaymentsUtils
  LTC: LitecoinPaymentsUtils
  // BCH: BitcoinCashPaymentsUtils;
  DOGE: DogePaymentsUtils,
  DASH: DashPaymentsUtils,
}

export const basePaymentsConfigCodecs = {
  // TRX: BaseTronPaymentsConfig,
  // XRP: BaseRipplePaymentsConfig,
  // XLM: BaseStellarPaymentsConfig,
  BTC: BaseBitcoinPaymentsConfig,
  ETH: BaseEthereumPaymentsConfig,
  LTC: BaseLitecoinPaymentsConfig,
  // BCH: BaseBitcoinCashPaymentsConfig,
  DOGE: BaseDogePaymentsConfig,
  DASH: BaseDashPaymentsConfig,
}

export const CoinPaymentsBaseConfigs = t.type(basePaymentsConfigCodecs, 'CoinPaymentsBaseConfigs')
export type CoinPaymentsBaseConfigs = t.TypeOf<typeof CoinPaymentsBaseConfigs>

export const paymentsConfigCodecs = {
  // TRX: TronPaymentsConfig,
  // XRP: RipplePaymentsConfig,
  // XLM: StellarPaymentsConfig,
  BTC: BitcoinPaymentsConfig,
  ETH: EthereumPaymentsConfig,
  LTC: LitecoinPaymentsConfig,
  // BCH: BitcoinCashPaymentsConfig,
  DOGE: DogePaymentsConfig,
  DASH: DashPaymentsConfig,
}
export const CoinPaymentsConfigs = t.type(paymentsConfigCodecs, 'CoinPaymentsConfigs')
export type CoinPaymentsConfigs = t.TypeOf<typeof CoinPaymentsConfigs>

export const SupportedCoinPaymentsSymbol = t.keyof(paymentsConfigCodecs, 'SupportedCoinPaymentsSymbol')
export type SupportedCoinPaymentsSymbol = t.TypeOf<typeof SupportedCoinPaymentsSymbol>

export type CoinPaymentsPartialConfigs = {
  [T in SupportedCoinPaymentsSymbol]?: Partial<CoinPaymentsConfigs[T]>
}
export const CoinPaymentsPartialConfigs = t.partial(
  basePaymentsConfigCodecs,
  'CoinPaymentsPartialConfigs',
) as t.Type<CoinPaymentsPartialConfigs>

export const CoinPaymentsConfig = extendCodec(
  CoinPaymentsPartialConfigs,
  {},
  {
    network: NetworkTypeT,
    logger: Logger,
    seed: t.string,
  },
  'CoinPaymentsConfig',
)
export type CoinPaymentsConfig = t.TypeOf<typeof CoinPaymentsConfig>
