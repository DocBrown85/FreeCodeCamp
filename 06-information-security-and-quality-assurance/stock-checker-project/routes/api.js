/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const {check, validationResult} = require("express-validator");

const StockPriceCheckerService = require("../app/stock-price-checker-service.js");

module.exports = function(app) {
  app.route("/api/stock-prices").get(
    [
      check("stock")
        .exists()
        .notEmpty(),
      check("like")
        .optional()
        .isBoolean()
    ],
    function(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const stock = req.query.stock;
      const like = req.query.like || false;
      const ipAddress = req.connection.remoteAddress;

      const parameters = {
        stock: stock,
        like: like,
        ipAddress: ipAddress
      };

      StockPriceCheckerService.getStockData(parameters)
        .then(stockData => {
          res.send({stockData: stockData});
        })
        .catch(error => {
          res.send(error);
        });
    }
  );
};
