const logger = require(__dirname + "/log.js");

const URLLookupDataSource = require(__dirname + "/url-lookup-datasource.js");

const getShortenedURL = originalURL => {
  return new Promise((resolve, reject) => {
    if (!isValidURL(originalURL)) {
      reject({error: "invalid url"});
    }

    const shortenedURL = generateShortenedURL();
    URLLookupDataSource.addURLLookup(originalURL, shortenedURL).then(
      data => {
        resolve(data);
      },
      error => {
        reject(error);
      }
    );
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
  const max = 1000000;
  const shortenedURL = Math.round(Math.random() * (max - min) + min);
  return shortenedURL.toString();
};

module.exports = {
  getShortenedURL: getShortenedURL,
  visitShortenedURL: visitShortenedURL
};
