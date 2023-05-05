"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseErc20Payments = void 0;
const lib_common_1 = require("../../lib-common");
const constants_1 = require("../constants");
const BaseEthereumPayments_1 = require("../BaseEthereumPayments");
class BaseErc20Payments extends BaseEthereumPayments_1.BaseEthereumPayments {
    constructor(config) {
        super(config);
        if (!config.tokenAddress) {
            throw new Error(`config.tokenAddress is required to instantiate ERC20 payments`);
        }
        this.tokenAddress = config.tokenAddress.toLowerCase();
        this.masterAddress = (config.masterAddress || '').toLowerCase();
        this.depositKeyIndex = typeof config.depositKeyIndex === 'undefined' ? constants_1.DEPOSIT_KEY_INDEX : config.depositKeyIndex;
    }
    async isSweepableBalance(balance) {
        // Any ERC20 balance greater than 0 is sweepable
        return new lib_common_1.BigNumber(balance).isGreaterThan(0);
    }
    async createTransaction(from, to, amountMain, options = {}) {
        this.logger.debug('createTransaction', from, to, amountMain);
        const fromTo = await this.resolveFromTo(from, to);
        const txFromAddress = fromTo.fromAddress.toLowerCase();
        const amountBase = this.toBaseDenominationBigNumber(amountMain);
        const contract = this.newContract(constants_1.TOKEN_METHODS_ABI, this.tokenAddress);
        const txData = contract.methods.transfer(fromTo.toAddress, `0x${amountBase.toString(16)}`).encodeABI();
        const amountOfGas = await this.gasOptionOrEstimate(options, {
            from: fromTo.fromAddress,
            to: this.tokenAddress,
            data: txData,
        }, 'TOKEN_TRANSFER');
        const feeOption = await this.resolveFeeOption(options, amountOfGas);
        const feeBase = new lib_common_1.BigNumber(feeOption.feeBase);
        const nonce = options.sequenceNumber || (await this.getNextSequenceNumber(txFromAddress));
        const ethBalance = await this.getEthBaseBalance(fromTo.fromAddress);
        if (feeBase.isGreaterThan(ethBalance)) {
            throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxInsufficientBalance, `Insufficient ETH balance (${this.toMainDenominationEth(ethBalance)}) to pay transaction fee of ${feeOption.feeMain}`);
        }
        const transactionObject = {
            from: fromTo.fromAddress.toLowerCase(),
            to: this.tokenAddress,
            data: txData,
            value: '0x0',
            gas: `0x${amountOfGas.toString(16)}`,
            gasPrice: `0x${new lib_common_1.BigNumber(feeOption.gasPrice).toString(16)}`,
            nonce: `0x${new lib_common_1.BigNumber(nonce).toString(16)}`,
        };
        this.logger.debug('transactionObject', transactionObject);
        return {
            status: lib_common_1.TransactionStatus.Unsigned,
            id: null,
            fromAddress: fromTo.fromAddress.toLowerCase(),
            toAddress: fromTo.toAddress.toLowerCase(),
            toExtraId: null,
            fromIndex: fromTo.fromIndex,
            toIndex: fromTo.toIndex,
            amount: amountMain,
            fee: feeOption.feeMain,
            targetFeeLevel: feeOption.targetFeeLevel,
            targetFeeRate: feeOption.targetFeeRate,
            targetFeeRateType: feeOption.targetFeeRateType,
            sequenceNumber: nonce.toString(),
            weight: amountOfGas,
            data: transactionObject,
        };
    }
    async createSweepTransaction(from, to, options = {}) {
        this.logger.debug('createSweepTransaction', from, to);
        // NOTE sweep from hot wallet which is not guaranteed to support sweep contract execution
        if (from === 0) {
            const { confirmedBalance } = await this.getBalance(from);
            return this.createTransaction(from, to, confirmedBalance, options);
        }
        const { address: signerAddress } = await this.resolvePayport(this.depositKeyIndex);
        const { address: toAddress } = await this.resolvePayport(to);
        let txData;
        let target;
        let fromAddress;
        if (typeof from === 'string') {
            // deployable wallet contract
            fromAddress = from.toLowerCase();
            target = from.toLowerCase();
            const contract = this.newContract(constants_1.TOKEN_WALLET_ABI_LEGACY, from);
            txData = contract.methods.sweep(this.tokenAddress, toAddress).encodeABI();
        }
        else {
            // create2 selfdesctructuble proxy contract
            fromAddress = (await this.getPayport(from)).address;
            target = this.masterAddress;
            const { confirmedBalance } = await this.getBalance(fromAddress);
            const balance = this.toBaseDenomination(confirmedBalance);
            const contract = this.newContract(constants_1.TOKEN_WALLET_ABI, this.masterAddress);
            const salt = this.getAddressSalt(from);
            txData = contract.methods.proxyTransfer(salt, this.tokenAddress, toAddress, balance).encodeABI();
        }
        const amountOfGas = await this.gasOptionOrEstimate(options, {
            from: signerAddress,
            to: target,
            data: txData,
        }, 'TOKEN_SWEEP');
        const feeOption = await this.resolveFeeOption(options, amountOfGas);
        const feeBase = new lib_common_1.BigNumber(feeOption.feeBase);
        const ethBalance = await this.getEthBaseBalance(signerAddress);
        if (feeBase.isGreaterThan(ethBalance)) {
            throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxInsufficientBalance, `Insufficient ETH balance (${this.toMainDenominationEth(ethBalance)}) at owner address ${signerAddress} ` +
                `to sweep contract ${from} with fee of ${feeOption.feeMain} ETH`);
        }
        const { confirmedBalance: tokenBalanceMain } = await this.getBalance({ address: fromAddress });
        const tokenBalanceBase = this.toBaseDenominationBigNumber(tokenBalanceMain);
        if (tokenBalanceBase.isLessThan(0)) {
            throw new lib_common_1.PaymentsError(lib_common_1.PaymentsErrorCode.TxInsufficientBalance, `Insufficient token balance (${tokenBalanceMain}) to sweep`);
        }
        const nonce = options.sequenceNumber || (await this.getNextSequenceNumber(signerAddress));
        const transactionObject = {
            from: signerAddress,
            to: target,
            data: txData,
            value: '0x0',
            nonce: `0x${new lib_common_1.BigNumber(nonce).toString(16)}`,
            gasPrice: `0x${new lib_common_1.BigNumber(feeOption.gasPrice).toString(16)}`,
            gas: `0x${amountOfGas.toString(16)}`,
        };
        return {
            status: lib_common_1.TransactionStatus.Unsigned,
            id: null,
            fromAddress,
            toAddress,
            toExtraId: null,
            fromIndex: this.depositKeyIndex,
            toIndex: typeof to === 'number' ? to : null,
            amount: tokenBalanceMain,
            fee: feeOption.feeMain,
            targetFeeLevel: feeOption.targetFeeLevel,
            targetFeeRate: feeOption.targetFeeRate,
            targetFeeRateType: feeOption.targetFeeRateType,
            sequenceNumber: nonce.toString(),
            weight: amountOfGas,
            data: transactionObject,
        };
    }
    async getNextSequenceNumber(payport) {
        const resolvedPayport = await this.resolvePayport(payport);
        const sequenceNumber = await this.networkData.getNonce(resolvedPayport.address);
        return sequenceNumber;
    }
    async getEthBaseBalance(address) {
        const balanceBase = await lib_common_1.limiter.schedule(() => this.eth.getBalance(address));
        return new lib_common_1.BigNumber(balanceBase);
    }
    logTopicToAddress(value) {
        return `0x${value.slice(value.length - 40)}`;
    }
}
exports.BaseErc20Payments = BaseErc20Payments;
exports.default = BaseErc20Payments;
//# sourceMappingURL=BaseErc20Payments.js.map