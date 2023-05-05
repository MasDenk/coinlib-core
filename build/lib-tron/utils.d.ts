import { Logger } from '../ts-common';
/** Converts strings to Error */
export declare function toError(e: any): any;
export declare function retryIfDisconnected<T>(fn: () => Promise<T>, logger: Logger): Promise<T>;
