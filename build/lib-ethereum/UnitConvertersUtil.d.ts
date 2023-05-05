import { UnitConverters } from './types';
export declare class UnitConvertersUtil {
    toMainDenominationBigNumber: UnitConverters['toMainDenominationBigNumber'];
    toBaseDenominationBigNumber: UnitConverters['toMainDenominationBigNumber'];
    toMainDenomination: UnitConverters['toMainDenominationString'];
    toBaseDenomination: UnitConverters['toBaseDenominationString'];
    toMainDenominationBigNumberEth: UnitConverters['toMainDenominationBigNumber'];
    toBaseDenominationBigNumberEth: UnitConverters['toMainDenominationBigNumber'];
    toMainDenominationEth: UnitConverters['toMainDenominationString'];
    toBaseDenominationEth: UnitConverters['toBaseDenominationString'];
    coinDecimals: number;
    constructor(config: {
        coinDecimals?: number;
    });
    getCustomUnitConverter(decimals: number): {
        toMainDenominationBigNumber: (baseNumeric: string | number | import("bignumber.js").default) => import("bignumber.js").default;
        toMainDenominationNumber: (baseNumeric: string | number | import("bignumber.js").default) => number;
        toMainDenominationString: (baseNumeric: string | number | import("bignumber.js").default) => string;
        toBaseDenominationBigNumber: (mainNumeric: string | number | import("bignumber.js").default) => import("bignumber.js").default;
        toBaseDenominationNumber: (mainNumeric: string | number | import("bignumber.js").default) => number;
        toBaseDenominationString: (mainNumeric: string | number | import("bignumber.js").default) => string;
    };
}
