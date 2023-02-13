import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { CoinsType } from 'types';

export interface CoinProps {
    coin: CoinsType;
    currency: string;
}

const Coin: FC<CoinProps> = ({ coin, currency }) => {
    return (
        <>
            <article className="grid w-full grid-cols-1 items-center justify-center gap-4 border-b border-b-gray-200 bg-white p-6 shadow-sm last:border-0 lg:grid-cols-[1fr_3fr_1fr]">
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <Image
                        src={`${coin.image}`}
                        alt={`${coin.name} icon`}
                        width={75}
                        height={75}
                    />
                    <div className="flex flex-col items-center lg:items-start">
                        <h2 className="text-lg font-bold text-gray-900">
                            {coin.name}
                        </h2>
                        <p className="text-gray-700">
                            ({coin.symbol.toUpperCase()})
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 place-items-center gap-2 lg:grid-cols-3 lg:gap-4">
                    <p className="text-sm font-bold text-primary-500">
                        {coin.current_price.toFixed(2)} {currency.toUpperCase()}
                    </p>
                    {coin.price_change_percentage_24h < 0 ? (
                        <p className="text-sm font-bold text-red-500">
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    ) : (
                        <p className="text-sm font-bold text-green-500">
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    )}
                    <p className="text-sm font-bold text-gray-900">
                        {coin.market_cap.toLocaleString()}{' '}
                        {currency.toUpperCase()}
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <Link
                        className="primary-button"
                        href={`/${encodeURIComponent(coin.id)}${
                            currency ? `?currency=${currency}` : ''
                        }`}
                    >
                        More Info <IoArrowForward className="h-5 w-5" />
                    </Link>
                </div>
            </article>
        </>
    );
};

export default Coin;
