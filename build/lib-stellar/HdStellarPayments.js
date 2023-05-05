"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdStellarPayments = void 0;
const bip44_1 = require("./bip44");
const AccountStellarPayments_1 = require("./AccountStellarPayments");
class HdStellarPayments extends AccountStellarPayments_1.AccountStellarPayments {
    constructor({ seed, ...config }) {
        super({
            ...config,
            hotAccount: (0, bip44_1.deriveSignatory)(seed, 0),
            depositAccount: (0, bip44_1.deriveSignatory)(seed, 1),
        });
        this.seed = seed;
    }
}
exports.HdStellarPayments = HdStellarPayments;
HdStellarPayments.generateMnemonic = bip44_1.generateMnemonic;
//# sourceMappingURL=HdStellarPayments.js.map