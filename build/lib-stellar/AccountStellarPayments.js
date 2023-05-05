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
exports.AccountStellarPayments = void 0;
const types_1 = require("./types");
const BaseStellarPayments_1 = require("./BaseStellarPayments");
const ts_common_1 = require("../ts-common");
const helpers_1 = require("./helpers");
const Stellar = __importStar(require("stellar-sdk"));
class AccountStellarPayments extends BaseStellarPayments_1.BaseStellarPayments {
    constructor(config) {
        super(config);
        this.readOnly = false;
        (0, ts_common_1.assertType)(types_1.AccountStellarPaymentsConfig, config);
        this.hotSignatory = this.accountConfigToSignatory(config.hotAccount);
        this.depositSignatory = this.accountConfigToSignatory(config.depositAccount);
    }
    accountConfigToSignatory(accountConfig) {
        if (types_1.PartialStellarSignatory.is(accountConfig)) {
            if (!accountConfig.secret) {
                if (!accountConfig.address) {
                    throw new Error('Invalid StellarSecretPair, either secret or address required');
                }
                this.readOnly = true;
                return {
                    address: accountConfig.address,
                    secret: '',
                };
            }
            const keyPair = Stellar.Keypair.fromSecret(accountConfig.secret);
            return {
                address: keyPair.publicKey(),
                secret: keyPair.secret(),
            };
        }
        else if ((0, helpers_1.isValidAddress)(accountConfig)) {
            this.readOnly = true;
            return {
                address: accountConfig,
                secret: '',
            };
        }
        else if ((0, helpers_1.isValidSecret)(accountConfig)) {
            const keyPair = Stellar.Keypair.fromSecret(accountConfig);
            return {
                address: keyPair.publicKey(),
                secret: keyPair.secret(),
            };
        }
        throw new Error('Invalid stellar account config provided to stellar payments');
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
            throw new Error(`Invalid stellar payments accountId index ${index}`);
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
exports.AccountStellarPayments = AccountStellarPayments;
//# sourceMappingURL=AccountStellarPayments.js.map