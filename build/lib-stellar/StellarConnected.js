"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarConnected = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const types_1 = require("./types");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const helpers_1 = require("./helpers");
class StellarConnected {
    constructor(config = {}) {
        (0, ts_common_1.assertType)(types_1.BaseStellarConfig, config);
        this.networkType = config.network || constants_1.DEFAULT_NETWORK;
        this.logger = new ts_common_1.DelegateLogger(config.logger, constants_1.PACKAGE_NAME);
        const { api, server } = (0, utils_1.resolveStellarServer)(config, this.networkType);
        this.api = api;
        this.server = server;
    }
    getApi() {
        if (this.api === null) {
            throw new Error('Cannot access stellar network when configured with null server');
        }
        return this.api;
    }
    async init() { }
    async destroy() { }
    async _retryDced(fn) {
        return (0, utils_1.retryIfDisconnected)(fn, this.getApi(), this.logger);
    }
    async getBlock(id) {
        let query = this.getApi().ledgers().order('desc').limit(1);
        if (id) {
            query = query.ledger(id);
        }
        const ledgerCallResult = await lib_common_1.limiter.schedule(() => query.call());
        let raw;
        if (ledgerCallResult.records) {
            raw = ledgerCallResult.records[0];
        }
        else if ((0, utils_1.isStellarLedger)(ledgerCallResult)) {
            raw = ledgerCallResult;
        }
        else {
            this.logger.log(`getBlock(${id || ''}) ledgerCallResult`, ledgerCallResult);
            throw new Error(`Cannot get stellar ledger ${id || 'head'}`);
        }
        return {
            id: raw.hash,
            height: raw.sequence,
            previousId: raw.prev_hash,
            time: new Date(raw.closed_at),
            raw,
        };
    }
    async _normalizeTxOperation(tx) {
        const opPage = await lib_common_1.limiter.schedule(() => this.getApi().operations().forTransaction(tx.id).call());
        const op = opPage.records.find(({ type }) => type === 'create_account' || type === 'payment');
        if (!op) {
            throw new Error(`Cannot normalize stellar tx - operation not found for transaction ${tx.id}`);
        }
        let fromAddress;
        let toAddress;
        let amount;
        if (op.type === 'create_account') {
            fromAddress = op.funder;
            toAddress = op.account;
            amount = op.starting_balance;
        }
        else if (op.type === 'payment') {
            if (op.asset_type !== 'native') {
                throw new Error(`Cannot normalize stellar tx - Unsupported stellar payment asset ${op.asset_type}`);
            }
            fromAddress = op.from;
            toAddress = op.to;
            amount = op.amount;
        }
        else {
            throw new Error(`Cannot normalize stellar tx - Unsupported stellar operation type ${op.type}`);
        }
        const fee = (0, helpers_1.toMainDenominationBigNumber)(tx.fee_charged);
        return { amount: new lib_common_1.BigNumber(amount), fee, fromAddress, toAddress };
    }
}
exports.StellarConnected = StellarConnected;
//# sourceMappingURL=StellarConnected.js.map