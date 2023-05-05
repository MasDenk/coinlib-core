"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidExtraIdOrNil = exports.assertValidExtraId = exports.assertValidAddress = exports.isValidExtraId = exports.isValidAddress = exports.isValidXpub = exports.isValidXprv = exports.toBaseDenominationNumber = exports.toBaseDenominationString = exports.toBaseDenominationBigNumber = exports.toMainDenominationNumber = exports.toMainDenominationString = exports.toMainDenominationBigNumber = void 0;
const lib_common_1 = require("../lib-common");
const constants_1 = require("./constants");
const ts_common_1 = require("../ts-common");
const { toMainDenominationBigNumber, toMainDenominationString, toMainDenominationNumber, toBaseDenominationBigNumber, toBaseDenominationString, toBaseDenominationNumber, } = (0, lib_common_1.createUnitConverters)(constants_1.DECIMAL_PLACES);
exports.toMainDenominationBigNumber = toMainDenominationBigNumber;
exports.toMainDenominationString = toMainDenominationString;
exports.toMainDenominationNumber = toMainDenominationNumber;
exports.toBaseDenominationBigNumber = toBaseDenominationBigNumber;
exports.toBaseDenominationString = toBaseDenominationString;
exports.toBaseDenominationNumber = toBaseDenominationNumber;
function isValidXprv(xprv) {
    return typeof xprv === 'string' && constants_1.XPRV_REGEX.test(xprv);
}
exports.isValidXprv = isValidXprv;
function isValidXpub(xpub) {
    return typeof xpub === 'string' && constants_1.XPUB_REGEX.test(xpub);
}
exports.isValidXpub = isValidXpub;
function isValidAddress(address) {
    return typeof address === 'string' && constants_1.ADDRESS_REGEX.test(address);
}
exports.isValidAddress = isValidAddress;
function isValidExtraId(extraId) {
    return typeof extraId === 'string' && constants_1.EXTRA_ID_REGEX.test(extraId);
}
exports.isValidExtraId = isValidExtraId;
function assertValidAddress(address) {
    if (!isValidAddress(address)) {
        throw new Error(`Invalid ripple address: ${address}`);
    }
}
exports.assertValidAddress = assertValidAddress;
function assertValidExtraId(extraId) {
    if (!isValidExtraId(extraId)) {
        throw new Error(`Invalid ripple extraId: ${extraId}`);
    }
}
exports.assertValidExtraId = assertValidExtraId;
function assertValidExtraIdOrNil(extraId) {
    if (!(0, ts_common_1.isNil)(extraId) && !isValidExtraId(extraId)) {
        throw new Error(`Invalid ripple extraId: ${extraId}`);
    }
}
exports.assertValidExtraIdOrNil = assertValidExtraIdOrNil;
//# sourceMappingURL=helpers.js.map