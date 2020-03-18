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

    .put(
      [
        check("report_id")
          .exists()
          .isMongoId()
      ],
      (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        const messageBoard = req.params.board;
        const threadId = req.body.report_id;

        MessageBoardService.reportThreadOnMessageBoard({
          messageBoard: messageBoard,
          threadId: threadId
        })
          .then(result => {
            res.send(result);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .delete(
      [
        check("thread_id")
          .exists()
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

    .get(
      [
        check("thread_id")
          .exists()
          .isMongoId()
      ],
      (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        const messageBoard = req.params.board;
        const threadId = req.query.thread_id;

        MessageBoardService.getThreadRepliesFromMessageBoard({
          messageBoard: messageBoard,
          threadId: threadId
        })
          .then(thread => {
            res.send(thread);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .post(
      [
        check("thread_id")
          .exists()
          .isMongoId(),
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
        const threadId = req.body.thread_id;
        const text = req.body.text;
        const deletePassword = req.body.delete_password;

        MessageBoardService.addThreadReplyOnMessageBoard({
          messageBoard: messageBoard,
          threadId: threadId,
          text: text,
          deletePassword: deletePassword
        })
          .then(thread => {
            res.redirect("/b/" + messageBoard + "/" + threadId);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .put(
      [
        check("thread_id")
          .exists()
          .isMongoId(),
        check("reply_id")
          .exists()
          .isMongoId()
      ],
      (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        const messageBoard = req.params.board;
        const threadId = req.body.thread_id;
        const replyId = req.body.reply_id;

        MessageBoardService.reportThreadReplyOnMessageBoard({
          messageBoard: messageBoard,
          threadId: threadId,
          replyId: replyId
        })
          .then(result => {
            res.send(result);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .delete(
      [
        check("thread_id")
          .exists()
          .isMongoId(),
        check("reply_id")
          .exists()
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
        const replyId = req.body.reply_id;
        const deletePassword = req.body.delete_password;

        MessageBoardService.deleteThreadReplyOnMessageBoard({
          messageBoard: messageBoard,
          threadId: threadId,
          replyId: replyId,
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
};
