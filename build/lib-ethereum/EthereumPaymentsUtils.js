"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumPaymentsUtils = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const blockbook_client_1 = require("blockbook-client");
const ethereum_input_data_decoder_1 = __importDefault(require("ethereum-input-data-decoder"));
const web3_1 = __importDefault(require("web3"));
const web3_eth_contract_1 = __importDefault(require("web3-eth-contract"));
const constants_1 = require("./constants");
const types_1 = require("./types");
const bip44_1 = require("./bip44");
const NetworkData_1 = require("./NetworkData");
const utils_1 = require("./utils");
const UnitConvertersUtil_1 = require("./UnitConvertersUtil");
const SIGNATURE = __importStar(require("./erc20/constants"));
const deriveAddress_1 = require("./erc20/deriveAddress");
class EthereumPaymentsUtils extends UnitConvertersUtil_1.UnitConvertersUtil {
    constructor(config) {
        var _a, _b, _c, _d;
        super({ coinDecimals: config.decimals });
        this.logger = new ts_common_1.DelegateLogger(config.logger, constants_1.PACKAGE_NAME);
        this.networkType = config.network || lib_common_1.NetworkType.Mainnet;
        if (config.tokenAddress) {
            // ERC20 case
            if (!config.name) {
                throw new Error(`Expected config.name to be provided for tokenAddress ${this.tokenAddress}`);
            }
            if (!config.symbol) {
                throw new Error(`Expected config.symbol to be provided for tokenAddress ${this.tokenAddress}`);
            }
            if (!config.decimals) {
                throw new Error(`Expected config.decimals to be provided for tokenAddress ${this.tokenAddress}`);
            }
        }
        else {
            // ether case
            if (config.name && config.name !== constants_1.ETH_NAME) {
                throw new Error(`Unexpected config.name ${config.name} provided without config.tokenAddress`);
            }
            if (config.symbol && config.symbol !== constants_1.ETH_SYMBOL) {
                throw new Error(`Unexpected config.symbol ${config.symbol} provided without config.tokenAddress`);
            }
            if (config.decimals && config.decimals !== constants_1.ETH_DECIMAL_PLACES) {
                throw new Error(`Unexpected config.decimals ${config.decimals} provided without config.tokenAddress`);
            }
        }
        this.tokenAddress = (_a = config.tokenAddress) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        this.coinName = (_b = config.name) !== null && _b !== void 0 ? _b : constants_1.ETH_NAME;
        this.coinSymbol = (_c = config.symbol) !== null && _c !== void 0 ? _c : constants_1.ETH_SYMBOL;
        this.coinDecimals = (_d = config.decimals) !== null && _d !== void 0 ? _d : constants_1.ETH_DECIMAL_PLACES;
        this.server = 'https://main-rpc.linkpool.io/';
        this.blockBookApi = config.blockbookApi;
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
        // Debug mode to print out all outgoing req/res
        if (provider && process.env.NODE_DEBUG && process.env.NODE_DEBUG.includes('ethereum-payments')) {
            const send = provider.send;
            provider.send = (payload, cb) => {
                this.logger.debug(`web3 provider request ${this.server}`, payload);
                send.call(provider, payload, (error, result) => {
                    if (error) {
                        this.logger.debug(`web3 provider response error ${this.server}`, error);
                    }
                    else {
                        this.logger.debug(`web3 provider response result ${this.server}`, result);
                    }
                    cb(error, result);
                });
            };
        }
        if (config.blockbookApi) {
            this.blockBookApi = config.blockbookApi;
        }
        else if (config.blockbookNode) {
            const blockBookApi = new blockbook_client_1.BlockbookEthereum({
                nodes: [config.blockbookNode],
                logger: this.logger,
                requestTimeoutMs: config.requestTimeoutMs,
            });
            this.blockBookApi = blockBookApi;
        }
        else {
            this.logger.log(`Blockbook node is missing from config`);
        }
        this.eth = this.web3.eth;
        this.networkData = new NetworkData_1.NetworkData({
            web3Config: {
                web3: this.web3,
                fullNode: 'https://main-rpc.linkpool.io/',
                decimals: config.decimals,
                providerOptions: config.providerOptions,
            },
            parityUrl: config.parityNode,
            logger: this.logger,
            blockBookConfig: {
                nodes: ['https://eth1.trezor.io', 'https://eth2.trezor.io'],
                api: this.blockBookApi,
                requestTimeoutMs: config.requestTimeoutMs,
            },
            gasStationUrl: config.gasStation,
            requestTimeoutMs: config.requestTimeoutMs,
        });
    }
    newContract(...args) {
        const contract = new web3_eth_contract_1.default(...args);
        contract.setProvider(this.eth.currentProvider);
        return contract;
    }
    async init() { }
    async destroy() { }
    isValidAddress(address, options = {}) {
        const { format } = options;
        if (format === types_1.EthereumAddressFormat.Lowercase) {
            return this.web3.utils.isAddress(address) && address === address.toLowerCase();
        }
        else if (format === types_1.EthereumAddressFormat.Checksum) {
            return this.web3.utils.checkAddressChecksum(address);
        }
        return this.web3.utils.isAddress(address);
    }
    standardizeAddress(address, options) {
        var _a;
        if (!this.web3.utils.isAddress(address)) {
            return null;
        }
        const format = (0, ts_common_1.assertType)(types_1.EthereumAddressFormatT, (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_ADDRESS_FORMAT, 'format');
        if (format === types_1.EthereumAddressFormat.Lowercase) {
            return address.toLowerCase();
        }
        else {
            return this.web3.utils.toChecksumAddress(address);
        }
    }
    isValidExtraId(extraId) {
        return false;
    }
    // XXX Payport methods can be moved to payments-common
    isValidPayport(payport) {
        return lib_common_1.Payport.is(payport) && !this._getPayportValidationMessage(payport);
    }
    validatePayport(payport) {
        const message = this._getPayportValidationMessage(payport);
        if (message) {
            throw new Error(message);
        }
    }
    getPayportValidationMessage(payport) {
        try {
            payport = (0, ts_common_1.assertType)(lib_common_1.Payport, payport, 'payport');
        }
        catch (e) {
            return e.message;
        }
        return this._getPayportValidationMessage(payport);
    }
    isValidXprv(xprv) {
        return (0, bip44_1.isValidXkey)(xprv) && xprv.substring(0, 4) === 'xprv';
    }
    isValidXpub(xpub) {
        return (0, bip44_1.isValidXkey)(xpub) && xpub.substring(0, 4) === 'xpub';
    }
    isValidPrivateKey(prv) {
        try {
            return Boolean(this.web3.eth.accounts.privateKeyToAccount(prv));
        }
        catch (e) {
            return false;
        }
    }
    isAddressEqual(address1, address2) {
        return address1.toLowerCase() === address2.toLowerCase();
    }
    privateKeyToAddress(prv) {
        let key;
        if (prv.substring(0, 2) === '0x') {
            key = prv;
        }
        else {
            key = `0x${prv}`;
        }
        return this.web3.eth.accounts.privateKeyToAccount(key).address.toLowerCase();
    }
    _getPayportValidationMessage(payport) {
        try {
            const { address } = payport;
            if (!this.isValidAddress(address)) {
                return 'Invalid payport address';
            }
        }
        catch (e) {
            return 'Invalid payport address';
        }
        return undefined;
    }
    async getFeeRateRecommendation(level) {
        const gasPrice = await this.networkData.getGasPrice(level);
        return {
            feeRate: gasPrice,
            feeRateType: lib_common_1.FeeRateType.BasePerWeight,
        };
    }
    async _retryDced(fn) {
        return (0, utils_1.retryIfDisconnected)(fn, this.logger);
    }
    async getCurrentBlockNumber() {
        return this.networkData.getCurrentBlockNumber();
    }
    formatAddress(address) {
        if (address.startsWith('0x')) {
            return address.toLowerCase();
        }
        return `0x${address}`.toLowerCase();
    }
    isAddressBalanceSweepable(balanceEth) {
        return this.toBaseDenominationBigNumberEth(balanceEth).gt(constants_1.MIN_SWEEPABLE_WEI);
    }
    async getAddressBalanceERC20(address, tokenAddress) {
        const balance = await this.networkData.getAddressBalanceERC20(address, tokenAddress);
        const sweepable = this.toMainDenominationBigNumber(balance).gt(0);
        return {
            confirmedBalance: this.toMainDenomination(balance),
            unconfirmedBalance: '0',
            spendableBalance: this.toMainDenomination(balance),
            sweepable,
            requiresActivation: false,
        };
    }
    async getAddressBalance(address) {
        if (this.tokenAddress) {
            return this.getAddressBalanceERC20(address, this.tokenAddress);
        }
        const balance = await this.networkData.getAddressBalance(address);
        const confirmedBalance = this.toMainDenomination(balance).toString();
        const sweepable = this.isAddressBalanceSweepable(confirmedBalance);
        return {
            confirmedBalance,
            unconfirmedBalance: '0',
            spendableBalance: confirmedBalance,
            sweepable,
            requiresActivation: false,
        };
    }
    async getAddressNextSequenceNumber(address) {
        return this.networkData.getNonce(address);
    }
    async getAddressUtxos() {
        return [];
    }
    getErc20TransferLogAmount(receipt, tokenDecimals, txHash) {
        const txReceiptLogs = receipt.logs;
        const transferLog = txReceiptLogs.find((log) => log.topics[0] === SIGNATURE.LOG_TOPIC0_ERC20_SWEEP);
        if (!transferLog) {
            this.logger.warn(`Transaction ${txHash} was an ERC20 sweep but cannot find log for Transfer event`);
            return '0';
        }
        const unitConverter = this.getCustomUnitConverter(tokenDecimals);
        return unitConverter.toMainDenominationString(transferLog.data);
    }
    async getTransactionInfoERC20(txId, tokenAddress) {
        var _a;
        const erc20Tx = await this.networkData.getERC20Transaction(txId, tokenAddress);
        let fromAddress = erc20Tx.from;
        let toAddress = (_a = erc20Tx.to) !== null && _a !== void 0 ? _a : tokenAddress;
        const tokenDecimals = new lib_common_1.BigNumber(erc20Tx.tokenDecimals).toNumber();
        const { txHash } = erc20Tx;
        let status = lib_common_1.TransactionStatus.Pending;
        let isExecuted = false;
        // XXX it is suggested to keep 12 confirmations
        // https://ethereum.stackexchange.com/questions/319/what-number-of-confirmations-is-considered-secure-in-ethereum
        const isConfirmed = erc20Tx.confirmations > Math.max(constants_1.MIN_CONFIRMATIONS, 12);
        if (isConfirmed) {
            status = lib_common_1.TransactionStatus.Confirmed;
            isExecuted = true;
        }
        const tokenDecoder = new ethereum_input_data_decoder_1.default(constants_1.FULL_ERC20_TOKEN_METHODS_ABI);
        const txInput = erc20Tx.txInput;
        let amount = '';
        const isERC20Transfer = txInput.startsWith(SIGNATURE.ERC20_TRANSFER);
        const isERC20SweepContractDeploy = txInput.startsWith(SIGNATURE.ERC20_SWEEP_CONTRACT_DEPLOY);
        const isERC20SweepContractDeployLegacy = txInput.startsWith(SIGNATURE.ERC20_SWEEP_CONTRACT_DEPLOY_LEGACY);
        const isERC20Proxy = txInput.startsWith(SIGNATURE.ERC20_PROXY);
        const isERC20Sweep = txInput.startsWith(SIGNATURE.ERC20_SWEEP);
        const isERC20SweepLegacy = txInput.startsWith(SIGNATURE.ERC20_SWEEP_LEGACY);
        if (isERC20Transfer) {
            if (toAddress.toLowerCase() !== tokenAddress.toLowerCase()) {
                throw new Error(`Transaction ${txId} was sent to different contract: ${toAddress}, Expected: ${tokenAddress}`);
            }
            const txData = tokenDecoder.decodeData(txInput);
            toAddress = txData.inputs[0];
            // USDT token has decimal place of 6, unlike other tokens that are 18 decimals;
            // so we have to use a custom unitConverter, the default one uses that 18 decimals
            const customUnitConverter = this.getCustomUnitConverter(tokenDecimals);
            const inputAmount = txData.inputs[1].toString();
            amount = customUnitConverter.toMainDenominationString(inputAmount);
            const actualAmount = this.getErc20TransferLogAmount(erc20Tx.receipt, tokenDecimals, txHash);
            if (isExecuted && amount !== actualAmount) {
                this.logger.warn(`Transaction ${txHash} tried to transfer ${amount} but only ${actualAmount} was actually transferred`);
            }
        }
        else if (isERC20SweepContractDeploy || isERC20SweepContractDeployLegacy || isERC20Proxy) {
            amount = '0';
        }
        else if (isERC20Sweep) {
            const tokenDecoder = new ethereum_input_data_decoder_1.default(constants_1.TOKEN_WALLET_ABI);
            const txData = tokenDecoder.decodeData(txInput);
            if (txData.inputs.length !== 4) {
                throw new Error(`Transaction ${txHash} has not recognized number of inputs ${txData.inputs.length}`);
            }
            // For ERC20 sweeps:
            // tx.from is the contract address
            // inputs[0] is salt
            // inputs[1] is the ERC20 contract address (this.tokenAddress)
            // inputs[2] is the recipient of the funds (toAddress)
            // inputs[3] is the amount
            const sweepContractAddress = toAddress;
            if (!sweepContractAddress) {
                throw new Error(`Transaction ${txHash} should have a to address destination`);
            }
            const addr = (0, deriveAddress_1.deriveAddress)(sweepContractAddress, `0x${txData.inputs[0].toString('hex')}`, true);
            fromAddress = this.web3.utils.toChecksumAddress(addr).toLowerCase();
            toAddress = this.web3.utils.toChecksumAddress(txData.inputs[2]).toLowerCase();
            amount = this.getErc20TransferLogAmount(erc20Tx.receipt, tokenDecimals, txHash);
        }
        else if (isERC20SweepLegacy) {
            const tokenDecoder = new ethereum_input_data_decoder_1.default(constants_1.TOKEN_WALLET_ABI_LEGACY);
            const txData = tokenDecoder.decodeData(txInput);
            if (txData.inputs.length !== 2) {
                throw new Error(`Transaction ${txHash} has not recognized number of inputs ${txData.inputs.length}`);
            }
            // For ERC20 legacy sweeps:
            // tx.to is the sweep contract address and source of funds (fromAddress)
            // tx.from is the contract owner address
            // inputs[0] is the ERC20 contract address (this.tokenAddress)
            // inputs[1] is the recipient of the funds (toAddress)
            const sweepContractAddress = toAddress;
            if (!sweepContractAddress) {
                throw new Error(`Transaction ${txHash} should have a to address destination`);
            }
            fromAddress = this.web3.utils.toChecksumAddress(sweepContractAddress).toLowerCase();
            toAddress = this.web3.utils.toChecksumAddress(txData.inputs[1]).toLowerCase();
            amount = this.getErc20TransferLogAmount(erc20Tx.receipt, tokenDecimals, txHash);
        }
        else {
            throw new Error('tx is neither ERC20 token transfer nor sweep');
        }
        const fee = this.toMainDenomination(new lib_common_1.BigNumber(erc20Tx.gasPrice).multipliedBy(erc20Tx.gasUsed));
        const currentBlockNumber = await this.getCurrentBlockNumber();
        const result = {
            id: txHash,
            amount,
            fromAddress: this.formatAddress(fromAddress),
            toAddress: this.formatAddress(toAddress),
            fromExtraId: null,
            toExtraId: null,
            fromIndex: null,
            toIndex: null,
            fee,
            sequenceNumber: erc20Tx.nonce,
            weight: erc20Tx.gasUsed,
            isExecuted,
            isConfirmed,
            confirmations: erc20Tx.confirmations,
            confirmationId: erc20Tx.blockHash,
            confirmationTimestamp: erc20Tx.blockTime,
            confirmationNumber: erc20Tx.blockHeight,
            status,
            currentBlockNumber,
            data: {
                ...erc20Tx,
            },
        };
        return result;
    }
    async getTransactionInfo(txid) {
        var _a, _b;
        if (this.tokenAddress) {
            return this.getTransactionInfoERC20(txid, this.tokenAddress);
        }
        const tx = await this.networkData.getTransaction(txid);
        let status = lib_common_1.TransactionStatus.Pending;
        let isExecuted = false;
        // XXX it is suggested to keep 12 confirmations
        // https://ethereum.stackexchange.com/questions/319/what-number-of-confirmations-is-considered-secure-in-ethereum
        const isConfirmed = tx.confirmations >= Math.max(constants_1.MIN_CONFIRMATIONS, 12);
        if (isConfirmed) {
            status = lib_common_1.TransactionStatus.Confirmed;
            isExecuted = true;
            if (!tx.status) {
                status = lib_common_1.TransactionStatus.Failed;
                isExecuted = false;
            }
        }
        const currentBlockNumber = await this.getCurrentBlockNumber();
        const fee = this.toMainDenomination(new lib_common_1.BigNumber(tx.gasPrice).multipliedBy(tx.gasUsed));
        const fromAddress = this.formatAddress(tx.from);
        const toAddress = this.formatAddress((_a = tx.to) !== null && _a !== void 0 ? _a : tx.contractAddress);
        const result = {
            id: tx.txHash,
            amount: this.toMainDenomination(tx.value),
            fromAddress,
            toAddress,
            fromExtraId: null,
            toExtraId: null,
            fromIndex: null,
            toIndex: null,
            fee,
            sequenceNumber: tx.nonce,
            weight: tx.gasUsed,
            isExecuted,
            isConfirmed,
            confirmations: tx.confirmations,
            confirmationId: (_b = tx.blockHash) !== null && _b !== void 0 ? _b : null,
            confirmationTimestamp: tx.blockTime,
            confirmationNumber: tx.blockHeight,
            status,
            currentBlockNumber,
            data: {
                ...tx.raw,
                to: toAddress,
                from: fromAddress,
                contractAddress: tx.contractAddress,
            },
        };
        return result;
    }
    async getBlock(id) {
        return this.networkData.getBlock(id !== null && id !== void 0 ? id : 'latest');
    }
}
exports.EthereumPaymentsUtils = EthereumPaymentsUtils;
//# sourceMappingURL=EthereumPaymentsUtils.js.map