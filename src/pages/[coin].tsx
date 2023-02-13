import axios from 'axios';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { CoinType } from 'types';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${ctx.params?.coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false
        `
    );

    return {
        props: {
            coin: data,
            currency: ctx.query.currency || 'usd',
        },
    };
};

interface PageProps {
    coin: CoinType;
    currency: string;
}

export default function Page({ coin, currency }: PageProps) {
    return (
        <>
            <Head>
                <title>{coin.name} | Cryptocurrency Tracker</title>
                <meta
                    name="description"
                    content={`${coin.description.en.split('. ')[0]}.`}
                />
            </Head>
            <motion.div
                className="container flex h-screen flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
            >
                <article className="flex w-full max-w-sm flex-col items-center justify-center gap-8 rounded-lg bg-white p-6 shadow-sm">
                    <header className="flex flex-col items-center justify-center gap-2">
                        <div className="flex flex-col gap-1 text-center">
                            <h1 className="text-4xl font-bold text-gray-900">
                                {coin.name}{' '}
                            </h1>
                            <p>({coin.symbol.toUpperCase()})</p>
                        </div>
                        <Image
                            src={`${coin.image.large}`}
                            alt={`${coin.name} icon`}
                            width={100}
                            height={100}
                        />
                        <p className="text-2xl font-bold text-primary-500">
                            {coin.market_data.current_price[
                                currency
                            ].toLocaleString()}{' '}
                            {currency.toUpperCase()}
                        </p>
                    </header>
                    <main className="flex flex-col gap-2">
                        <p>
                            Market Cap:{' '}
                            <span className="font-bold text-gray-900">
                                {coin.market_data.market_cap[
                                    currency
                                ].toLocaleString()}{' '}
                                {currency.toUpperCase()}
                            </span>
                        </p>
                        <p>
                            Total Volume:{' '}
                            <span className="font-bold text-gray-900">
                                {coin.market_data.total_volume[
                                    currency
                                ].toLocaleString()}{' '}
                                {currency.toUpperCase()}
                            </span>
                        </p>
                        <p>
                            24hr High:{' '}
                            <span className="font-bold text-green-500">
                                {coin.market_data.high_24h[
                                    currency
                                ].toLocaleString()}{' '}
                                {currency.toUpperCase()}
                            </span>
                        </p>
                        <p>
                            24hr Low:{' '}
                            <span className="font-bold text-red-500">
                                {coin.market_data.low_24h[
                                    currency
                                ].toLocaleString()}{' '}
                                {currency.toUpperCase()}
                            </span>
                        </p>
                    </main>
                    <footer>
                        <Link
                            className="primary-button"
                            href={`/${currency ? `?currency=${currency}` : ''}`}
                        >
                            <IoArrowBack className="h-5 w-5" /> Go Back
                        </Link>
                    </footer>
                </article>
            </motion.div>
        </>
    );
}
