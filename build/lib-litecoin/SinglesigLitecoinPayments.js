"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglesigLitecoinPayments = void 0;
const types_1 = require("./types");
const lib_bitcoin_1 = require("../lib-bitcoin");
const BaseLitecoinPayments_1 = require("./BaseLitecoinPayments");
const constants_1 = require("./constants");
class SinglesigLitecoinPayments extends BaseLitecoinPayments_1.BaseLitecoinPayments {
    constructor(config) {
        super(config);
        this.addressType = config.addressType || constants_1.DEFAULT_SINGLESIG_ADDRESS_TYPE;
    }
    getPaymentScript(index) {
        return lib_bitcoin_1.bitcoinish.getSinglesigPaymentScript(this.bitcoinjsNetwork, this.addressType, this.getKeyPair(index).publicKey);
    }
    signMultisigTransaction(tx) {
        return lib_bitcoin_1.bitcoinish.signMultisigTransaction(tx, this);
    }
    async signTransaction(tx) {
        return lib_bitcoin_1.bitcoinish.signTransaction(tx, this);
    }
    getSupportedAddressTypes() {
        return [types_1.AddressType.Legacy, types_1.AddressType.SegwitNative, types_1.AddressType.SegwitNative];
    }
}
exports.SinglesigLitecoinPayments = SinglesigLitecoinPayments;
//# sourceMappingURL=SinglesigLitecoinPayments.js.map