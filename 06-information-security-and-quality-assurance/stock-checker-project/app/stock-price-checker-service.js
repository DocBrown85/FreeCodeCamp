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

const compareStocksData = ({
  stocks: stocks,
  like: like,
  ipAddress: ipAddress
}) => {
  return new Promise((resolve, reject) => {
    _fetchStocksData({
      stocks: stocks,
      like: like,
      ipAddress: ipAddress
    })
      .then(stocksData => {
        let stocksComparison = _getStocksComparison(
          stocksData[0],
          stocksData[1]
        );
        resolve(stocksComparison);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const _fetchStocksData = ({
  stocks: stocks,
  like: like,
  ipAddress: ipAddress
}) => {
  return new Promise((resolve, reject) => {
    let stocksDataPromises = [];
    for (let i = 0; i < stocks.length; i++) {
      stocksDataPromises.push(
        getStockData({
          stock: stocks[i],
          like: like,
          ipAddress: ipAddress
        })
      );
    }

    Promise.all(stocksDataPromises)
      .then(stocksData => {
        resolve(stocksData);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const _getStocksComparison = (stockDataA, stockDataB) => {
  let stocksComparison = [];

  stocksComparison[0] = {
    stock: stockDataA.stock,
    price: stockDataA.price,
    rel_likes: stockDataA.likes - stockDataB.likes
  };

  stocksComparison[1] = {
    stock: stockDataB.stock,
    price: stockDataB.price,
    rel_likes: stockDataB.likes - stockDataA.likes
  };

  return stocksComparison;
};

module.exports = {
  getStockData: getStockData,
  compareStocksData: compareStocksData
};
