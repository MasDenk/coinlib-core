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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateT = exports.DateType = void 0;
const t = __importStar(require("io-ts"));
class DateType extends t.Type {
    constructor() {
        super('Date', (u) => u instanceof Date, (u, c) => {
            if (this.is(u)) {
                return t.success(u);
            }
            else if (t.number.is(u) || t.string.is(u)) {
                const date = new Date(u);
                if (Number.isNaN(date.getTime())) {
                    return t.failure(u, c);
                }
                else {
                    return t.success(date);
                }
            }
            else {
                return t.failure(u, c);
            }
        }, t.identity);
        this._tag = 'DateType';
    }
}
exports.DateType = DateType;
exports.DateT = new DateType();
//# sourceMappingURL=Date.js.map