"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdEthereumPayments = void 0;
const BaseEthereumPayments_1 = require("./BaseEthereumPayments");
const bip44_1 = require("./bip44");
const lodash_1 = require("lodash");
const constants_1 = require("./constants");
class HdEthereumPayments extends BaseEthereumPayments_1.BaseEthereumPayments {
    constructor(config) {
        super(config);
        try {
            this.xprv = '';
            this.xpub = '';
            if (this.isValidXpub(config.hdKey)) {
                this.xpub = config.hdKey;
            }
            else if (this.isValidXprv(config.hdKey)) {
                this.xprv = config.hdKey;
                this.xpub = (0, bip44_1.deriveSignatory)(config.hdKey, 0).xkeys.xpub;
            }
            else {
                throw new Error(config.hdKey);
            }
        }
        catch (e) {
            throw new Error(`Account must be a valid xprv or xpub: ${e.message}`);
        }
    }
    static generateNewKeys() {
        return (0, bip44_1.deriveSignatory)();
    }
    getXpub() {
        return this.xpub;
    }
    getPublicConfig() {
        return {
            ...(0, lodash_1.omit)(this.getFullConfig(), constants_1.PUBLIC_CONFIG_OMIT_FIELDS),
            depositKeyIndex: this.depositKeyIndex,
            hdKey: this.getXpub(),
        };
    }
    getAccountId(index) {
        return this.getXpub();
    }
    getAccountIds() {
        return [this.getXpub()];
    }
    async getPayport(index) {
        const { address } = (0, bip44_1.deriveSignatory)(this.getXpub(), index);
        if (!this.isValidAddress(address)) {
            // This should never happen
            throw new Error(`Cannot get address ${index} - validation failed for derived address`);
        }
        return { address };
    }
    async getPrivateKey(index) {
        if (!this.xprv) {
            throw new Error(`Cannot get private key ${index} - HdEthereumPayments was created with an xpub`);
        }
        return (0, bip44_1.deriveSignatory)((0, bip44_1.deriveSignatory)(this.xprv, 0).xkeys.xprv, index).keys.prv;
    }
}
exports.HdEthereumPayments = HdEthereumPayments;
exports.default = HdEthereumPayments;
//# sourceMappingURL=HdEthereumPayments.js.map