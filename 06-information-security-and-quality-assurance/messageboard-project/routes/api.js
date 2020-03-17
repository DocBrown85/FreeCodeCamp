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
      const messageBoard = req.params.board;

      MessageBoardService.getThreadsFromMessageBoard({
        messageBoard: messageBoard
      })
        .then(threads => {
          res.send(threads);
        })
        .catch(error => {
          res.send(error);
        });
    })

    .post(
      [
        check("text")
          .exists()
          .notEmpty()
          .isString(),
        check("delete_password")
          .exists()
          .notEmpty()
          .isString()
      ],
      (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        const messageBoard = req.params.board;
        const text = req.body.text;
        const deletePassword = req.body.delete_password;

        MessageBoardService.addThreadToMessageBoard({
          messageBoard: messageBoard,
          text: text,
          deletePassword: deletePassword
        })
          .then(thread => {
            res.redirect("/b/" + messageBoard + "/");
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .put((req, res) => {
      res.status(501).send("not implemented");
    })

    .delete(
      [
        check("thread_id")
          .optional()
          .isMongoId(),
        check("delete_password")
          .exists()
          .notEmpty()
          .isString()
      ],
      (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        const messageBoard = req.params.board;
        const threadId = req.body.thread_id;
        const deletePassword = req.body.delete_password;

        MessageBoardService.deleteThreadFromMessageBoard({
          messageBoard: messageBoard,
          threadId: threadId,
          deletePassword: deletePassword
        })
          .then(result => {
            res.send(result);
          })
          .catch(error => {
            res.send(error);
          });
      }
    );

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
