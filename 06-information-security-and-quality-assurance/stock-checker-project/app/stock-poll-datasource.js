/*
 * Stock Poll Data Source logic here
 */
"use strict";

const mongo = require("mongodb");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const StockPreferenceSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    stockPreference: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {createdAt: "created_on", updatedAt: "updated_on"}
  }
);
const StockPreference = mongoose.model(
  "StockPreference",
  StockPreferenceSchema
);

mongoose.connect(
  process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  function(err) {
    if (err) {
      console.log("MongoDB connection error: " + err);
      process.exit(1);
    }
  }
);

const userHasVoted = user => {
  return new Promise((resolve, reject) => {
    StockPreference.find({user: user}, (err, data) => {
      if (err) {
        reject({error: err});
        return;
      }
      let userHasVoted = data.length > 0;

      resolve(userHasVoted);
    });
  });
};

const addStockPreference = ({stock: stock, ipAddress: ipAddress}) => {
  return new Promise((resolve, reject) => {
    let stockPreference = new StockPreference({
      user: ipAddress,
      stockPreference: stock
    });

    stockPreference.save((err, preference) => {
      if (err) {
        reject({error: err});
        return;
      }
      resolve(preference);
    });
  });
};

const getTotalStockPreferences = stock => {
  return new Promise((resolve, reject) => {
    StockPreference.find({stockPreference: stock}, (err, data) => {
      if (err) {
        reject({error: err});
        return;
      }
      resolve(data);
    });
  });
};

module.exports = {
  userHasVoted: userHasVoted,
  addStockPreference: addStockPreference,
  getTotalStockPreferences: getTotalStockPreferences
};
