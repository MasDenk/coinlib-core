import { BigNumber } from './SharedDependencies';
import { Numeric } from '../ts-common';
export declare function isMatchingError(e: Error, partialMessages: string[]): boolean;
export declare function createUnitConverters(decimals: number): {
    toMainDenominationBigNumber: (baseNumeric: Numeric) => BigNumber;
    toMainDenominationNumber: (baseNumeric: Numeric) => number;
    toMainDenominationString: (baseNumeric: Numeric) => string;
    toBaseDenominationBigNumber: (mainNumeric: Numeric) => BigNumber;
    toBaseDenominationNumber: (mainNumeric: Numeric) => number;
    toBaseDenominationString: (mainNumeric: Numeric) => string;
};
