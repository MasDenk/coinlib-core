"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdLitecoinPayments = void 0;
const lodash_1 = require("lodash");
const ts_common_1 = require("../ts-common");
const lib_bitcoin_1 = require("../lib-bitcoin");
const bip44_1 = require("./bip44");
const types_1 = require("./types");
const SinglesigLitecoinPayments_1 = require("./SinglesigLitecoinPayments");
const constants_1 = require("./constants");
class HdLitecoinPayments extends SinglesigLitecoinPayments_1.SinglesigLitecoinPayments {
    constructor(config) {
        super(config);
        this.config = config;
        (0, ts_common_1.assertType)(types_1.HdLitecoinPaymentsConfig, config);
        this.derivationPath = config.derivationPath || constants_1.DEFAULT_DERIVATION_PATHS[this.addressType];
        if (this.isValidXpub(config.hdKey)) {
            this.xpub = config.hdKey;
            this.xprv = null;
        }
        else if (this.isValidXprv(config.hdKey)) {
            this.xpub = (0, bip44_1.xprvToXpub)(config.hdKey, this.derivationPath, this.networkType);
            this.xprv = config.hdKey;
        }
        else {
            const providedPrefix = config.hdKey.slice(0, 4);
            const validPrefixes = Array.from(new Set([
                lib_bitcoin_1.bitcoinish.bip32MagicNumberToPrefix(this.bitcoinjsNetwork.bip32.public),
                lib_bitcoin_1.bitcoinish.bip32MagicNumberToPrefix(this.bitcoinjsNetwork.bip32.private),
                'xprv',
                'xpub',
            ]).keys());
            let reason = '';
            if (!validPrefixes.includes(providedPrefix)) {
                reason = ` with prefix ${providedPrefix} but expected ${validPrefixes.join('|')}`;
            }
            else {
                reason = ` (${(0, bip44_1.validateHdKey)(config.hdKey, this.bitcoinjsNetwork)})`;
            }
            throw new Error(`Invalid ${this.networkType} hdKey provided to litecoin payments config${reason}`);
        }
        this.hdNode = (0, bip44_1.deriveHDNode)(config.hdKey, this.derivationPath, this.networkType);
    }
    isValidXprv(xprv) {
        return (0, bip44_1.isValidXprv)((0, bip44_1.convertXPrefixHdKeys)(xprv, this.bitcoinjsNetwork), this.bitcoinjsNetwork);
    }
    isValidXpub(xpub) {
        return (0, bip44_1.isValidXpub)((0, bip44_1.convertXPrefixHdKeys)(xpub, this.bitcoinjsNetwork), this.bitcoinjsNetwork);
    }
    getFullConfig() {
        return {
            ...this.config,
            network: this.networkType,
            addressType: this.addressType,
            derivationPath: this.derivationPath,
        };
    }
    getPublicConfig() {
        return {
            ...(0, lodash_1.omit)(this.getFullConfig(), lib_bitcoin_1.PUBLIC_CONFIG_OMIT_FIELDS),
            hdKey: this.xpub,
        };
    }
    getAccountId(index) {
        return this.xpub;
    }
    getAccountIds(index) {
        return [this.xpub];
    }
    getAddress(index) {
        var _a;
        return (0, bip44_1.deriveAddress)(this.hdNode, index, this.networkType, this.addressType, (_a = this.validAddressFormat) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_ADDRESS_FORMAT);
    }
    getKeyPair(index) {
        return (0, bip44_1.deriveKeyPair)(this.hdNode, index);
    }
}
exports.HdLitecoinPayments = HdLitecoinPayments;
//# sourceMappingURL=HdLitecoinPayments.js.map