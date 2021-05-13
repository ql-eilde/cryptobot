const dotenv = require('dotenv');
const Binance = require('node-binance-api');
const express = require('express');
const app = express();
dotenv.config();

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/cryptobot', function (req, res) {
    const body = req.body;
    if (body.ticker === null || body.position === null) {
        res.send('Bad request');
    }
    if (body.ticker === 'BTCBUSD') {
        let btc = 0;
        let busd = 0;
        binance.balance((error, balances) => {
            if (error) res.send('Issue with binance api.');
            btc = balances.BTC.available;
            busd = balances.BUSD.available;
        });

        if (body.position === 'buy') {
            if (busd > 0) {

            } else {
                res.send('Not enough BUSD on the account');
            }
        } else if (body.position === 'sell') {
            if (btc > 0) {

            } else {
                res.send('Not enough BTC on the account');
            }
        } else {
            res.send('Bad position value.')
        }
    } else if (body.ticker === 'ETHBUSD') {
        let eth = 0;
        let busd = 0;
        binance.balance((error, balances) => {
            if (error) res.send('Issue with binance api.');
            eth = balances.ETH.available;
            busd = balances.BUSD.available;
        });

        if (body.position === 'buy') {
            if (busd > 0) {

            } else {
                res.send('Not enough BUSD on the account');
            }
        } else if (body.position === 'sell') {
            if (eth > 0) {

            } else {
                res.send('Not enough ETH on the account');
            }
        } else {
            res.send('Bad position value.')
        }
    } else {
        res.send('Bad ticker value.');
    }
});

app.listen(3000);
