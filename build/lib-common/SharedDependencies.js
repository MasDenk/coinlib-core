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
exports.ecc = exports.ecpair = exports.bip32 = exports.BigNumber = void 0;
/*
 *  This files includes all shared dependencies across packages
 *  Centralized dependencies can guarantee the version consistency
 */
const bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.BigNumber = bignumber_js_1.default;
const bip32_1 = require("bip32");
const ecpair_1 = require("ecpair");
const ecc = __importStar(require("tiny-secp256k1"));
exports.ecc = ecc;
const bip32 = (0, bip32_1.BIP32Factory)(ecc);
exports.bip32 = bip32;
const ecpair = (0, ecpair_1.ECPairFactory)(ecc);
exports.ecpair = ecpair;
//# sourceMappingURL=SharedDependencies.js.map