"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinishBalanceMonitor = void 0;
const lib_common_1 = require("../../lib-common");
const events_1 = require("events");
const ts_common_1 = require("../../ts-common");
const BlockbookConnected_1 = require("./BlockbookConnected");
const lodash_1 = require("lodash");
class BitcoinishBalanceMonitor extends BlockbookConnected_1.BlockbookConnected {
    constructor(config) {
        super(config);
        this.events = new events_1.EventEmitter();
        this.utils = config.utils;
        this.coinName = config.utils.coinName;
        this.coinSymbol = config.utils.coinSymbol;
    }
    async destroy() {
        this.events.removeAllListeners('tx');
        await super.destroy();
    }
    async subscribeAddresses(addresses) {
        for (const address of addresses) {
            this.utils.validateAddress(address);
        }
        await this.getApi().subscribeAddresses(addresses, async ({ address, tx }) => {
            this.events.emit('tx', { address, tx });
            const activity = await this.txToBalanceActivity(address, tx);
            if (activity) {
                this.events.emit('activity', { activity, tx });
            }
        });
    }
    async subscribeNewBlock(callbackFn) {
        await this.getApi().subscribeNewBlock(callbackFn);
    }
    onBalanceActivity(callbackFn) {
        this.events.on('activity', ({ activity, tx }) => {
            const promiseOrVoid = callbackFn(activity, tx);
            if (promiseOrVoid) {
                promiseOrVoid.catch((e) => this.logger.error(`Error in ${this.coinSymbol} ${this.networkType} onBalanceActivity callback`, e));
            }
        });
    }
    accumulateAddressTx(addressTransactions, tx, inout) {
        var _a, _b;
        if (!(inout.isAddress && ((_a = inout.addresses) === null || _a === void 0 ? void 0 : _a.length))) {
            return;
        }
        const address = this.utils.standardizeAddress(inout.addresses[0]);
        if (address === null) {
            return;
        }
        ;
        (addressTransactions[address] = (_b = addressTransactions[address]) !== null && _b !== void 0 ? _b : new Set()).add(tx);
    }
    async retrieveBlockBalanceActivities(blockId, callbackFn, filterRelevantAddresses) {
        var _a, _b;
        let page = 1;
        let blockRaw;
        let blockInfoResult;
        while (!blockRaw || blockRaw.page < blockRaw.totalPages) {
            const getBlockResult = await this.utils.getBlock(blockId, { page, includeTxs: true });
            blockInfoResult = (0, lodash_1.omit)(getBlockResult, ['raw.txs']); // omit large tx list from returned/cb value
            blockRaw = getBlockResult.raw;
            if (!(blockRaw === null || blockRaw === void 0 ? void 0 : blockRaw.txs)) {
                this.logger.log(`No transactions returned for page ${page} of block ${blockId}`);
                break;
            }
            // Aggregate all block txs by the addresses they apply to
            const addressTransactions = {};
            for (const tx of blockRaw.txs) {
                for (const input of tx.vin) {
                    this.accumulateAddressTx(addressTransactions, tx, input);
                }
                for (const output of tx.vout) {
                    this.accumulateAddressTx(addressTransactions, tx, output);
                }
            }
            // Emit events for all address/tx combinations
            const relevantAddresses = new Set(await filterRelevantAddresses(Array.from(Object.keys(addressTransactions)), { ...blockInfoResult, page }));
            /**
             * Block tx data doesn't always include input txids which is needed for determining utxosSpent.
             * Hard lookup is needed for each tx, memoize to avoid redundant lookups.
             */
            const hardTxQueries = {};
            for (const address of relevantAddresses) {
                const txs = (_a = addressTransactions[address]) !== null && _a !== void 0 ? _a : [];
                for (const { txid } of txs) {
                    const tx = ((_b = hardTxQueries[txid]) !== null && _b !== void 0 ? _b : (hardTxQueries[txid] = await lib_common_1.limiter.schedule(() => this.getApi().getTx(txid))));
                    const activity = await this.txToBalanceActivity(address, tx);
                    if (activity) {
                        await callbackFn(activity, tx);
                    }
                }
            }
            page++;
        }
        return blockInfoResult;
    }
    async retrieveBalanceActivities(address, callbackFn, options = {}) {
        this.utils.validateAddress(address);
        const { from: fromOption, to: toOption } = options;
        const from = new lib_common_1.BigNumber((0, ts_common_1.isUndefined)(fromOption) ? 0 : ts_common_1.Numeric.is(fromOption) ? fromOption : fromOption.confirmationNumber).toNumber();
        const to = new lib_common_1.BigNumber((0, ts_common_1.isUndefined)(toOption) ? 'Infinity' : ts_common_1.Numeric.is(toOption) ? toOption.toString() : toOption.confirmationNumber).toNumber();
        let page = 1;
        const limit = 10;
        let lastTx;
        let transactionPage;
        let transactions;
        while ((0, ts_common_1.isUndefined)(transactionPage) ||
            transactionPage.page < transactionPage.totalPages ||
            transactionPage.totalPages === -1) {
            transactionPage = await lib_common_1.limiter.schedule(() => this.getApi().getAddressDetails(address, {
                details: 'txs',
                page,
                pageSize: limit,
                from,
                to: to < Infinity ? to : undefined,
            }));
            if (transactionPage.page !== page) {
                // Websocket pagination has totalPages === -1 so only way to detect break point is by retrieving
                // the next page and checking if it was actually returned.
                break;
            }
            transactions = transactionPage.transactions;
            this.logger.debug(`retrieved txs for ${address}`, transactions);
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
                const activity = await this.txToBalanceActivity(address, tx);
                if (activity) {
                    await callbackFn(activity, tx);
                }
            }
            lastTx = transactions[transactions.length - 1];
            page++;
        }
        return { from: from.toString(), to: to.toString() };
    }
    extractStandardAddress(v) {
        var _a;
        const address = v.isAddress && ((_a = v.addresses) === null || _a === void 0 ? void 0 : _a[0]);
        return address ? this.utils.standardizeAddress(address) : null;
    }
    async txToBalanceActivity(address, tx) {
        var _a, _b, _c;
        const externalId = tx.txid;
        const confirmationNumber = tx.blockHeight;
        const standardizedAddress = this.utils.standardizeAddress(address);
        if (standardizedAddress === null) {
            this.logger.warn(`Cannot standardize ${this.coinName} address, likely invalid: ${address}`);
            return [];
        }
        let netSatoshis = new lib_common_1.BigNumber(0); // balance increase (positive), or decreased (negative)
        const utxosSpent = [];
        const utxosCreated = [];
        for (const input of tx.vin) {
            // sometimes input.value can be undefined for coinbase block
            const inputValue = (_a = input.value) !== null && _a !== void 0 ? _a : '0';
            if (this.extractStandardAddress(input) === standardizedAddress) {
                netSatoshis = netSatoshis.minus(inputValue);
                const inputTxid = input.txid;
                if (!inputTxid) {
                    this.logger.log(`Tx ${tx.txid} input ${input.n} has no txid or vout`, input);
                    continue;
                }
                const vout = (_b = input.vout) !== null && _b !== void 0 ? _b : 0;
                const inputTxInfo = await lib_common_1.limiter.schedule(() => this.getApi().getTx(inputTxid));
                const output = inputTxInfo.vout[vout];
                utxosSpent.push({
                    txid: inputTxid,
                    vout,
                    satoshis: new lib_common_1.BigNumber(inputValue).toNumber(),
                    value: this.utils.toMainDenominationString(inputValue),
                    confirmations: inputTxInfo.confirmations,
                    height: inputTxInfo.blockHeight > 0 ? String(inputTxInfo.blockHeight) : undefined,
                    coinbase: !input.isAddress && input.value === '0',
                    lockTime: inputTxInfo.lockTime ? String(inputTxInfo.lockTime) : undefined,
                    txHex: inputTxInfo.hex,
                    scriptPubKeyHex: output.hex,
                    address: standardizedAddress,
                    spent: true,
                });
            }
        }
        for (const output of tx.vout) {
            if (this.extractStandardAddress(output) === standardizedAddress) {
                netSatoshis = netSatoshis.plus(output.value);
                utxosCreated.push(this.utils.txVoutToUtxoInfo(tx, output));
            }
        }
        if (!(utxosSpent.length || utxosCreated.length)) {
            // Theoretically, netSatoshis could be 0, however unlikely, and the tx may still affect the address' utxos.
            // Only return null if the tx has no effect on the address' utxos.
            this.logger.log(`${this.coinName} transaction ${externalId} does not affect balance of ${standardizedAddress}`, tx);
            return [];
        }
        return [
            {
                type: netSatoshis.gt(0) ? 'in' : 'out',
                networkType: this.networkType,
                networkSymbol: this.coinSymbol,
                assetSymbol: this.coinSymbol,
                address: address,
                extraId: null,
                amount: this.utils.toMainDenominationString(netSatoshis),
                externalId: tx.txid,
                activitySequence: '',
                confirmationId: (_c = tx.blockHash) !== null && _c !== void 0 ? _c : '',
                confirmationNumber: confirmationNumber > 0 ? confirmationNumber : -1,
                confirmations: tx.confirmations,
                timestamp: new Date(tx.blockTime * 1000),
                utxosSpent,
                utxosCreated,
            },
        ];
    }
}
exports.BitcoinishBalanceMonitor = BitcoinishBalanceMonitor;
//# sourceMappingURL=BitcoinishBalanceMonitor.js.map