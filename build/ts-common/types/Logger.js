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
exports.Logger = void 0;
const t = __importStar(require("io-ts"));
const LoggerCodec = t.type({
    error: t.Function,
    warn: t.Function,
    info: t.Function,
    log: t.Function,
    debug: t.Function,
    trace: t.Function,
}, 'Logger');
class LoggerType extends t.Type {
    constructor() {
        super('Logger', (u) => LoggerCodec.is(u), (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)), t.identity);
        this._tag = 'LoggerType';
    }
}
exports.Logger = new LoggerType();
//# sourceMappingURL=Logger.js.map