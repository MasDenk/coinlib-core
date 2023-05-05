import BigNumber from 'bignumber.js';
import { BIP32Interface as HDNode, BIP32API } from 'bip32';
import { ECPairAPI } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
export { BigNumber };
declare const bip32: BIP32API;
declare const ecpair: ECPairAPI;
export { bip32, HDNode, ecpair, ecc };
