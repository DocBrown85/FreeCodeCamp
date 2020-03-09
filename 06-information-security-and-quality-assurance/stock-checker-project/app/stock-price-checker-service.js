/*
 * Stock Price Checker business logic here
 */
"use strict";

const StockPollDataSource = require("./stock-poll-datasource");
const StockService = require("./stock-service");

const getStockData = ({stock: stock, like: like}) => {
  return new Promise((resolve, reject) => {
    let stockData = {
      stock: null,
      price: null,
      likes: null
    };
    StockService.getStockData(stock)
      .then(stockServiceData => {
        stockData.stock = stockServiceData.symbol;
        stockData.price = stockServiceData.latestPrice;
      })
      .then(() => {
        stockData.likes = 0;
      })
      .then(() => {
        resolve(stockData);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  getStockData: getStockData
};
