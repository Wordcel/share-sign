import type {NextPage} from "next";
import Head from "next/head";
import {HomeView} from "../views";

const Home: NextPage = (props) => {
    return (
        <div>
            <Head>
                <title>Wordcel | Approve Transaction</title>
                <meta
                    name="description"
                    content="Approve Transaction"
                />
            </Head>
            <HomeView />
        </div>
    );
};

export default Home;
