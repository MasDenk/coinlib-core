"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdTronPayments = void 0;
const BaseTronPayments_1 = require("./BaseTronPayments");
const bip44_1 = require("./bip44");
const helpers_1 = require("./helpers");
const lodash_1 = require("lodash");
const constants_1 = require("./constants");
class HdTronPayments extends BaseTronPayments_1.BaseTronPayments {
    constructor(config) {
        super(config);
        this.config = config;
        if ((0, helpers_1.isValidXprv)(config.hdKey)) {
            this.xprv = config.hdKey;
            this.xpub = (0, bip44_1.xprvToXpub)(this.xprv);
        }
        else if ((0, helpers_1.isValidXpub)(config.hdKey)) {
            this.xprv = null;
            this.xpub = config.hdKey;
        }
        else {
            throw new Error('Account must be a valid xprv or xpub');
        }
    }
    getXpub() {
        return this.xpub;
    }
    getFullConfig() {
        return this.config;
    }
    getPublicConfig() {
        return {
            ...(0, lodash_1.omit)(this.config, constants_1.PUBLIC_CONFIG_OMIT_FIELDS),
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
        const xpub = this.getXpub();
        const address = (0, bip44_1.deriveAddress)(xpub, index);
        if (!(0, helpers_1.isValidAddress)(address)) {
            // This should never happen
            throw new Error(`Cannot get address ${index} - validation failed for derived address`);
        }
        return { address };
    }
    async getPrivateKey(index) {
        if (!this.xprv) {
            throw new Error(`Cannot get private key ${index} - HdTronPayments was created with an xpub`);
        }
        return (0, bip44_1.derivePrivateKey)(this.xprv, index);
    }
}
exports.HdTronPayments = HdTronPayments;
HdTronPayments.generateNewKeys = bip44_1.generateNewKeys;
exports.default = HdTronPayments;
//# sourceMappingURL=HdTronPayments.js.map