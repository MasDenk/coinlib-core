"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertType = exports.SimpleReporter = exports.getMessage = void 0;
const io_ts_1 = require("io-ts");
const string_1 = require("./string");
function isCodec(actual, expected) {
    return actual instanceof expected || actual._tag === expected.name;
}
function getContextPath(context) {
    return context
        .filter(({ type }, i) => {
        if (i === 0)
            return true;
        const previousType = context[i - 1].type;
        return !(isCodec(previousType, io_ts_1.UnionType) || isCodec(previousType, io_ts_1.IntersectionType));
    })
        .map(({ key, type }) => (key ? key : type.name))
        .join('.');
}
function getFlattenedCodecName(codec) {
    if (isCodec(codec, io_ts_1.UnionType)) {
        return codec.types.map((t) => getFlattenedCodecName(t)).join(' | ');
    }
    return codec.name;
}
function getContextTypeName(context) {
    if (context.length <= 0) {
        return '';
    }
    let codec = context[context.length - 1].type;
    for (let i = context.length - 1; i > 0; i--) {
        const parent = context[i - 1].type;
        if (isCodec(parent, io_ts_1.UnionType)) {
            codec = parent;
        }
        else if (isCodec(parent, io_ts_1.PartialType)) {
            return `${getFlattenedCodecName(codec)} | undefined`;
        }
    }
    return `${getFlattenedCodecName(codec)}`;
}
function getMessage(e) {
    const expectedType = getContextTypeName(e.context);
    const contextPath = getContextPath(e.context);
    const expectedMessage = expectedType !== contextPath ? `${expectedType} for ${contextPath}` : expectedType;
    return e.message !== undefined ? e.message : `Expected type ${expectedMessage}, but got: ${(0, string_1.stringify)(e.value)}`;
}
exports.getMessage = getMessage;
exports.SimpleReporter = {
    report: (validation) => validation.fold((es) => es.map(getMessage), () => ['No errors!']),
};
/**
 * Throws a type error if `value` isn't conformant to type `T`.
 *
 * @param typeCodec - An io-ts type codec for T
 * @param value - The value to check
 * @returns The decoded value
 * @throws TypeError when assertion fails
 */
function assertType(typeCodec, value, description = 'type', ErrorType = TypeError) {
    const validation = typeCodec.decode(value);
    if (validation.isLeft()) {
        throw new ErrorType(`Invalid ${description} - ${exports.SimpleReporter.report(validation)[0]}`);
    }
    return validation.value;
}
exports.assertType = assertType;
//# sourceMappingURL=validation.js.map