import * as t from 'io-ts';
declare class FunctionType<Fn extends Function> extends t.Type<Fn> {
    readonly _tag: 'FunctionType';
    constructor(name?: string);
}
export interface FunctionC<Fn extends Function> extends FunctionType<Fn> {
}
/**
 * An io-ts codec representing a Function. Only tests for typeof function but allows generic to specify
 * a more specific static type with a signature and return type.
 */
export declare function functionT<Fn extends Function>(name?: string): FunctionC<Fn>;
export {};
