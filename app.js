require('dotenv').config();
const { Telegraf } = require('telegraf')
const CoinGecko = require('coingecko-api');
const Coin = require('./coin.js')
const express = require('express');
const extra = require('telegraf/extra')


const expressApp = express();
const CoinGeckoClient = new CoinGecko();
const markup = extra.markdown()


const BOT_TOKEN = process.env.BOT_TOKEN || '1525516398:AAEdB8zl-m8KfYZkTKKIe5JDsIhbZV4lEsY';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://cryptoice.herokuapp.com/';


const bot = new Telegraf(BOT_TOKEN)

bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${BOT_TOKEN}`));

bot.hears(/\/p (.+)/, (ctx) => {
    const co = ctx.match[1].toLowerCase();
    let coin =async () => {
        let coin_list  = await CoinGeckoClient.coins.list();
        let arr = await coin_list.data;
        arr.map(function (coinst) {
            if (coinst.symbol == co) {
                //ctx.reply()
                new Coin(coinst.id).CoinPrice().then((data) => {
                 ctx.reply(data, markup)   
                })
                //console.log(coinst)
            } else if(coinst.id == co ){
                //ctx.reply(coinst)
                //console.log(coinst)
                new Coin(coinst.id).CoinPrice().then((data) => {
                 ctx.reply(data, markup)   
                })
            } 
        })
    };
    coin().catch(() => {})
    //
})

bot.hears(/\/market (.+)/, (ctx) => {
    const com = ctx.match[1].toLowerCase();
    let coin = async () => {
        let coin_list  = await CoinGeckoClient.coins.list();
        let arr = await coin_list.data;
        arr.map(function (coinst) {
            if (coinst.symbol == com) {
                //console.log(coinst)
                new Coin(coinst.id).CoinMarket().then((data) => {
                ctx.reply(data, markup)
                })
            } else if(coinst.id == com ){
                //ctx.reply(coinst)
                //console.log(coinst)
                new Coin(coinst.id).CoinMarket().then((data) => {
                ctx.reply(data, markup)
                })
            } 
        })
    }
    coin().catch(() => {})
})

bot.command('/p', ({ reply }) => reply('Command of Price Coin\nexp: `/p btc`', markup))
bot.command('/market', ({reply}) => reply('Command of Call Coin Market\nexp: `/Market btc`'));

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

setInterval(function () {
  bot.launch()
}, 5000)