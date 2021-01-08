const { formatCurrency } = require("@coingecko/cryptoformat");
exports.price = (coin, coinid, usd, btc, idr) => {
    var code = '`';
    return `*${coin} | ${coinid}*\n${code}Price: \n    USD ➻ ${usd}\n    BTC ➻ ${btc}\n    IDR ➻ ${idr}\n\n${code}narn Interest on your Crypto🔥`
}
exports.market = ( coin, c ) => {
    var code = '`';
    var arr =[];
    for(var a in c ) {
        arr.push({ market: c[a].market.name, price: c[a].converted_last.usd});
        
    }
    var market = 'market';
    var h = [... new Map(arr.map(item => [item[market], item])).values()].slice(0,10);
    
    
    var bc = [];
    var bv = [];
    h.forEach(i => {
        bc.push(`${i.market} ➻ ${formatCurrency(i.price,"USD","en")}`);
    })

    return `*Market (${coin.toUpperCase()})*\n\n${code}${bc.join('=>').replace(/=>/g,"\n")}${code}`
}
