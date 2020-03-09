/*
 * Stock Price Checker business logic here
 */
"use strict";

const StockPollDataSource = require("./stock-poll-datasource");
const StockService = require("./stock-service");

const addStockLike = ({stock: stock, ipAddress: ipAddress}) => {
  return new Promise((resolve, reject) => {
    StockPollDataSource.userHasVoted(ipAddress)
      .then(userHasVoted => {
        if (!userHasVoted) {
          return StockPollDataSource.addStockPreference({
            stock: stock,
            ipAddress: ipAddress
          });
        }
      })
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getStockData = ({stock: stock, like: like, ipAddress: ipAddress}) => {
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
        if (like) {
          return addStockLike({stock: stock, ipAddress: ipAddress});
        }
      })
      .then(() => {
        return StockPollDataSource.getTotalStockPreferences(stock);
      })
      .then(totalStockPreferences => {
        stockData.likes = totalStockPreferences.length;
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
