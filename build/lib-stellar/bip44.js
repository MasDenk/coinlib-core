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
exports.mnemonicToSeed = exports.generateMnemonic = exports.deriveSignatory = void 0;
const stellar_hd_wallet_1 = __importDefault(require("stellar-hd-wallet"));
const bip39 = __importStar(require("bip39"));
function deriveSignatory(seed, index) {
    const wallet = seed.includes(' ') ? stellar_hd_wallet_1.default.fromMnemonic(seed) : stellar_hd_wallet_1.default.fromSeed(seed);
    const keypair = wallet.getKeypair(index);
    const secret = keypair.secret();
    const address = keypair.publicKey();
    return {
        address,
        secret,
    };
}
exports.deriveSignatory = deriveSignatory;
function generateMnemonic() {
    return stellar_hd_wallet_1.default.generateMnemonic();
}
exports.generateMnemonic = generateMnemonic;
function mnemonicToSeed(mnemonic) {
    return bip39.mnemonicToSeedSync(mnemonic).toString('hex');
}
exports.mnemonicToSeed = mnemonicToSeed;
//# sourceMappingURL=bip44.js.map