const fetch = require("node-fetch");

const getStockData = stock => {
  return new Promise((resolve, reject) => {
    fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`)
      .then(res => res.json())
      .then(stockData => {
        resolve(stockData);
      })
      .catch(error => {
        reject({error: "external source error"});
      });
  });
};

module.exports = {
  getStockData: getStockData
};
