"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RippleBalanceMonitor = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const utils_1 = require("./utils");
const helpers_1 = require("./helpers");
const RippleConnected_1 = require("./RippleConnected");
const constants_1 = require("./constants");
class RippleBalanceMonitor extends RippleConnected_1.RippleConnected {
    constructor(config) {
        super(config);
        this.config = config;
    }
    async subscribeAddresses(addresses) {
        for (const address of addresses) {
            (0, helpers_1.assertValidAddress)(address);
        }
        try {
            const res = await lib_common_1.limiter.schedule(() => this.api.request('subscribe', { accounts: addresses }));
            if (res.status === 'success') {
                this.logger.log('Ripple successfully subscribed', res);
            }
            else {
                this.logger.warn('Ripple subscribe unsuccessful', res);
            }
        }
        catch (e) {
            this.logger.error('Failed to subscribe to ripple addresses', e.toString());
            throw e;
        }
    }
    onBalanceActivity(callbackFn) {
        this.api.connection.on('transaction', (tx) => {
            this.txToBalanceActivity(tx.address, tx)
                .then((activity) => {
                if (activity) {
                    return callbackFn(activity);
                }
            })
                .catch((e) => this.logger.warn(`Error in onBalanceActivity handling ripple connection transaction event`));
        });
    }
    async resolveFromToLedgers(options) {
        const serverInfo = await lib_common_1.limiter.schedule(() => this.api.getServerInfo());
        const completeLedgers = serverInfo.completeLedgers.split('-');
        let fromLedgerVersion = new lib_common_1.BigNumber(completeLedgers[0]);
        let toLedgerVersion = new lib_common_1.BigNumber(completeLedgers[1]);
        const { from, to } = options;
        const requestedFrom = (0, ts_common_1.isUndefined)(from)
            ? undefined
            : new lib_common_1.BigNumber(ts_common_1.Numeric.is(from) ? from : from.confirmationNumber);
        const requestedTo = (0, ts_common_1.isUndefined)(to) ? undefined : new lib_common_1.BigNumber(ts_common_1.Numeric.is(to) ? to : to.confirmationNumber);
        if (!(0, ts_common_1.isUndefined)(requestedFrom)) {
            if (requestedFrom.lt(fromLedgerVersion)) {
                this.logger.warn(`Server balance activity doesn't go back to ledger ${requestedFrom}, using ${fromLedgerVersion} instead`);
            }
            else {
                fromLedgerVersion = requestedFrom;
            }
        }
        if (!(0, ts_common_1.isUndefined)(requestedTo)) {
            if (requestedTo > toLedgerVersion) {
                this.logger.warn(`Server balance activity doesn't go up to ledger ${requestedTo}, using ${toLedgerVersion} instead`);
            }
            else {
                toLedgerVersion = requestedTo;
            }
        }
        return {
            from: fromLedgerVersion,
            to: toLedgerVersion,
        };
    }
    async retrieveBalanceActivities(address, callbackFn, options = {}) {
        (0, helpers_1.assertValidAddress)(address);
        const { from, to } = await this.resolveFromToLedgers(options);
        const limit = 10;
        let lastTx;
        let transactions;
        while ((0, ts_common_1.isUndefined)(transactions) ||
            (transactions.length === limit && lastTx && to.gt(lastTx.outcome.ledgerVersion))) {
            const getTransactionOptions = {
                earliestFirst: true,
                excludeFailures: false,
                limit,
            };
            if (lastTx) {
                getTransactionOptions.start = lastTx.id;
            }
            else {
                getTransactionOptions.minLedgerVersion = from.toNumber();
                getTransactionOptions.maxLedgerVersion = to.toNumber();
            }
            try {
                transactions = await lib_common_1.limiter.schedule(() => this.api.getTransactions(address, getTransactionOptions));
            }
            catch (e) {
                if ((0, lib_common_1.isMatchingError)(e, constants_1.NOT_FOUND_ERRORS)) {
                    this.logger.debug(`Address ${address} not found`);
                    break;
                }
                throw e;
            }
            this.logger.debug(`retrieved ripple txs for ${address}`, transactions);
            for (const tx of transactions) {
                if ((lastTx && tx.id === lastTx.id) || from.gte(tx.outcome.ledgerVersion) || to.lte(tx.outcome.ledgerVersion)) {
                    continue;
                }
                const activity = await this.txToBalanceActivity(address, tx);
                if (activity) {
                    await callbackFn(activity);
                }
            }
            lastTx = transactions[transactions.length - 1];
        }
        return { from: from.toString(), to: to.toString() };
    }
    isPaymentTx(tx) {
        return tx.type === 'payment';
    }
    async txToBalanceActivity(address, tx) {
        if (!tx.outcome) {
            this.logger.warn('txToBalanceActivity received tx object without outcome!', tx);
            return [];
        }
        const txResult = tx.outcome.result;
        if (!(0, ts_common_1.isString)(txResult) || !(txResult.startsWith('tes') || txResult.startsWith('tec'))) {
            this.logger.log(`No balance activity for ripple tx ${tx.id} because status is ${txResult}`);
            return [];
        }
        const confirmationNumber = tx.outcome.ledgerVersion;
        const primarySequence = (0, utils_1.padLeft)(String(tx.outcome.ledgerVersion), 12, '0');
        const secondarySequence = (0, utils_1.padLeft)(String(tx.outcome.indexInLedger), 8, '0');
        const ledger = await lib_common_1.limiter.schedule(() => this.api.getLedger({ ledgerVersion: confirmationNumber }));
        const balanceChange = (tx.outcome.balanceChanges[address] || []).find(({ currency }) => currency === 'XRP');
        if (!balanceChange) {
            this.logger.log(`Cannot determine balanceChange for address ${address} in ripple tx ${tx.id} because there's no XRP entry`);
            return [];
        }
        const amount = balanceChange.value;
        const assetSymbol = balanceChange.currency;
        const type = amount.startsWith('-') ? 'out' : 'in';
        const tag = this.isPaymentTx(tx)
            ? (type === 'out' ? tx.specification.source : tx.specification.destination).tag
            : undefined;
        const tertiarySequence = type === 'out' ? '00' : '01';
        const activitySequence = `${primarySequence}.${secondarySequence}.${tertiarySequence}`;
        return [
            {
                type,
                networkType: this.networkType,
                networkSymbol: 'XRP',
                assetSymbol,
                address: address,
                extraId: !(0, ts_common_1.isUndefined)(tag) ? String(tag) : null,
                amount,
                externalId: tx.id,
                activitySequence,
                confirmationId: ledger.ledgerHash,
                confirmationNumber: String(confirmationNumber),
                timestamp: new Date(ledger.closeTime),
            },
        ];
    }
}
exports.RippleBalanceMonitor = RippleBalanceMonitor;
//# sourceMappingURL=RippleBalanceMonitor.js.map