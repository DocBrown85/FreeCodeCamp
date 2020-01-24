const express = require("express");
const routes = express.Router();

const URLShortenerService = require(__dirname + "/url-shortener-microservice");

routes.use("/public", express.static(process.cwd() + "/public"));

routes.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

routes.get("/api/hello", function(req, res) {
  res.json({greeting: "hello API"});
});

routes.post("/api/shorturl/new", (req, res) => {
  const originalURL = req.body.url;
  URLShortenerService.getShortenedURL(originalURL).then(
    data => {
      res.json(data);
    },
    error => {
      res.json(error);
    }
  );
});

module.exports = routes;
