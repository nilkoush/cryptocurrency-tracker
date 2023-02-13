import Coin from '@/components/coin';
import axios from 'axios';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { CoinsType } from 'types';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data: coins } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
            ctx.query.currency || 'usd'
        }&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );

    return {
        props: {
            coins: coins,
            currency: ctx.query.currency || 'usd',
        },
    };
};

interface PageProps {
    coins: CoinsType[];
    currency: string;
}

export default function Page({ coins, currency }: PageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCoins, setFilteredCoins] = useState(coins);

    useEffect(() => {
        setFilteredCoins(
            coins.filter((coin) => {
                const query = searchQuery.toLowerCase();

                return (
                    coin.name.toLowerCase().indexOf(query) >= 0 ||
                    coin.symbol.toLowerCase().indexOf(query) >= 0
                );
            })
        );
    }, [searchQuery, coins]);

    return (
        <>
            <Head>
                <title>Cryptocurrency Tracker</title>
            </Head>
            <motion.div
                className="container mt-4 flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
            >
                <header>
                    <h1 className="text-center text-3xl font-bold text-gray-900 lg:text-5xl">
                        Cryptocurrency Tracker
                    </h1>
                </header>
                <main className="flex flex-col items-center justify-center rounded-lg bg-white">
                    <div className="flex w-full border-b border-b-gray-200">
                        <form className="flex w-full">
                            <input
                                className="w-full bg-transparent p-4 text-xl outline-none"
                                type="text"
                                placeholder="Search for coin"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>
                    {filteredCoins.map((coin) => (
                        <Coin coin={coin} currency={currency} key={coin.id} />
                    ))}
                </main>
            </motion.div>
        </>
    );
}
