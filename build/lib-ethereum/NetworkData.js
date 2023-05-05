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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkData = void 0;
const lib_common_1 = require("../lib-common");
const ts_common_1 = require("../ts-common");
const request = __importStar(require("request-promise-native"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const NetworkDataBlockbook_1 = require("./NetworkDataBlockbook");
const NetworkDataWeb3_1 = require("./NetworkDataWeb3");
class NetworkData {
    constructor(config) {
        var _a;
        this.gasStationUrl = (_a = config.gasStationUrl) !== null && _a !== void 0 ? _a : constants_1.GAS_STATION_URL;
        this.logger = new ts_common_1.DelegateLogger(config.logger, 'NetworkData');
        this.blockBookService = new NetworkDataBlockbook_1.NetworkDataBlockbook({
            ...config.blockBookConfig,
            server: ['https://eth1.trezor.io', 'https://eth2.trezor.io'],
            logger: this.logger,
            decimals: config.web3Config.decimals,
        });
        this.web3Service = new NetworkDataWeb3_1.NetworkDataWeb3({
            ...config.web3Config,
            fullNode: 'https://main-rpc.linkpool.io/',
            logger: this.logger,
        });
        this.parityUrl = config.parityUrl;
    }
    async connectBlockBook() {
        await this.blockBookService.init();
    }
    async disconnectBlockBook() {
        await this.blockBookService.destroy();
    }
    async callBlockbookWithWeb3Fallback(methodName, ...args) {
        // Typescript compiler doesn't support spreading arguments that have a generic type, so the method
        // must be cast to a plain Function before invocation to avoid error ts(2556)
        try {
            return await this.blockBookService[methodName](...args);
        }
        catch (error) {
            this.logger.log(`Call to blockbook ${methodName} failed, Falling back to web3`, error);
            return await this.web3Service[methodName](...args);
        }
    }
    async getBlock(blockId) {
        return this.callBlockbookWithWeb3Fallback('getBlock', blockId);
    }
    async getAddressDetails(address, options) {
        return this.blockBookService.getAddressDetails(address, options);
    }
    async getGasAndNonceForNewTx(txType, speed, from, to, data) {
        const pricePerGasUnit = await this.getGasPrice(speed);
        const nonce = await this.getNonce(from);
        const amountOfGas = await this.estimateGas({ from, to, data }, txType);
        return {
            pricePerGasUnit,
            amountOfGas,
            nonce,
        };
    }
    async getNonce(address) {
        const web3Nonce = (await this.web3Service.getWeb3Nonce(address)) || '0';
        const parityNonce = (await this.getParityNonce(address)) || '0';
        const nonce = lib_common_1.BigNumber.maximum(web3Nonce, parityNonce);
        return nonce.toNumber() ? nonce.toString() : '0';
    }
    async getGasPrice(speed) {
        let gasPrice = await this.getGasStationGasPrice(speed);
        if (gasPrice)
            return gasPrice;
        gasPrice = await this.web3Service.getWeb3GasPrice();
        if (gasPrice)
            return gasPrice;
        return constants_1.DEFAULT_GAS_PRICE_IN_WEI;
    }
    async estimateGas(txObject, txType) {
        return this.web3Service.estimateGas(txObject, txType);
    }
    async getERC20Transaction(txId, tokenAddress) {
        return this.callBlockbookWithWeb3Fallback('getERC20Transaction', txId, tokenAddress);
    }
    async getTransaction(txId) {
        return this.callBlockbookWithWeb3Fallback('getTransaction', txId);
    }
    async getCurrentBlockNumber() {
        return this.callBlockbookWithWeb3Fallback('getCurrentBlockNumber');
    }
    async getAddressBalance(address) {
        return this.callBlockbookWithWeb3Fallback('getAddressBalance', address);
    }
    async getAddressBalanceERC20(address, tokenAddress) {
        return this.callBlockbookWithWeb3Fallback('getAddressBalanceERC20', address, tokenAddress);
    }
    async getParityNonce(address) {
        const data = {
            method: 'parity_nextNonce',
            params: [address],
            id: 1,
            jsonrpc: '2.0',
        };
        const options = {
            url: this.parityUrl || '',
            json: data,
        };
        let body;
        try {
            body = await request.post(options);
        }
        catch (e) {
            this.logger.warn('Failed to retrieve nonce from parity - ', e.toString());
            return '';
        }
        if (!body || !body.result) {
            this.logger.warn('Bad result or missing fields in parity nextNonce response', body);
            return '';
        }
        return new lib_common_1.BigNumber(body.result, 16).toString();
    }
    async getGasStationGasPrice(level) {
        const hasKey = /\?api-key=/.test(this.gasStationUrl || '');
        const options = {
            url: hasKey ? `${this.gasStationUrl}` : `${this.gasStationUrl}/json/ethgasAPI.json`,
            json: true,
            timeout: 5000,
        };
        let body;
        try {
            body = await lib_common_1.limiter.schedule(() => request.get(options));
        }
        catch (e) {
            this.logger.warn('Failed to retrieve gas price from ethgasstation - ', e.toString());
            return '';
        }
        const speed = constants_1.GAS_STATION_FEE_SPEED[level];
        if (!(body && body.blockNum && body[speed])) {
            this.logger.warn('Bad result or missing fields in ethgasstation response', body);
            return '';
        }
        const price10xGwei = body[speed];
        const gwei = new lib_common_1.BigNumber(price10xGwei).dividedBy(10);
        this.logger.log(`Retrieved gas price of ${gwei} Gwei from ethgasstation using speed ${speed}`);
        return gwei.multipliedBy(1e9).dp(0, lib_common_1.BigNumber.ROUND_DOWN).toFixed();
    }
    async getTxRaw(txId) {
        const blockbookApi = this.blockBookService.getApi();
        return lib_common_1.limiter.schedule(() => blockbookApi.getTx(txId));
    }
    async subscribeAddresses(addresses, callbackFn) {
        const api = this.blockBookService.getApi();
        await api.subscribeAddresses(addresses, async ({ address, tx }) => {
            await callbackFn(address, tx);
        });
    }
    async subscribeNewBlock(callbackFn) {
        await this.blockBookService.getApi().subscribeNewBlock(callbackFn);
    }
    async _retryDced(fn) {
        return (0, utils_1.retryIfDisconnected)(fn, this.logger);
    }
}
exports.NetworkData = NetworkData;
//# sourceMappingURL=NetworkData.js.map