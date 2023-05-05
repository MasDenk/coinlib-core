import { ValidationError, Type } from 'io-ts';
import { Reporter } from 'io-ts/lib/Reporter';
export declare function getMessage(e: ValidationError): string;
export declare const SimpleReporter: Reporter<Array<string>>;
/**
 * Throws a type error if `value` isn't conformant to type `T`.
 *
 * @param typeCodec - An io-ts type codec for T
 * @param value - The value to check
 * @returns The decoded value
 * @throws TypeError when assertion fails
 */
export declare function assertType<T>(typeCodec: Type<T, any, unknown>, value: unknown, description?: string, ErrorType?: {
    new (message: string): Error;
}): T;
