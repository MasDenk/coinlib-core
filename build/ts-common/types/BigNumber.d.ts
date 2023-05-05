import * as t from 'io-ts';
import BigNumber from 'bignumber.js';
declare class BigNumberType extends t.Type<BigNumber, string> {
    readonly _tag: 'BigNumberType';
    constructor();
}
export interface BigNumberC extends BigNumberType {
}
/**
 * An io-ts codec representing a BigNumber. Can also be decoded from a string or number.
 */
export declare const BigNumberT: BigNumberC;
export declare type BigNumberT = t.TypeOf<typeof BigNumberT>;
export {};
