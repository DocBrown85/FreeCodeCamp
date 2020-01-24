const dotenv = require("dotenv");

const mongo = require("mongodb");
const mongoose = require("mongoose");
const winston = require("winston");

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {service: "user-service"},
  transports: [
    new winston.transports.File({filename: "error.log", level: "error"}),
    new winston.transports.File({filename: "combined.log"})
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

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

const LookupURLSchema = mongoose.Schema({
  original_url: String,
  short_url: String
});

const LookupURL = mongoose.model("LookupURL", LookupURLSchema);

const getShortenedURL = originalURL => {
  return new Promise((resolve, reject) => {
    if (!isValidURL(originalURL)) {
      reject({error: "invalid URL"});
    }

    const shortenedURL = generateShortenedURL();

    const lookupURL = new LookupURL({
      original_url: originalURL,
      short_url: shortenedURL
    });

    lookupURL.save((err, lookupData) => {
      if (err) {
        reject({error: err});
      }
      resolve(lookupData);
    });
  });
};

const visitShortenedURL = shotenedURL => {
  return new Promise((resolve, reject) => {});
};

const isValidURL = url => {
  return true;
};

const generateShortenedURL = () => {
  const min = 0;
  const max = 1000000000;
  const shortenedURL = Math.random() * (max - min) + min;
  return shortenedURL.toString();
};

module.exports = {
  getShortenedURL: getShortenedURL,
  visitShortenedURL: visitShortenedURL
};
