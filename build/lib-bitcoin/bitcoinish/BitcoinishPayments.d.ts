import { BasePayments, UtxoInfo, FeeRate, FeeOption, ResolvedFeeOption, AutoFeeLevels, Payport, ResolveablePayport, BalanceResult, FromTo, CreateTransactionOptions, BaseConfig, PayportOutput } from '../../lib-common';
import { Numeric } from '../../ts-common';
import { BitcoinishUnsignedTransaction, BitcoinishSignedTransaction, BitcoinishBroadcastResult, BitcoinishTransactionInfo, BitcoinishPaymentsConfig, BitcoinishPaymentTx, BitcoinishBuildPaymentTxParams, AddressType } from './types';
import { BitcoinishPaymentsUtils } from './BitcoinishPaymentsUtils';
import * as bitcoin from 'bitcoinjs-lib';
export declare abstract class BitcoinishPayments<Config extends BaseConfig> extends BitcoinishPaymentsUtils implements BasePayments<Config, BitcoinishUnsignedTransaction, BitcoinishSignedTransaction, BitcoinishBroadcastResult, BitcoinishTransactionInfo> {
    minTxFee?: FeeRate;
    dustThreshold: number;
    defaultFeeLevel: AutoFeeLevels;
    targetUtxoPoolSize: number;
    minChangeSat: number;
    abstract addressType: AddressType | null;
    constructor(config: BitcoinishPaymentsConfig);
    abstract getFullConfig(): Config;
    abstract getPublicConfig(): Config;
    abstract getAccountId(index: number): string;
    abstract getAccountIds(index?: number): string[];
    abstract getSupportedAddressTypes(): AddressType[] | null;
    abstract getAddress(index: number, addressType?: AddressType): string;
    abstract signTransaction(tx: BitcoinishUnsignedTransaction): Promise<BitcoinishSignedTransaction>;
    /**
     * Serialize the payment tx into an hex string format representing the unsigned transaction.
     *
     * By default return empty string because it's coin dependent. Implementors can override this
     * with coin specific implementation (eg using Psbt for bitcoin). If coin doesn't have an unsigned
     * serialized tx format (ie most coins other than BTC) then leave as empty string.
     */
    abstract serializePaymentTx(paymentTx: BitcoinishPaymentTx, fromIndex?: number): Promise<string>;
    init(): Promise<void>;
    destroy(): Promise<void>;
    requiresBalanceMonitor(): boolean;
    getPayport(index: number): Promise<Payport>;
    getAddressType(address: string, index: number): AddressType;
    resolvePayport(payport: ResolveablePayport): Promise<Payport>;
    resolveFeeOption(feeOption: FeeOption): Promise<ResolvedFeeOption>;
    getBalance(payport: ResolveablePayport): Promise<BalanceResult>;
    isSweepableBalance(balance: Numeric): boolean;
    usesUtxos(): boolean;
    getUtxos(payport: ResolveablePayport): Promise<UtxoInfo[]>;
    usesSequenceNumber(): boolean;
    getNextSequenceNumber(): Promise<any>;
    resolveFromTo(from: number, to: ResolveablePayport): Promise<FromTo>;
    /** buildPaymentTx uses satoshi number for convenient math, but we want strings externally */
    private convertOutputsToExternalFormat;
    /**
     * Estimate the size of a tx in vbytes. Override this if the coin supports segwit, multisig, or any
     * non P2PKH style transaction. Default implementation assumes P2PKH.
     */
    estimateTxSize(inputCount: number, changeOutputCount: number, externalOutputAddresses: string[]): number;
    /** Helper for calculateTxFeeSatoshis */
    private feeRateToSatoshis;
    /** Estimate the tx fee in satoshis */
    private estimateTxFee;
    /**
     * Determine how many change outputs to add to a transaction given how many there are currently
     * and how many we intend to use. The goal is to keep at least `targetUtxoPoolSize` utxos available
     * at all times to increase availability.
     */
    private determineTargetChangeOutputCount;
    /** Adjust all the output amounts such that externalOutputTotal equals newOutputTotal (+/- a few satoshis less) */
    private adjustOutputAmounts;
    private adjustTxFee;
    private applyFeeAdjustment;
    private selectInputUtxos;
    private selectInputUtxosForAll;
    private selectInputUtxosPartial;
    private estimateIdealUtxoSelectionFee;
    /** Ideal utxo selection is one which creates no change outputs */
    private isIdealUtxoSelection;
    private selectWithForcedUtxos;
    private selectFromAvailableUtxos;
    private allocateChangeOutputs;
    private validateBuildContext;
    private omitDustUtxos;
    /**
     * Build a simple payment transaction.
     * Note: fee will be subtracted from first output when attempting to send entire account balance
     * Note: All amounts/values should be input and output as main denomination strings for consistent
     * serialization. Within this function they're converted to JS Numbers for convenient arithmetic
     * then converted back to strings before being returned.
     */
    buildPaymentTx(params: BitcoinishBuildPaymentTxParams): Promise<Required<BitcoinishPaymentTx>>;
    /**
     * Creates a list of change addresses with an exponential weight distribution to use for
     * maintaining a pool of utxos.
     */
    private createWeightedChangeOutputs;
    private allocateChangeUsingWeights;
    private readjustTxFeeAfterDroppingChangeOutputs;
    private reallocateLooseChange;
    private callSerializePaymentTx;
    createTransaction(from: number, to: ResolveablePayport, amount: Numeric, options?: CreateTransactionOptions): Promise<BitcoinishUnsignedTransaction>;
    createMultiOutputTransaction(from: number, to: PayportOutput[], options?: CreateTransactionOptions): Promise<BitcoinishUnsignedTransaction>;
    createServiceTransaction(from: number, options?: CreateTransactionOptions): Promise<null>;
    createSweepTransaction(from: number, to: ResolveablePayport, options?: CreateTransactionOptions): Promise<BitcoinishUnsignedTransaction>;
    createMultiInputTransaction(from: number[], to: PayportOutput[], options?: CreateTransactionOptions): Promise<BitcoinishUnsignedTransaction>;
    broadcastTransaction(tx: BitcoinishSignedTransaction): Promise<BitcoinishBroadcastResult>;
    private prepareUtxos;
    private validatePsbtOutput;
    private validatePsbtInput;
    /**
     * Assert that a psbt is equivalent to the provided unsigned tx. Used to check a psbt actually
     * reflects the expected transaction before signing.
     */
    validatePsbt(tx: BitcoinishUnsignedTransaction, psbt: bitcoin.Psbt): void;
}
