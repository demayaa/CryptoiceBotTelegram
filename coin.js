const CoinGecko = require('coingecko-api');
const Price = require('./lib/price.js')
const CoinGeckoClient = new CoinGecko();
const { formatCurrency } = require("@coingecko/cryptoformat");


class Coin {
    constructor(coin) {
        this.coin = coin;
    }
    async CoinPrice() {
        let coin, coinid, usd, btc , idr, ath, Lusd, Lidr, Husd, Hidr, h1, h24, d7, rank, cap, vol;
        let b = await CoinGeckoClient.coins.fetch(this.coin, {});
        let market_data =  b.data.market_data
        let current_price = market_data.current_price
        coin = this.coin.replace(/[^a-zA-Z ]/g, " ")
        coinid = b.data.symbol
        idr = formatCurrency(current_price.idr, "IDR", "id");
        usd = formatCurrency(current_price.usd, "USD", "en");
        btc = current_price.btc;
        return Price.price(coin, coinid,usd, btc , idr);
    }
    
    async CoinMarket() {
        let b = await CoinGeckoClient.coins.fetch(this.coin, {}).catch(console.log);
        let c = b.data.tickers;
        let coin = this.coin.replace(/[^a-zA-Z ]/g, " ");
        return Price.market(coin, c);
    }
}


module.exports = Coin