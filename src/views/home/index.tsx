// Next, React
import { FC, } from 'react';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

export const HomeView: FC = ({ }) => {
    return (

        <div className="md:hero mx-auto p-4">
            <div className="md:hero-content flex flex-col">
                <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]"> Welcome Home
                </h1>
            </div>
        </div>
    );
};
