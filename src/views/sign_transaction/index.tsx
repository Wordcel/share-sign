import { SendAnchorTransaction } from '../../components/SendAnchorTransaction';
import { SolanaTransactionProps } from '../../models/types';

export const TransactionView = (props: SolanaTransactionProps) => {
    return (

        <div className="md:hero mx-auto p-4">
            <div className="md:hero-content flex flex-col gap-16">
                <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]"> Transaction Data
                </h1>
                <SendAnchorTransaction transaction={props.transaction} />
            </div>
        </div>
    );
};
