/// <reference types="node" />
import { UtxoInfo, BaseConfig, MultisigData, TransactionStatus } from '../../lib-common';
import { BitcoinishSignedTransaction } from './types';
import * as bitcoin from 'bitcoinjs-lib';
import { BitcoinishPayments } from './BitcoinishPayments';
export declare function createMultisigData(inputUtxos: UtxoInfo[], signers: (BitcoinishPayments<BaseConfig> & {
    getKeyPair(index: number): {
        publicKey: Buffer;
    };
})[], m: number): {
    [address: string]: {
        m: number;
        accountIds: string[];
        publicKeys: string[];
        signedAccountIds: string[];
    } & {
        signerIndex: number;
        inputIndices: number[];
    };
};
interface PsbtOptsOptional {
    network?: bitcoin.Network;
    maximumFeeRate?: number;
}
export declare function combineMultisigData(m1: MultisigData, m2: MultisigData): any;
export declare function preCombinePartiallySignedTransactions(txs: (BitcoinishSignedTransaction & {
    data: {
        unsignedTxHash?: string;
        partial?: boolean;
    };
})[], psbtOptions?: PsbtOptsOptional): {
    baseTx: {
        status: TransactionStatus;
        id: string;
        fromAddress: string;
        toAddress: string;
        fromIndex: number;
        toIndex: number;
        amount: string;
        fee: string;
    } & {
        fromExtraId?: string;
        toExtraId?: string;
        sequenceNumber?: string | number;
        inputUtxos?: ({
            txid: string;
            vout: number;
            value: string;
        } & {
            satoshis?: string | number;
            confirmations?: number;
            height?: string;
            lockTime?: string;
            coinbase?: boolean;
            txHex?: string;
            scriptPubKeyHex?: string;
            address?: string;
            spent?: boolean;
            signer?: number;
        })[];
        outputUtxos?: ({
            txid: string;
            vout: number;
            value: string;
        } & {
            satoshis?: string | number;
            confirmations?: number;
            height?: string;
            lockTime?: string;
            coinbase?: boolean;
            txHex?: string;
            scriptPubKeyHex?: string;
            address?: string;
            spent?: boolean;
            signer?: number;
        })[];
        externalOutputs?: ({
            address: string;
            value: string;
        } & {
            extraId?: string;
        })[];
        weight?: number;
        chainId?: string;
    } & {
        fromAddress: string;
        toAddress: string;
        fromIndex: number;
        targetFeeLevel: import("../../lib-common").FeeLevel;
        targetFeeRate: string;
        targetFeeRateType: import("../../lib-common").FeeRateType;
    } & {
        multisigData?: {
            m: number;
            accountIds: string[];
            publicKeys: string[];
            signedAccountIds: string[];
        } | {
            [x: string]: {
                m: number;
                accountIds: string[];
                publicKeys: string[];
                signedAccountIds: string[];
            } & {
                signerIndex: number;
                inputIndices: number[];
            };
        };
    } & {
        status: TransactionStatus.Signed;
        id: string;
        amount: string;
        fee: string;
        data: object;
    } & {
        data: {
            hex: string;
        } & {
            partial?: boolean;
            unsignedTxHash?: string;
            changeOutputs?: {
                address: string;
                value: string;
            }[];
        };
    } & {
        data: {
            unsignedTxHash?: string;
            partial?: boolean;
        };
    };
    combinedPsbt: bitcoin.Psbt;
    updatedMultisigData: {
        m: number;
        accountIds: string[];
        publicKeys: string[];
        signedAccountIds: string[];
    } | {
        [x: string]: {
            m: number;
            accountIds: string[];
            publicKeys: string[];
            signedAccountIds: string[];
        } & {
            signerIndex: number;
            inputIndices: number[];
        };
    };
};
export {};
