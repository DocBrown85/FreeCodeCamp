var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// --> 7)  Mount the Logger middleware here
app.use("/", function(req, resp, next) {
  var message = req.method + " " + req.path + " - " + req.ip;
  console.log(message);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get("/hello", function(req, resp) {
  resp.send("Hello Express");
});

/** 3) Serve an HTML file */
app.get("/", function(req, resp) {
  resp.sendFile(__dirname + "/views/index.html");
});

/** 4) Serve static assets  */
app.use("/", express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
app.get("/json", function(req, resp) {
  var message = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") {
    message = message.toUpperCase();
  }
  resp.send({message: message});
});

/** 6) Use the .env file to configure the app */

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get(
  "/now",
  function(req, resp, next) {
    req.time = new Date().toString();
    next();
  },
  function(req, resp) {
    resp.send({time: req.time});
  }
);

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function(req, resp) {
  var message = req.params.word;
  resp.send({echo: message});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function(req, resp) {
  var name = req.query.first + " " + req.query.last;
  resp.send({name: name});
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */
app.post("/name", function(req, resp) {
  var name = req.body.first + " " + req.body.last;
  resp.send({name: name});
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
