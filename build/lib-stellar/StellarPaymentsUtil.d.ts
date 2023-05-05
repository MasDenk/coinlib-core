import { AutoFeeLevels, BalanceResult, FeeRate, PaymentsUtils, Payport } from '../lib-common';
import { Numeric } from '../ts-common';
import * as Stellar from 'stellar-sdk';
import { StellarConnected } from './StellarConnected';
import { StellarTransactionInfo } from './types';
export declare class StellarPaymentsUtils extends StellarConnected implements PaymentsUtils {
    readonly coinSymbol = "XLM";
    readonly coinName = "Stellar";
    readonly coinDecimals = 7;
    isValidExtraId(extraId: string): boolean;
    isValidAddress(address: string): boolean;
    standardizeAddress(address: string): string | null;
    _getPayportValidationMessage(payport: Payport): Promise<string | undefined>;
    getPayportValidationMessage(payport: Payport): Promise<string | undefined>;
    validatePayport(payport: Payport): Promise<void>;
    isValidPayport(payport: Payport): Promise<boolean>;
    toMainDenomination(amount: Numeric): string;
    toBaseDenomination(amount: Numeric): string;
    getFeeRateRecommendation(level: AutoFeeLevels): Promise<FeeRate>;
    getCurrentBlockNumber(): Promise<number>;
    getAddressUtxos(): Promise<any[]>;
    isAddressBalanceSweepable(balance: Numeric): boolean;
    loadAccount(address: string): Promise<any>;
    loadAccountOrThrow(address: string): Promise<any>;
    getAddressBalance(address: string): Promise<BalanceResult>;
    getAddressNextSequenceNumber(address: string): Promise<string>;
    getLatestBlock(): Promise<Stellar.ServerApi.LedgerRecord>;
    getTransactionInfo(txId: string): Promise<StellarTransactionInfo>;
}
