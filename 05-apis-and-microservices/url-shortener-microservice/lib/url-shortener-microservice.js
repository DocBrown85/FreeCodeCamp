const dns = require("dns");
const url = require("url-parse");

const logger = require(__dirname + "/log.js");

const URLLookupDataSource = require(__dirname + "/url-lookup-datasource.js");

const addURLLookup = originalURL => {
  return new Promise((resolve, reject) => {
    isValidURL(originalURL)
      .then(function(url) {
        const shortenedURL = generateShortenedURL();
        return shortenedURL;
      })
      .then(function(shortenedURL) {
        return URLLookupDataSource.addURLLookup(originalURL, shortenedURL);
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getURLLookup = shortenedURL => {
  return new Promise((resolve, reject) => {
    URLLookupDataSource.getURLLookup(shortenedURL)
      .then(originalURL => {
        resolve(originalURL);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const isValidURL = urlToCheck => {
  return new Promise((resolve, reject) => {
    const urlComponents = url(urlToCheck, true);
    const hostname = urlComponents.hostname;
    if (!hostname) {
      reject({error: "invalid URL"});
      return;
    }

    dns.lookup(hostname, function(err, addresses, family) {
      if (err) {
        logger.error(err);
        reject({error: "invalid URL"});
        return;
      }
      logger.info("resolved hostname " + hostname + ":");
      logger.info(addresses);
      resolve(url);
    });
  });
};

const generateShortenedURL = () => {
  const min = 0;
  const max = 1000000;
  const shortenedURL = Math.round(Math.random() * (max - min) + min);
  return shortenedURL.toString();
};

module.exports = {
  addURLLookup: addURLLookup,
  getURLLookup: getURLLookup
};
