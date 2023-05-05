"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdErc20Payments = void 0;
const lodash_1 = require("lodash");
const constants_1 = require("../constants");
const BaseErc20Payments_1 = require("./BaseErc20Payments");
const bip44_1 = require("../bip44");
const deriveAddress_1 = require("./deriveAddress");
class HdErc20Payments extends BaseErc20Payments_1.BaseErc20Payments {
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
            tokenAddress: this.tokenAddress.toLowerCase(),
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
    getAddressSalt(index) {
        const key = (0, bip44_1.deriveSignatory)(this.getXpub(), index).keys.pub;
        const salt = this.web3.utils.sha3(`0x${key}`);
        if (!salt) {
            throw new Error(`Cannot get address salt for index ${index}`);
        }
        return salt;
    }
    async getPayport(index) {
        const signatory = (0, bip44_1.deriveSignatory)(this.getXpub(), index);
        if (index === 0) {
            return { address: signatory.address };
        }
        if (!this.masterAddress) {
            throw new Error(`Cannot derive payport ${index} - masterAddress is falsy`);
        }
        const address = (0, deriveAddress_1.deriveAddress)(this.masterAddress, signatory.keys.pub);
        if (!this.isValidAddress(address)) {
            // This should never happen
            throw new Error(`Cannot get address ${index} - validation failed for derived address`);
        }
        const { address: signerAddress } = (0, bip44_1.deriveSignatory)(this.getXpub(), this.depositKeyIndex);
        return { address, signerAddress };
    }
    async getPrivateKey(index) {
        if (!this.xprv) {
            throw new Error(`Cannot get private key ${index} - HdEthereumPayments was created with an xpub`);
        }
        return (0, bip44_1.deriveSignatory)((0, bip44_1.deriveSignatory)(this.xprv, 0).xkeys.xprv, index).keys.prv;
    }
}
exports.HdErc20Payments = HdErc20Payments;
exports.default = HdErc20Payments;
//# sourceMappingURL=HdErc20Payments.js.map