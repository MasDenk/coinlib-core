import { CoinPayments, NetworkType, SUPPORTED_NETWORK_SYMBOLS, AnyPayments } from '../'
import crypto from 'crypto'

async function main() {
    var c = new CoinPayments({ seed: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", network: NetworkType.Mainnet })

    function randU32Sync() {
        return crypto.randomBytes(4).readUInt32BE(0);
    }

    const safeRand = () => Math.round(randU32Sync() / 1000);

    const networks: Partial<Record<typeof SUPPORTED_NETWORK_SYMBOLS[number], AnyPayments<any>>> = {}

    for (const networkSymbol of SUPPORTED_NETWORK_SYMBOLS) {
        const curr = c.forNetwork(networkSymbol);
        await curr.init();
        networks[networkSymbol] = curr
    }

    for (const [symbol, network] of Object.entries(networks)) {
        for (let i = 0; i < 5; i++) {
            const walletIndex = safeRand();
            const { address } = await network.getPayport(walletIndex);
            const balance = await network.getBalance(walletIndex);
            console.log(`[${symbol} ${i + 1}]: address: ${address}, Confirmed balance: ${balance.confirmedBalance}, Unconfirmed balance: ${balance.unconfirmedBalance}`);
        }
    }
}

main()