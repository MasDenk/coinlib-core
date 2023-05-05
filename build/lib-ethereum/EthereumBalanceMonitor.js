"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumBalanceMonitor = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const events_1 = require("events");
const lodash_1 = require("lodash");
const constants_1 = require("./constants");
const EthereumPaymentsUtils_1 = require("./EthereumPaymentsUtils");
const utils_1 = require("./utils");
class EthereumBalanceMonitor extends EthereumPaymentsUtils_1.EthereumPaymentsUtils {
    constructor() {
        super(...arguments);
        this.events = new events_1.EventEmitter();
    }
    async init() {
        await this.networkData.connectBlockBook();
    }
    async destroy() {
        this.events.removeAllListeners('tx');
        await this.networkData.disconnectBlockBook();
    }
    async getTxWithMemoization(txId, cache) {
        const memoizedTx = cache[txId];
        if (memoizedTx) {
            return memoizedTx;
        }
        const rawTx = await this.networkData.getTxRaw(txId);
        cache[txId] = rawTx;
        return rawTx;
    }
    async subscribeAddresses(addresses) {
        const validAddresses = addresses.filter((address) => this.isValidAddress(address));
        await this.networkData.subscribeAddresses(validAddresses, async (address, rawTx) => {
            this.events.emit('tx', { address, tx: rawTx });
            const activity = await this.txToBalanceActivity(address, rawTx);
            if (activity) {
                if (Array.isArray(activity)) {
                    for (const a of activity) {
                        this.events.emit(constants_1.BALANCE_ACTIVITY_EVENT, { activity: a, tx: rawTx });
                    }
                }
                else {
                    this.events.emit(constants_1.BALANCE_ACTIVITY_EVENT, { activity, tx: rawTx });
                }
            }
        });
    }
    onBalanceActivity(callbackFn) {
        this.events.on(constants_1.BALANCE_ACTIVITY_EVENT, ({ activity, tx }) => {
            const promise = callbackFn(activity, tx);
            if (promise) {
                promise.catch((e) => this.logger.error(`Error in ${this.coinSymbol} ${this.networkType} onBalanceActivity callback`, e));
            }
        });
    }
    async retrieveBalanceActivities(address, callbackFn, options) {
        const { from: fromOption, to: toOption } = options;
        const from = new lib_common_1.BigNumber((0, ts_common_1.isUndefined)(fromOption) ? 0 : ts_common_1.Numeric.is(fromOption) ? fromOption : fromOption.confirmationNumber).toNumber();
        const to = new lib_common_1.BigNumber((0, ts_common_1.isUndefined)(toOption) ? 'Infinity' : ts_common_1.Numeric.is(toOption) ? toOption.toString() : toOption.confirmationNumber).toNumber();
        let page = 1;
        const limit = 10;
        let transactionPage;
        let transactions;
        let lastTx;
        while ((0, ts_common_1.isUndefined)(transactionPage) ||
            transactionPage.page < transactionPage.totalPages ||
            transactionPage.totalPages === -1) {
            transactionPage = await this.networkData.getAddressDetails(address, {
                page,
                pageSize: limit,
                from,
                to: to < Infinity ? to : undefined,
                details: 'txs',
            });
            if (transactionPage.page !== page) {
                break;
            }
            transactions = transactionPage.transactions;
            this.logger.debug(`retrieved ${transactions === null || transactions === void 0 ? void 0 : transactions.length} txs for ${address} on page = ${page}`);
            if (!transactions || transactions.length === 0) {
                break;
            }
            for (const tx of transactions) {
                if (lastTx && tx.txid === lastTx.txid) {
                    this.logger.debug('ignoring duplicate tx', tx);
                    continue;
                }
                if (tx.blockHeight > 0 && (from > tx.blockHeight || to < tx.blockHeight)) {
                    this.logger.debug('ignoring out of range balance activity tx', tx);
                    continue;
                }
                const balanceActivities = await this.txToBalanceActivity(address, tx);
                await callbackFn(balanceActivities, tx);
            }
            lastTx = transactions[transactions.length - 1];
            page++;
        }
        return { from: from.toString(), to: to.toString() };
    }
    async getAllInvolvedAddresses(tx, cache) {
        const fromAddress = tx.from;
        const toAddress = tx.to;
        const involvedAddresses = new Set([fromAddress, toAddress]);
        const rawTx = await this.getTxWithMemoization(tx.txHash, cache);
        if (rawTx.tokenTransfers) {
            for (const tokenTransfer of rawTx.tokenTransfers) {
                involvedAddresses.add(tokenTransfer.from);
                involvedAddresses.add(tokenTransfer.to);
            }
        }
        return [...involvedAddresses];
    }
    async retrieveBlockBalanceActivities(blockId, callbackFn, filterRelevantAddresses) {
        var _a;
        const blockDetails = await this.networkData.getBlock(blockId);
        const transactions = (0, lodash_1.get)(blockDetails.raw, 'transactions', []);
        const addressTransactions = {};
        /**
         * The standardized tx may or may not contain the token transfers depending on which data source
         * was used to fetch the NetworkData, so we need to do a hard lookup from the blockbook api for each tx, then also memoize
         */
        const hardTxQueries = {};
        for (const tx of transactions) {
            // need to unwind all addresses involved in the tx, not just the from and to alone.
            const involvedAddresses = await this.getAllInvolvedAddresses(tx, hardTxQueries);
            for (const involvedAddress of involvedAddresses) {
                addressTransactions[involvedAddress] = ((_a = addressTransactions[involvedAddress]) !== null && _a !== void 0 ? _a : new Set()).add(tx);
            }
        }
        const relevantAddresses = await filterRelevantAddresses(Array.from(Object.keys(addressTransactions)), {
            ...blockDetails,
            page: 1,
        });
        for (const relevantAddress of relevantAddresses) {
            const relevantAddressTransactions = addressTransactions[relevantAddress];
            for (const { txHash } of relevantAddressTransactions) {
                const rawTx = await this.getTxWithMemoization(txHash, hardTxQueries);
                const balanceActivities = await this.txToBalanceActivity(relevantAddress, rawTx);
                await callbackFn(balanceActivities, rawTx);
            }
        }
        return blockDetails;
    }
    getActivityType(activityAddress, { txFromAddress, txToAddress, txHash }) {
        let type;
        const isSender = this.isAddressEqual(activityAddress, txFromAddress);
        const isRecipient = this.isAddressEqual(activityAddress, txToAddress);
        if (isSender) {
            type = 'out';
        }
        else if (isRecipient) {
            type = 'in';
        }
        if (!type) {
            throw new Error(`Unable to resolve balanceActivity type, address = ${activityAddress}, txHash=${txHash}`);
        }
        return type;
    }
    getSelfBalanceActivities(baseBalanceActivity, fee) {
        const inBalanceActivityEntry = {
            ...baseBalanceActivity,
            type: 'in',
        };
        const outBalanceActivityEntry = {
            ...baseBalanceActivity,
            type: 'out',
            amount: new lib_common_1.BigNumber(baseBalanceActivity.amount).negated().toString(),
        };
        const feeBalanceActivityEntry = {
            ...baseBalanceActivity,
            type: 'fee',
            amount: this.toMainDenomination(fee.negated()),
        };
        return [inBalanceActivityEntry, outBalanceActivityEntry, feeBalanceActivityEntry];
    }
    getBalanceActivityForNonTokenTransfer(address, tx, fee) {
        var _a;
        const { fromAddress, toAddress } = (0, utils_1.getBlockBookTxFromAndToAddress)(tx);
        const timestamp = new Date(tx.blockTime * 1000);
        const baseBalanceActivity = {
            networkType: this.networkType,
            networkSymbol: this.coinSymbol,
            assetSymbol: this.coinSymbol,
            address,
            externalId: tx.txid,
            activitySequence: String(tx.ethereumSpecific.nonce),
            confirmationId: (_a = tx.blockHash) !== null && _a !== void 0 ? _a : '',
            confirmationNumber: tx.blockHeight,
            timestamp,
            amount: this.toMainDenomination(tx.value),
            extraId: null,
            confirmations: tx.confirmations,
            type: 'fee', // this will eventually be replaced by the correct type
        };
        // it is possible for fromAddress = toAddress, etherscan.io describes this as a "self" transaction.
        if (this.isAddressEqual(fromAddress, toAddress)) {
            // in this case we'll return an in, out and fee balance activity
            return this.getSelfBalanceActivities(baseBalanceActivity, fee);
        }
        const type = this.getActivityType(address, { txFromAddress: fromAddress, txToAddress: toAddress, txHash: tx.txid });
        const balanceActivities = [];
        const balanceActivityEntry = {
            ...baseBalanceActivity,
            type,
        };
        if (balanceActivityEntry.type === 'out') {
            // negate the amount
            balanceActivityEntry.amount = new lib_common_1.BigNumber(balanceActivityEntry.amount).negated().toString();
            // add the fee balance activity as well;
            const feeBalanceActivityEntry = {
                ...baseBalanceActivity,
                type: 'fee',
                amount: this.toMainDenomination(fee.negated()),
            };
            balanceActivities.push(feeBalanceActivityEntry);
        }
        balanceActivities.push(balanceActivityEntry);
        return balanceActivities;
    }
    async txToBalanceActivity(address, tx) {
        var _a;
        const fee = new lib_common_1.BigNumber(tx.ethereumSpecific.gasPrice).multipliedBy(tx.ethereumSpecific.gasUsed);
        if (!tx.tokenTransfers || tx.tokenTransfers.length === 0) {
            return this.getBalanceActivityForNonTokenTransfer(address, tx, fee);
        }
        const nonce = String(tx.ethereumSpecific.nonce);
        const txHash = tx.txid;
        const timestamp = new Date(tx.blockTime * 1000);
        const balanceActivities = tx.tokenTransfers
            .filter((tokenTransfer) => {
            // we only care about token transfers where our known address is the sender or recipient
            const isSender = this.isAddressEqual(tokenTransfer.from, address);
            const isRecipient = this.isAddressEqual(tokenTransfer.to, address);
            return isSender || isRecipient;
        })
            .map((tokenTransfer) => {
            var _a;
            const type = this.getActivityType(address, {
                txFromAddress: tokenTransfer.from,
                txToAddress: tokenTransfer.to,
                txHash,
            });
            const unitConverter = this.getCustomUnitConverter(tokenTransfer.decimals);
            const balanceActivity = {
                type,
                networkType: this.networkType,
                networkSymbol: this.coinSymbol,
                assetSymbol: tokenTransfer.symbol,
                address,
                externalId: txHash,
                activitySequence: nonce,
                confirmationId: (_a = tx.blockHash) !== null && _a !== void 0 ? _a : '',
                confirmationNumber: tx.blockHeight,
                timestamp,
                amount: unitConverter.toMainDenominationString(tokenTransfer.value),
                extraId: null,
                confirmations: tx.confirmations,
                tokenAddress: this.formatAddress(tokenTransfer.token),
            };
            if (balanceActivity.type === 'out') {
                balanceActivity.amount = new lib_common_1.BigNumber(balanceActivity.amount).negated().toString();
            }
            return balanceActivity;
        });
        const { fromAddress } = (0, utils_1.getBlockBookTxFromAndToAddress)(tx);
        const isTxSender = this.isAddressEqual(fromAddress, address);
        if (isTxSender) {
            // add the balance activity for the fee
            const feeBalanceActivityEntry = {
                networkType: this.networkType,
                networkSymbol: this.coinSymbol,
                assetSymbol: this.coinSymbol,
                address,
                externalId: tx.txid,
                activitySequence: String(tx.ethereumSpecific.nonce),
                confirmationId: (_a = tx.blockHash) !== null && _a !== void 0 ? _a : '',
                confirmationNumber: tx.blockHeight,
                timestamp,
                extraId: null,
                confirmations: tx.confirmations,
                type: 'fee',
                amount: this.toMainDenomination(fee.negated()),
            };
            balanceActivities.push(feeBalanceActivityEntry);
        }
        return balanceActivities;
    }
    async subscribeNewBlock(callbackFn) {
        await this.networkData.subscribeNewBlock(callbackFn);
    }
}
exports.EthereumBalanceMonitor = EthereumBalanceMonitor;
//# sourceMappingURL=EthereumBalanceMonitor.js.map