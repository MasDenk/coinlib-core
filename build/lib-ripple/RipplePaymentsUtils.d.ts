import { PaymentsUtils, Payport, AutoFeeLevels, FeeRate, BlockInfo } from '../lib-common';
import { Numeric } from '../ts-common';
import { isValidXprv, isValidXpub } from './helpers';
import { RippleTransactionInfo } from './types';
import { RippleConnected } from './RippleConnected';
export declare class RipplePaymentsUtils extends RippleConnected implements PaymentsUtils {
    readonly coinSymbol = "XRP";
    readonly coinName = "Ripple";
    readonly coinDecimals = 6;
    isValidExtraId(extraId: string): boolean;
    isValidAddress(address: string): boolean;
    standardizeAddress(address: string): string | null;
    private _getPayportValidationMessage;
    getPayportValidationMessage(payport: Payport): Promise<string | undefined>;
    validatePayport(payport: Payport): Promise<void>;
    isValidPayport(payport: Payport): Promise<boolean>;
    toMainDenomination(amount: string | number): string;
    toBaseDenomination(amount: string | number): string;
    isValidXprv: typeof isValidXprv;
    isValidXpub: typeof isValidXpub;
    getFeeRateRecommendation(level: AutoFeeLevels): Promise<FeeRate>;
    getCurrentBlockNumber(): Promise<number>;
    getAddressUtxos(): Promise<any[]>;
    isAddressBalanceSweepable(balance: Numeric): boolean;
    getAddressBalance(address: string): Promise<{
        confirmedBalance: string;
        unconfirmedBalance: string;
        spendableBalance: string;
        sweepable: boolean;
        requiresActivation: boolean;
        minimumBalance: string;
    }>;
    getAddressNextSequenceNumber(address: string): Promise<string>;
    getTransactionInfo(txId: string): Promise<RippleTransactionInfo>;
    getBlock(id?: string | number): Promise<BlockInfo>;
}
