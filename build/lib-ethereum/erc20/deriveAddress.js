"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveAddress = void 0;
// deterministically computes the smart contract deposit address given
// the account the will deploy the contract (factory contract)
// the salt as uint256 and the contract bytecode
const constants_1 = require("../constants");
const web3_1 = __importDefault(require("web3"));
const web3 = new web3_1.default();
function deriveAddress(creatorAddress, salt, hashed = false) {
    const address = creatorAddress.replace(/0x/, '').toLowerCase();
    const proxy = web3.utils
        .sha3(constants_1.TOKEN_PROXY_DATA.replace(/<address to proxy>/g, address))
        .replace(/0x/, '')
        .toLowerCase();
    let saltHash = (hashed ? salt : web3.utils.sha3(`0x${salt}`)).replace(/0x/, '').toLowerCase();
    while (saltHash.length < 64) {
        saltHash = `0${saltHash}`;
    }
    return `0x${web3.utils.sha3(`0xff${address}${saltHash}${proxy}`).slice(-40)}`.toLowerCase();
}
exports.deriveAddress = deriveAddress;
//# sourceMappingURL=deriveAddress.js.map