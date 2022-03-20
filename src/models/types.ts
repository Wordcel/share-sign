import { Transaction as SolanaTransaction } from "@solana/web3.js"

export type EndpointTypes = 'mainnet' | 'devnet' | 'localnet'

export interface SolanaTransactionProps {
    transaction: SolanaTransaction,
    error?: any
}