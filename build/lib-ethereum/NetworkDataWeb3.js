"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkDataWeb3 = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const web3_1 = __importDefault(require("web3"));
const web3_eth_contract_1 = __importDefault(require("web3-eth-contract"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const lodash_1 = require("lodash");
class NetworkDataWeb3 {
    constructor(config) {
        this.logger = new ts_common_1.DelegateLogger(config.logger, 'EthereumWeb3');
        this.server = config.fullNode || null;
        let provider;
        provider = new web3_1.default.providers.HttpProvider('https://main-rpc.linkpool.io/', config.providerOptions);
        this.web3 = new web3_1.default(provider);
        // if (config.web3) {
        //   this.web3 = config.web3
        // } else if (isNull(this.server)) {
        //   this.web3 = new Web3()
        // } else if (this.server.startsWith('http')) {
        //   provider = new Web3.providers.HttpProvider(this.server, config.providerOptions)
        //   this.web3 = new Web3(provider)
        // } else if (this.server.startsWith('ws')) {
        //   provider = new Web3.providers.WebsocketProvider(this.server, config.providerOptions)
        //   this.web3 = new Web3(provider)
        // } else {
        //   throw new Error(`Invalid ethereum payments fullNode, must start with http or ws: ${this.server}`)
        // }
        this.eth = this.web3.eth;
    }
    newContract(...args) {
        const contract = new web3_eth_contract_1.default(...args);
        contract.setProvider(this.eth.currentProvider);
        return contract;
    }
    async getCurrentBlockNumber() {
        return lib_common_1.limiter.schedule(() => this.eth.getBlockNumber());
    }
    async getTransactionReceipt(txId) {
        return lib_common_1.limiter.schedule(() => this.eth.getTransactionReceipt(txId));
    }
    async getTokenInfo(tokenAddress) {
        const tokenContract = this.newContract(constants_1.FULL_ERC20_TOKEN_METHODS_ABI, tokenAddress);
        const [tokenSymbol, tokenDecimals, tokenName] = await Promise.all([
            tokenContract.methods.symbol().call(),
            tokenContract.methods.decimals().call(),
            tokenContract.methods.name().call(),
        ]);
        return { tokenSymbol, tokenDecimals, tokenName };
    }
    async getBlock(id) {
        const block = await lib_common_1.limiter.schedule(() => this.eth.getBlock(id !== null && id !== void 0 ? id : 'latest', true));
        return this.standardizeBlock(block);
    }
    async getERC20Transaction(txId, tokenAddress) {
        const tx = await lib_common_1.limiter.schedule(() => this.eth.getTransaction(txId));
        const txReceipt = await this.getTransactionReceipt(txId);
        const block = await this.getBlock(tx.blockHash);
        const currentBlockNumber = await this.getCurrentBlockNumber();
        const tokenDetails = await this.getTokenInfo(tokenAddress);
        return this.standardizeERC20Transaction({ tx, txReceipt }, {
            blockTime: block.time,
            currentBlockNumber,
            ...tokenDetails,
        });
    }
    async getAddressBalance(address) {
        return lib_common_1.limiter.schedule(() => this.eth.getBalance(address));
    }
    async getAddressBalanceERC20(address, tokenAddress) {
        const contract = this.newContract(constants_1.TOKEN_METHODS_ABI, tokenAddress);
        const balance = await contract.methods.balanceOf(address).call({});
        return balance;
    }
    async estimateGas(txObject, txType) {
        try {
            // estimateGas mutates txObject so must pass in a clone
            let gas = await lib_common_1.limiter.schedule(() => this.eth.estimateGas({ ...txObject }));
            if (gas > 21000) {
                // No need for multiplier for regular ethereum transfers
                gas = gas * constants_1.GAS_ESTIMATE_MULTIPLIER;
            }
            const maxGas = constants_1.MAXIMUM_GAS[txType];
            if (gas > maxGas) {
                gas = maxGas;
            }
            const result = Math.ceil(gas);
            this.logger.debug(`Estimated gas limit of ${result} for ${txType}`);
            return result;
        }
        catch (e) {
            this.logger.warn(`Failed to estimate gas for ${txType} -- ${e}`);
            return constants_1.MAXIMUM_GAS[txType];
        }
    }
    async getWeb3Nonce(address) {
        try {
            const nonce = await lib_common_1.limiter.schedule(() => this.eth.getTransactionCount(address, 'pending'));
            return new lib_common_1.BigNumber(nonce).toString();
        }
        catch (e) {
            return '';
        }
    }
    async getWeb3GasPrice() {
        try {
            const wei = new lib_common_1.BigNumber(await lib_common_1.limiter.schedule(() => this.eth.getGasPrice()));
            this.logger.log(`Retrieved gas price of ${wei.div(1e9)} Gwei from web3`);
            return wei.dp(0, lib_common_1.BigNumber.ROUND_DOWN).toFixed();
        }
        catch (e) {
            this.logger.warn('Failed to retrieve gas price from web3 - ', e.toString());
            return '';
        }
    }
    async getTransaction(txId) {
        const tx = await lib_common_1.limiter.schedule(() => this.eth.getTransaction(txId));
        const txReceipt = await this.getTransactionReceipt(txId);
        const currentBlockNumber = await this.getCurrentBlockNumber();
        const block = await this.getBlock(tx.blockHash);
        return this.standardizeTransaction(tx, {
            blockTime: block.time,
            currentBlockNumber,
            gasUsed: txReceipt.gasUsed,
            contractAddress: txReceipt.contractAddress,
            status: txReceipt.status,
        });
    }
    async standardizeBlock(block) {
        const blockTime = block.timestamp
            ? new Date((0, ts_common_1.isNumber)(block.timestamp) ? block.timestamp * 1000 : block.timestamp)
            : null;
        const currentBlockNumber = await this.getCurrentBlockNumber();
        const standardizedTransactionsPromise = block.transactions.map(async (tx) => {
            const txHash = (0, lodash_1.get)(tx, 'hash', tx);
            const txReceipt = await this.getTransactionReceipt(txHash);
            return this.standardizeTransaction(tx, {
                blockTime,
                gasUsed: txReceipt.gasUsed,
                currentBlockNumber,
                status: txReceipt.status,
            });
        });
        const standardizedTransactions = await Promise.all(standardizedTransactionsPromise);
        const blockInfo = {
            id: block.hash,
            height: block.number,
            previousId: block.parentHash,
            time: blockTime,
            raw: {
                ...block,
                transactions: standardizedTransactions,
                dataProvider: constants_1.NETWORK_DATA_PROVIDERS.INFURA,
            },
        };
        return blockInfo;
    }
    standardizeTransaction(tx, { blockTime, currentBlockNumber, gasUsed, contractAddress, status, }) {
        const standardizedTransaction = {
            from: tx.from,
            to: tx.to,
            blockHash: tx.blockHash,
            blockHeight: tx.blockNumber,
            blockTime,
            nonce: tx.nonce,
            txHash: tx.hash,
            value: tx.value,
            gasUsed,
            gasPrice: tx.gasPrice,
            confirmations: tx.blockNumber ? currentBlockNumber - tx.blockNumber : 0,
            contractAddress,
            status,
            raw: {
                ...tx,
                blockTime,
                currentBlockNumber,
                gasUsed,
                dataProvider: constants_1.NETWORK_DATA_PROVIDERS.INFURA,
            },
        };
        return standardizedTransaction;
    }
    standardizeERC20Transaction({ tx, txReceipt, }, { blockTime, currentBlockNumber, tokenDecimals, tokenName, tokenSymbol, }) {
        const standardizedTx = this.standardizeTransaction(tx, {
            gasUsed: txReceipt.gasUsed,
            currentBlockNumber,
            blockTime,
            contractAddress: txReceipt.contractAddress,
            status: txReceipt.status,
        });
        const result = {
            ...standardizedTx,
            txInput: tx.input,
            tokenSymbol,
            tokenDecimals,
            tokenName,
            receipt: {
                gasUsed: txReceipt.gasUsed.toString(),
                logs: txReceipt.logs,
                status: txReceipt.status,
            },
        };
        return result;
    }
    async _retryDced(fn) {
        return (0, utils_1.retryIfDisconnected)(fn, this.logger);
    }
}
exports.NetworkDataWeb3 = NetworkDataWeb3;
//# sourceMappingURL=NetworkDataWeb3.js.map