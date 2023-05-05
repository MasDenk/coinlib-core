import { PaymentsUtils, Payport, createUnitConverters, AutoFeeLevels, FeeRate, UtxoInfo, BalanceResult, TransactionOutput, BlockInfo, GetFeeRecommendationOptions, GetTransactionInfoOptions } from '../../lib-common';
import { Numeric } from '../../ts-common';
import { GetBlockOptions } from 'blockbook-client';
import { BlockbookConnected } from './BlockbookConnected';
import { BitcoinishPaymentsUtilsConfig, BitcoinishTransactionInfo, BitcoinjsNetwork, FeeLevelBlockTargets, NormalizedTxBitcoin, NormalizedTxBitcoinVout } from './types';
declare type UnitConverters = ReturnType<typeof createUnitConverters>;
export declare abstract class BitcoinishPaymentsUtils extends BlockbookConnected implements PaymentsUtils {
    readonly coinSymbol: string;
    readonly coinName: string;
    readonly coinDecimals: number;
    readonly bitcoinjsNetwork: BitcoinjsNetwork;
    readonly networkMinRelayFee: number;
    readonly blockcypherToken?: string;
    feeLevelBlockTargets: FeeLevelBlockTargets;
    constructor(config: BitcoinishPaymentsUtilsConfig);
    isValidExtraId(extraId: string): boolean;
    abstract isValidAddress<O extends {
        format?: string;
    }>(address: string, options?: O): boolean;
    abstract standardizeAddress<O extends {
        format?: string;
    }>(address: string, options?: O): string | null;
    getBlockcypherFeeRecommendation(feeLevel: AutoFeeLevels): Promise<FeeRate>;
    getBlockbookFeeRecommendation(feeLevel: AutoFeeLevels): Promise<FeeRate>;
    getFeeRateRecommendation(feeLevel: AutoFeeLevels, options?: GetFeeRecommendationOptions): Promise<FeeRate>;
    private _getPayportValidationMessage;
    getPayportValidationMessage(payport: Payport): string | undefined;
    validatePayport(payport: Payport): void;
    validateAddress(address: string): void;
    isValidPayport(payport: Payport): boolean;
    toMainDenomination(amount: Numeric): string;
    toBaseDenomination(amount: Numeric): string;
    toMainDenominationString: UnitConverters['toMainDenominationString'];
    toMainDenominationNumber: UnitConverters['toMainDenominationNumber'];
    toMainDenominationBigNumber: UnitConverters['toMainDenominationBigNumber'];
    toBaseDenominationString: UnitConverters['toMainDenominationString'];
    toBaseDenominationNumber: UnitConverters['toMainDenominationNumber'];
    toBaseDenominationBigNumber: UnitConverters['toMainDenominationBigNumber'];
    getBlock(id?: string | number, options?: GetBlockOptions & {
        includeTxs?: boolean;
    }): Promise<BlockInfo>;
    getCurrentBlockHash(): Promise<string>;
    getCurrentBlockNumber(): Promise<number>;
    isAddressBalanceSweepable(balance: Numeric): boolean;
    getAddressBalance(address: string): Promise<BalanceResult>;
    getAddressUtxos(address: string): Promise<UtxoInfo[]>;
    getAddressNextSequenceNumber(): Promise<any>;
    txVoutToUtxoInfo(tx: NormalizedTxBitcoin, output: NormalizedTxBitcoinVout): UtxoInfo & TransactionOutput;
    getTransactionInfo(txId: string, options?: GetTransactionInfoOptions): Promise<BitcoinishTransactionInfo>;
}
export {};
