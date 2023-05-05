"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRipplePayments = void 0;
const types_1 = require("./types");
const BaseRipplePayments_1 = require("./BaseRipplePayments");
const ts_common_1 = require("../ts-common");
const helpers_1 = require("./helpers");
class AccountRipplePayments extends BaseRipplePayments_1.BaseRipplePayments {
    constructor(config) {
        super(config);
        this.readOnly = false;
        (0, ts_common_1.assertType)(types_1.AccountRipplePaymentsConfig, config);
        this.hotSignatory = this.accountConfigToSignatory(config.hotAccount);
        this.depositSignatory = this.accountConfigToSignatory(config.depositAccount);
    }
    accountConfigToSignatory(accountConfig) {
        if (types_1.RippleKeyPair.is(accountConfig)) {
            if (!accountConfig.privateKey) {
                this.readOnly = true;
            }
            const address = this.api.deriveAddress(accountConfig.publicKey);
            return {
                address,
                secret: accountConfig,
            };
        }
        else if (types_1.RippleSecretPair.is(accountConfig)) {
            if (!accountConfig.secret) {
                this.readOnly = true;
            }
            return accountConfig;
        }
        else if ((0, helpers_1.isValidAddress)(accountConfig)) {
            this.readOnly = true;
            return {
                address: accountConfig,
                secret: '',
            };
        }
        throw new Error('Invalid ripple account config provided to ripple payments');
    }
    isReadOnly() {
        return this.readOnly;
    }
    getPublicAccountConfig() {
        return {
            hotAccount: this.hotSignatory.address,
            depositAccount: this.depositSignatory.address,
        };
    }
    getAccountIds() {
        return [this.hotSignatory.address, this.depositSignatory.address];
    }
    getAccountId(index) {
        if (index < 0) {
            throw new Error(`Invalid ripple payments accountId index ${index}`);
        }
        if (index === 0) {
            return this.hotSignatory.address;
        }
        return this.depositSignatory.address;
    }
    getHotSignatory() {
        return this.hotSignatory;
    }
    getDepositSignatory() {
        return this.depositSignatory;
    }
}
exports.AccountRipplePayments = AccountRipplePayments;
//# sourceMappingURL=AccountRipplePayments.js.map