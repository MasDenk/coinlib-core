"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnitConverters = exports.isMatchingError = void 0;
const SharedDependencies_1 = require("./SharedDependencies");
function isMatchingError(e, partialMessages) {
    const messageLower = e.toString().toLowerCase();
    return partialMessages.some((pm) => messageLower.includes(pm.toLowerCase()));
}
exports.isMatchingError = isMatchingError;
function createUnitConverters(decimals) {
    const basePerMain = new SharedDependencies_1.BigNumber(10).pow(decimals);
    function toMainDenominationBigNumber(baseNumeric) {
        const baseUnits = new SharedDependencies_1.BigNumber(baseNumeric);
        if (baseUnits.isNaN()) {
            throw new Error('Cannot convert to main denomination - not a number');
        }
        if (!baseUnits.isFinite()) {
            throw new Error('Cannot convert to main denomination - not finite');
        }
        return baseUnits.div(basePerMain);
    }
    function toMainDenominationString(baseNumeric) {
        return toMainDenominationBigNumber(baseNumeric).toFixed();
    }
    function toMainDenominationNumber(baseNumeric) {
        return toMainDenominationBigNumber(baseNumeric).toNumber();
    }
    function toBaseDenominationBigNumber(mainNumeric) {
        const mainUnits = new SharedDependencies_1.BigNumber(mainNumeric);
        if (mainUnits.isNaN()) {
            throw new Error('Cannot convert to base denomination - not a number');
        }
        if (!mainUnits.isFinite()) {
            throw new Error('Cannot convert to base denomination - not finite');
        }
        return mainUnits.times(basePerMain).dp(0, 7);
    }
    function toBaseDenominationString(mainNumeric) {
        return toBaseDenominationBigNumber(mainNumeric).toFixed(0, 7);
    }
    function toBaseDenominationNumber(mainNumeric) {
        return toBaseDenominationBigNumber(mainNumeric).toNumber();
    }
    return {
        toMainDenominationBigNumber,
        toMainDenominationNumber,
        toMainDenominationString,
        toBaseDenominationBigNumber,
        toBaseDenominationNumber,
        toBaseDenominationString,
    };
}
exports.createUnitConverters = createUnitConverters;
//# sourceMappingURL=utils.js.map