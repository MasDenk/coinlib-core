"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdRipplePayments = void 0;
const BaseRipplePayments_1 = require("./BaseRipplePayments");
const bip44_1 = require("./bip44");
const helpers_1 = require("./helpers");
class HdRipplePayments extends BaseRipplePayments_1.BaseRipplePayments {
    constructor(config) {
        super(config);
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
        this.hotSignatory = (0, bip44_1.deriveSignatory)(config.hdKey, 0);
        this.depositSignatory = (0, bip44_1.deriveSignatory)(config.hdKey, 1);
    }
    isReadOnly() {
        return this.xprv === null;
    }
    getPublicAccountConfig() {
        return {
            hdKey: (0, bip44_1.xprvToXpub)(this.config.hdKey),
        };
    }
    getAccountIds() {
        return [this.xpub];
    }
    getAccountId(index) {
        return this.xpub;
    }
    getHotSignatory() {
        return this.hotSignatory;
    }
    getDepositSignatory() {
        return this.depositSignatory;
    }
}
exports.HdRipplePayments = HdRipplePayments;
HdRipplePayments.generateNewKeys = bip44_1.generateNewKeys;
//# sourceMappingURL=HdRipplePayments.js.map