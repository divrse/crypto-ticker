#!/usr/bin/env node
const rp = require('request-promise')
let currency = process.argv[2] || 'BTC'
currency = currency.toUpperCase()
let binanceAPI = 'https://api.binance.com/api/v1/ticker/price?symbol='
let finexAPI = 'https://api-pub.bitfinex.com/v2/tickers?symbols='

if(currency == 'BTC') {
	finexPrice(currency)
} else {
	binancePrice(currency)
}


async function binancePrice(coin) {
	let url = binanceAPI + coin + 'BTC'
	let opts = {url,json:true}
	let {symbol, price }= await rp(opts)
	console.log(`${symbol}: ${price}`)
}


async function finexPrice(coin) {
	let pair
	let printPair
	if(coin == 'BTC') {
		pair = 'tBTCUSD'
		printPair = 'BTCUSD'
	}  else {
		pair = `${coin}BTC`

	}
	let url = finexAPI + pair
	let res = await rp(url, {json:true})
	let firstPair = res[0]
	let lastPrice = firstPair[firstPair.length -4]
	let hasDecimal = lastPrice.toString().indexOf('.') != -1
	if(hasDecimal) lastPrice = lastPrice.toFixed(2)
	console.log(`${printPair}: ${lastPrice}`)
}
