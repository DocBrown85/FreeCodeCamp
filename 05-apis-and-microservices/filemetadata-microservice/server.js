"use strict";

const bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");

var app = express();

var routes = require(__dirname + "/routes.js");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
