export interface CoinsType {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
}

export interface CoinType {
    id: string;
    symbol: string;
    name: string;
    description: {
        en: string;
    };
    image: {
        large: string;
    };
    market_data: {
        current_price: {
            [x: string]: number;
        };
        market_cap: {
            [x: string]: number;
        };
        total_volume: {
            [x: string]: number;
        };
        high_24h: {
            [x: string]: number;
        };
        low_24h: {
            [x: string]: number;
        };
    };
}
