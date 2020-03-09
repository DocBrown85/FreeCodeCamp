/*
 * Stock Poll Data Source logic here
 */
"use strict";

const mongo = require("mongodb");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const StockPollSchema = mongoose.Schema(
  {
    votingIpAddress: {
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
const StockPoll = mongoose.model("StockPoll", StockPollSchema);

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

module.exports = {};
