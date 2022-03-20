import { Transaction as SolanaTransaction } from "@solana/web3.js"
import Head from "next/head";
import React, { useEffect } from "react";
import { notify } from "../../utils/notifications";
import { TransactionView } from "../../views";

interface Props {
    transaction: SolanaTransaction,
    error?: any
}

const Sign = function SignPage(props: Props) {
    useEffect(() => {
        if (props.error) {
            notify({ type: "error", "message": props.error })
        }
    }, [props.error]);


    return (
        <div>
            <Head>
                <title>Wordcel | Approve Transaction</title>
                <meta
                    name="description"
                    content="Approve Transaction"
                />
            </Head>
            <TransactionView transaction={props.transaction} />
        </div>
    );
};

export default Sign;
export async function getServerSideProps({
    query,
}: {
    query: {
        transaction: string
    }
}) {
    const jsonString = Buffer.from(query.transaction, 'base64').toString();
    try {
        const json = JSON.parse(jsonString);
        return {
            props: {
                transaction: json,
            },
        };
    } catch (error) {
        return {
            props: {
                error: 'Invalid JSON',
            },
        };
    }
}
