import { BalanceMonitor } from './BalanceMonitor';
import { AnyPayments } from './BasePayments';
import { PaymentsConnectionManager } from './PaymentsConnectionManager';
import { PaymentsUtils } from './PaymentsUtils';
import { BaseConfig } from './types';
/**
 * A factory class for instantiating various payments objects. Includes basic connection management
 * for reusing an established connection across objects.
 */
export declare abstract class PaymentsFactory<C extends BaseConfig = BaseConfig, U extends PaymentsUtils = PaymentsUtils, P extends AnyPayments<C> = AnyPayments<C>, B extends BalanceMonitor = BalanceMonitor> {
    abstract readonly packageName: string;
    /**
     * Should be assigned to a payments connection manager if the package uses some form of connected API
     * that can be shared across instantiated objects.
     * (ie web3 with websockets, Stellar.Server, RippleAPI, etc)
     */
    connectionManager?: PaymentsConnectionManager<any, C>;
    /** Instantiate a new Payments object */
    abstract newPayments(config: C): P;
    /** Instantiate a new PaymentsUtils object */
    abstract newUtils(config: C): U;
    /** true if newBalanceMonitor has been implemented */
    hasBalanceMonitor: boolean;
    /** Instantiate a new BalanceMonitor object. Override this if supported. */
    newBalanceMonitor(c: C): B;
    /** Instantiate a Payments object using an existing connection */
    initPayments(config: C): Promise<P>;
    /** Instantiate a PaymentsUtils object using an existing connection */
    initUtils(config: C): Promise<U>;
    /** Instantiate a BalanceMonitor object using an existing connection */
    initBalanceMonitor(config: C): Promise<B>;
    private createConnection;
    private reuseConnection;
}
