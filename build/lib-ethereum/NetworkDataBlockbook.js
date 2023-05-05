"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkDataBlockbook = void 0;
const lib_common_1 = require("../lib-common");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
class NetworkDataBlockbook {
    constructor(config) {
        this.logger = config.logger;
        const { api } = (0, utils_1.resolveServer)(config, this.logger);
        this.api = api;
    }
    async init() {
        await this.api.connect();
    }
    async destroy() {
        await this.api.disconnect();
    }
    getApi() {
        if (!this.api) {
            throw new Error('Blockbook api is not initialized');
        }
        return this.api;
    }
    async getBlock(id) {
        const blockId = id !== null && id !== void 0 ? id : (await this.getCurrentBlockNumber());
        const block = await lib_common_1.limiter.schedule(() => this.api.getBlock(blockId));
        return this.standardizeBlock(block);
    }
    standardizeBlock(block) {
        var _a;
        const blockTime = new Date(Number(block.time) * 1000);
        const standardizedTransactions = ((_a = block.txs) !== null && _a !== void 0 ? _a : []).map((tx) => this.standardizeTransaction(tx, blockTime));
        const blockInfo = {
            height: block.height,
            id: block.hash,
            previousId: block.previousBlockHash,
            time: blockTime,
            raw: {
                ...block,
                transactions: standardizedTransactions,
                dataProvider: constants_1.NETWORK_DATA_PROVIDERS.BLOCKBOOK,
            },
        };
        return blockInfo;
    }
    async getCurrentBlockNumber() {
        const bestBlock = await lib_common_1.limiter.schedule(() => this.api.getBestBlock());
        return bestBlock.height;
    }
    async getTransaction(txId) {
        const tx = await lib_common_1.limiter.schedule(() => this.api.getTx(txId));
        return this.standardizeTransaction(tx);
    }
    async getAddressDetails(address, options) {
        return lib_common_1.limiter.schedule(() => this.api.getAddressDetails(address, options));
    }
    async getERC20Transaction(txId, tokenAddress) {
        var _a;
        const tx = await lib_common_1.limiter.schedule(() => this.api.getTx(txId));
        const txSpecific = await lib_common_1.limiter.schedule(() => this.api.getTxSpecific(txId));
        const tokenTransfers = (_a = tx.tokenTransfers) !== null && _a !== void 0 ? _a : [];
        if (tokenTransfers.length < 1) {
            throw new Error(`txId=${tx.txid} has no tokenTransfers`);
        }
        const transferredToken = tokenTransfers.find((transfer) => transfer.token.toLowerCase() === tokenAddress.toLowerCase());
        if (!transferredToken) {
            throw new Error(`tx tokenTransfer does not contain token=${tokenAddress}`);
        }
        return this.standardizeERC20Transaction({
            tx,
            txSpecific,
            tokenSymbol: transferredToken.symbol,
            tokenDecimals: transferredToken.decimals.toString(),
            tokenName: transferredToken.name,
        });
    }
    async getAddressBalance(address) {
        const { balance } = await this.getAddressDetails(address);
        return balance;
    }
    async getAddressBalanceERC20(address, tokenAddress) {
        var _a;
        const addressDetails = await this.getAddressDetails(address, { details: 'tokenBalances' });
        const token = ((_a = addressDetails.tokens) !== null && _a !== void 0 ? _a : []).find((token) => token.contract.toLowerCase() === tokenAddress.toLowerCase());
        if (!token) {
            throw new Error(`Failed to find tokenAddress=${tokenAddress} in tokens list`);
        }
        return token.balance;
    }
    standardizeTransaction(tx, blockInfoTime) {
        const { fromAddress, toAddress } = (0, utils_1.getBlockBookTxFromAndToAddress)(tx);
        const blockTime = blockInfoTime ? new Date(blockInfoTime) : new Date(tx.blockTime * 1000);
        const standardizedTransaction = {
            blockHash: tx.blockHash,
            blockHeight: tx.blockHeight,
            blockTime,
            from: fromAddress,
            nonce: tx.ethereumSpecific.nonce,
            to: toAddress,
            txHash: tx.txid,
            value: tx.value,
            confirmations: tx.confirmations,
            gasUsed: tx.ethereumSpecific.gasUsed,
            gasPrice: tx.ethereumSpecific.gasPrice,
            status: Boolean(tx.ethereumSpecific.status),
            raw: {
                ...tx,
                dataProvider: constants_1.NETWORK_DATA_PROVIDERS.BLOCKBOOK,
            },
        };
        return standardizedTransaction;
    }
    standardizeERC20Transaction({ tx, txSpecific, tokenSymbol, tokenDecimals, tokenName, }) {
        const standardizedTx = this.standardizeTransaction(tx);
        const result = {
            ...standardizedTx,
            raw: {
                ...standardizedTx.raw,
                ...txSpecific,
            },
            txInput: txSpecific.tx.input,
            tokenSymbol,
            tokenDecimals,
            tokenName,
            receipt: {
                ...txSpecific.receipt,
            },
        };
        return result;
    }
    async _retryDced(fn, additionalRetryableErrors) {
        return (0, utils_1.retryIfDisconnected)(fn, this.logger, additionalRetryableErrors);
    }
}
exports.NetworkDataBlockbook = NetworkDataBlockbook;
//# sourceMappingURL=NetworkDataBlockbook.js.map