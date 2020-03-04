/*
 * Issue data source logic here
 */
"use strict";

const mongo = require("mongodb");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    comments: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: {createdAt: "created_on", updatedAt: "updated_on"}
  }
);
const Book = mongoose.model("Book", BookSchema);

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
