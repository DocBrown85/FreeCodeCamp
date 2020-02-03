const dotenv = require("dotenv");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const _ = require("lodash");

const logger = require(__dirname + "/log.js");

const URLLookupSchema = mongoose.Schema({
  original_url: String,
  short_url: String
});

const URLLookup = mongoose.model("URLLookup", URLLookupSchema);

dotenv.config();

mongoose.connect(
  process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function(err) {
    if (err) {
      logger.error("MongoDB connection error: " + err);
      process.exit(1);
    }
  }
);

const addURLLookup = (originalURL, shortenedURL) => {
  return new Promise((resolve, reject) => {
    const urlLookup = new URLLookup({
      original_url: originalURL,
      short_url: shortenedURL
    });

    urlLookup.save((err, lookupData) => {
      if (err) {
        reject({error: err});
        return;
      }
      const cleanLookupData = removeMongooseFields(lookupData.toObject());
      resolve(cleanLookupData);
    });
  });
};

const removeMongooseFields = object => {
  return _.omit(object, ["_id", "__v"]);
};

module.exports = {
  addURLLookup: addURLLookup
};
