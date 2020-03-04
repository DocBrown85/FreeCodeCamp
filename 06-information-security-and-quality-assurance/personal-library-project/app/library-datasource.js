/*
 * Issue data source logic here
 */
"use strict";

const mongo = require("mongodb");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    comments: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: {createdAt: "created_on", updatedAt: "updated_on"}
  }
);
const Book = mongoose.model("Book", BookSchema);

mongoose.connect(
  process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  function(err) {
    if (err) {
      console.log("MongoDB connection error: " + err);
      process.exit(1);
    }
  }
);

const getBooks = () => {
  return new Promise((resolve, reject) => {
    Book.find((err, books) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(books);
    });
  });
};

const getBook = ({id: id}) => {
  return new Promise((resolve, reject) => {
    Book.findById(id, (err, book) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(book);
    });
  });
};

const addBook = ({title: title}) => {
  return new Promise((resolve, reject) => {
    const book = new Book({title: title});

    book.save((err, book) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(book);
    });
  });
};

const addComment = ({id: id, comment: comment}) => {
  return new Promise((resolve, reject) => {
    Book.findOneAndUpdate(
      {_id: id},
      {$push: {comments: comment}},
      {new: true, upsert: false},
      function(err, book) {
        if (err) {
          reject(err);
          return;
        }
        resolve(book);
      }
    );
  });
};

const deleteBook = ({id: id}) => {
  return new Promise((resolve, reject) => {
    Book.findOneAndRemove({_id: id}, function(err, book) {
      if (err) {
        reject(err);
        return;
      }
      resolve("delete successful");
    });
  });
};

const deleteBooks = () => {
  return new Promise((resolve, reject) => {
    Book.deleteMany({}, function(err, book) {
      if (err) {
        reject(err);
        return;
      }
      resolve("complete delete successful");
    });
  });
};

module.exports = {
  getBooks: getBooks,
  getBook: getBook,
  addBook: addBook,
  addComment: addComment,
  deleteBook: deleteBook,
  deleteBooks: deleteBooks
};
