const express = require("express");
const routes = express.Router();

routes.use(express.static("public"));
routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

routes.post("/api/exercise/new-user", (req, res) => {});

routes.get("/api/exercise/users", (req, res) => {});

routes.post("/api/exercise/add", (req, res) => {});

routes.get("/api/exercise/log", (req, res) => {});

module.exports = routes;
