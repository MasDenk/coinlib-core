"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglesigBitcoinPayments = void 0;
const types_1 = require("./types");
const helpers_1 = require("./helpers");
const BaseBitcoinPayments_1 = require("./BaseBitcoinPayments");
const constants_1 = require("./constants");
const bitcoinish_1 = require("./bitcoinish");
class SinglesigBitcoinPayments extends BaseBitcoinPayments_1.BaseBitcoinPayments {
    constructor(config) {
        super(config);
        this.addressType = config.addressType || constants_1.DEFAULT_SINGLESIG_ADDRESS_TYPE;
    }
    getPaymentScript(index, addressType) {
        return (0, helpers_1.getSinglesigPaymentScript)(this.bitcoinjsNetwork, addressType || this.addressType, this.getKeyPair(index).publicKey);
    }
    signMultisigTransaction(tx) {
        return (0, bitcoinish_1.signMultisigTransaction)(tx, this);
    }
    async signTransaction(tx) {
        return (0, bitcoinish_1.signTransaction)(tx, this);
    }
    getSupportedAddressTypes() {
        return [types_1.AddressType.Legacy, types_1.AddressType.SegwitNative, types_1.AddressType.SegwitP2SH];
    }
}
exports.SinglesigBitcoinPayments = SinglesigBitcoinPayments;
//# sourceMappingURL=SinglesigBitcoinPayments.js.map