"use strict";

const bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");

var app = express();

var routes = require(__dirname + "/routes.js");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
  res.json({greetings: "Hello, API"});
});
*/

app.use("/", routes);

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
