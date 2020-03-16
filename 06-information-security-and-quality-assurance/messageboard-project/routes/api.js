/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const {check, validationResult} = require("express-validator");

const MessageBoardService = require("../app/message-board-service.js");

module.exports = function(app) {
  app
    .route("/api/threads/:board")
    .get((req, res) => {
      res.status(501).send("not implemented");
    })
    .post((req, res) => {
      res.status(501).send("not implemented");
    })
    .put((req, res) => {
      res.status(501).send("not implemented");
    })
    .delete((req, res) => {
      res.status(501).send("not implemented");
    });

  app
    .route("/api/replies/:board")
    .get((req, res) => {
      res.status(501).send("not implemented");
    })
    .post((req, res) => {
      res.status(501).send("not implemented");
    })
    .put((req, res) => {
      res.status(501).send("not implemented");
    })
    .delete((req, res) => {
      res.status(501).send("not implemented");
    });
};
