/// <reference types="node" />
import { BitcoinjsKeyPair, BitcoinjsNetwork, MultisigAddressType, SinglesigAddressType, BitcoinishSignedTransaction, BitcoinishUnsignedTransaction } from './types';
import { MultisigData } from '../../lib-common';
import * as bitcoin from 'bitcoinjs-lib';
export declare function isValidAddress(address: string, network: BitcoinjsNetwork): boolean;
export declare function standardizeAddress(address: string, network: BitcoinjsNetwork): string | null;
export declare function isValidPublicKey(publicKey: string | Buffer, network: BitcoinjsNetwork): boolean;
export declare function isValidExtraId(extraId: string): boolean;
export declare function isValidPrivateKey(privateKey: string, network: BitcoinjsNetwork): boolean;
export declare function publicKeyToBuffer(publicKey: string | Buffer): Buffer;
export declare function publicKeyToString(publicKey: string | Buffer): string;
export declare function getMultisigPaymentScript(network: BitcoinjsNetwork, addressType: MultisigAddressType, pubkeys: Buffer[], m: number): bitcoin.payments.Payment;
export declare function getSinglesigPaymentScript(network: BitcoinjsNetwork, addressType: SinglesigAddressType, pubkey: Buffer): bitcoin.payments.Payment;
export declare function publicKeyToAddress(publicKey: string | Buffer, network: BitcoinjsNetwork, addressType: SinglesigAddressType): string;
export declare function publicKeyToKeyPair(publicKey: string | Buffer, network: BitcoinjsNetwork): BitcoinjsKeyPair;
export declare function privateKeyToKeyPair(privateKey: string, network: BitcoinjsNetwork): BitcoinjsKeyPair;
export declare function privateKeyToAddress(privateKey: string, network: BitcoinjsNetwork, addressType: SinglesigAddressType): string;
/**
 * Utility for converting xpub/xprv prefixed hd keys to the network specific prefix (ie Ltub/Ltpv)
 */
export declare function convertXPrefixHdKeys(hdKey: string, network: BitcoinjsNetwork): string;
export declare function validateAndFinalizeSignedTx(tx: BitcoinishSignedTransaction | BitcoinishUnsignedTransaction, psbt: bitcoin.Psbt): BitcoinishSignedTransaction;
export declare function isMultisigFullySigned(multisigData: MultisigData): boolean;
export declare function updateSignedMultisigTx(tx: BitcoinishSignedTransaction | BitcoinishUnsignedTransaction, psbt: bitcoin.Psbt, updatedMultisigData: MultisigData): BitcoinishSignedTransaction;
