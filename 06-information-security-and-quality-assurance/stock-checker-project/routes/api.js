/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const {check, validationResult} = require("express-validator");

const IssueTrackerService = require("../app/stock-price-checker-service.js");

module.exports = function(app) {
  app.route("/api/stock-prices").get(function(req, res) {});
};
