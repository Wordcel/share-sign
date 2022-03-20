import { AnchorWallet, useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction as SolanaTransaction, Connection, TransactionInstruction } from '@solana/web3.js';
import { SolanaTransactionProps } from '../models/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { notify } from "../utils/notifications";

export const SendAnchorTransaction = ({ transaction }: SolanaTransactionProps) => {
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const router = useRouter();

    async function mkTransaction(transaction: SolanaTransaction, wallet: AnchorWallet, connection: Connection) {
        let newTransaction = new SolanaTransaction()
        const instructions = transaction.instructions.map((instruction) => {
            instruction.programId = new PublicKey(instruction.programId)
            instruction.keys.forEach((key) => {
                key.pubkey = new PublicKey(key.pubkey)
            })
            instruction.data = Buffer.from(instruction.data)
            return new TransactionInstruction(instruction)
        });
        newTransaction.add(...instructions)
        newTransaction.feePayer = wallet.publicKey
        const { blockhash } = await connection.getRecentBlockhash('finalized')
        newTransaction.recentBlockhash = blockhash
        const signedTransaction = await wallet.signTransaction(newTransaction)
        const txid = await connection.sendRawTransaction(signedTransaction.serialize());
        if (!txid) throw new Error('txid is undefined');
        const verified = await connection.confirmTransaction(txid, 'confirmed');
        if (verified) {
            notify({ type: 'success', message: 'Transaction successful!', txid: txid });
        }
        else {
            console.log(verified)
        }
    }

    useEffect(() => {
        if (!wallet) {
            return;
        }
        const { publicKey } = wallet;
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }
        mkTransaction(transaction, wallet, connection);
    }, [wallet, connection])

    return (
        <div className='flex flex-row items-center'>
            <div className='mockup-code pt-2'>
                <code className='pl-[15rem] mx-1'>
                    <pre>
                        {JSON.stringify(transaction, null, 4)}
                    </pre>
                </code>
            </div>
        </div>
    );
};
