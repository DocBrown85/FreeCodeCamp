/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const {check, validationResult} = require("express-validator");

const PersonalLibraryService = require("../app/personal-library-service.js");

module.exports = function(app) {
  app
    .route("/api/books")
    .get(function(req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      PersonalLibraryService.getBooks()
        .then(books => {
          res.send(books);
        })
        .catch(error => {
          res.send(error);
        });
    })

    .post(
      check("title")
        .exists()
        .notEmpty()
        .isString(),
      function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        var title = req.body.title;
        //response will contain new book object including atleast _id and title
        PersonalLibraryService.addBook({title: title})
          .then(book => {
            res.send(book);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .delete(function(req, res) {
      //if successful response will be 'complete delete successful'
      PersonalLibraryService.deleteBooks()
        .then(book => {
          res.send(book);
        })
        .catch(error => {
          res.send(error);
        });
    });

  app
    .route("/api/books/:id")
    .get(
      check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
      function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }
        var id = req.params.id;

        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        PersonalLibraryService.getBook({id: id})
          .then(book => {
            res.send(book);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .post(
      check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
      check("comment")
        .exists()
        .notEmpty()
        .isString(),
      function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        var id = req.params.id;
        var comment = req.body.comment;
        //json res format same as .get

        PersonalLibraryService.addComment({id: id, comment: comment})
          .then(book => {
            res.send(book);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .delete(
      check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
      function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        var id = req.params.id;
        //if successful response will be 'delete successful'

        PersonalLibraryService.deleteBook({id: id})
          .then(book => {
            res.send(book);
          })
          .catch(error => {
            res.send(error);
          });
      }
    );
};
