"use strict";

var express = require("express");

var cors = require("cors");
var bodyParser = require("body-parser");

var routes = require(__dirname + "/routes");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

app.use(cors());

/** this project needs to parse POST bodies **/
app.use(bodyParser.urlencoded({extended: "false"}));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, function() {
  console.log("Node.js listening ...");
});
