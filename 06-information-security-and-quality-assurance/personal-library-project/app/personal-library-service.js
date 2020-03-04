/*
 * Issue Tracker business logic here
 */
"use strict";

const LibraryDataSource = require("./library-datasource");

const getBooks = () => {
  return new Promise((resolve, reject) => {
    LibraryDataSource.getBooks()
      .then(retrievedBooks => {
        let books = [];
        for (var i = 0; i < retrievedBooks.length; i++) {
          books.push({
            _id: retrievedBooks[i]._id,
            title: retrievedBooks[i].title,
            commentcount: retrievedBooks[i].comments.length
          });
        }
        resolve(books);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getBook = ({id: id}) => {
  return new Promise((resolve, reject) => {
    LibraryDataSource.getBook({id: id})
      .then(book => {
        if (book == null) {
          resolve("no book exists");
          return;
        }
        resolve(book);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addBook = ({title: title}) => {
  return new Promise((resolve, reject) => {
    LibraryDataSource.addBook({title: title})
      .then(book => {
        resolve(book);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addComment = ({id: id, comment: comment}) => {
  return new Promise((resolve, reject) => {
    LibraryDataSource.addComment({id: id, comment: comment})
      .then(book => {
        resolve(book);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteBook = ({id: id}) => {
  return new Promise((resolve, reject) => {
    LibraryDataSource.deleteBook({id: id})
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteBooks = () => {
  return new Promise((resolve, reject) => {
    LibraryDataSource.deleteBooks()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
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
