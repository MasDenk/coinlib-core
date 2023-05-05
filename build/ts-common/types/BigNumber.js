"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigNumberT = void 0;
const t = __importStar(require("io-ts"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class BigNumberType extends t.Type {
    constructor() {
        super('BigNumberT', bignumber_js_1.default.isBigNumber, (u, c) => {
            if (u instanceof bignumber_js_1.default) {
                return t.success(u);
            }
            else if (bignumber_js_1.default.isBigNumber(u)) {
                // In some cases duplicate bignumber dependencies may exist and the instances won't match despite being
                // nearly identical. Fortunately bignumber.js provides an `isBigNumber` helper to detect this.
                // Recreate the instance so all BigNumbers are the same exact type.
                return t.success(new bignumber_js_1.default(u));
            }
            else if (t.number.is(u)) {
                return t.success(new bignumber_js_1.default(u));
            }
            else if (t.string.is(u)) {
                const v = new bignumber_js_1.default(u);
                if (v.isNaN()) {
                    return t.failure(u, c);
                }
                else {
                    return t.success(v);
                }
            }
            else {
                return t.failure(u, c);
            }
        }, (u) => u.toString());
        this._tag = 'BigNumberType';
    }
}
/**
 * An io-ts codec representing a BigNumber. Can also be decoded from a string or number.
 */
exports.BigNumberT = new BigNumberType();
//# sourceMappingURL=BigNumber.js.map