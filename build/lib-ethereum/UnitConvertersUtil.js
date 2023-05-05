"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitConvertersUtil = void 0;
const lib_common_1 = require("../lib-common");
const constants_1 = require("./constants");
class UnitConvertersUtil {
    constructor(config) {
        var _a;
        this.coinDecimals = (_a = config.coinDecimals) !== null && _a !== void 0 ? _a : constants_1.ETH_DECIMAL_PLACES;
        const unitConverters = (0, lib_common_1.createUnitConverters)(this.coinDecimals);
        this.toMainDenominationBigNumber = unitConverters.toMainDenominationBigNumber;
        this.toBaseDenominationBigNumber = unitConverters.toBaseDenominationBigNumber;
        this.toMainDenomination = unitConverters.toMainDenominationString;
        this.toBaseDenomination = unitConverters.toBaseDenominationString;
        const ethUnitConverters = (0, lib_common_1.createUnitConverters)(constants_1.ETH_DECIMAL_PLACES);
        this.toMainDenominationBigNumberEth = ethUnitConverters.toMainDenominationBigNumber;
        this.toBaseDenominationBigNumberEth = ethUnitConverters.toBaseDenominationBigNumber;
        this.toMainDenominationEth = ethUnitConverters.toMainDenominationString;
        this.toBaseDenominationEth = ethUnitConverters.toBaseDenominationString;
    }
    getCustomUnitConverter(decimals) {
        return (0, lib_common_1.createUnitConverters)(decimals);
    }
}
exports.UnitConvertersUtil = UnitConvertersUtil;
//# sourceMappingURL=UnitConvertersUtil.js.map