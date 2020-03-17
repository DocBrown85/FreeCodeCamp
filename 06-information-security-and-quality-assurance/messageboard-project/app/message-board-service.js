/*
 * Message Board business logic here
 */
"use strict";

const MessageBoardDataSource = require("./message-board-datasource");

const getThreadsFromMessageBoard = ({
  messageBoard: messageBoard,
  limit = 10
}) => {
  return new Promise((resolve, reject) => {
    MessageBoardDataSource.getThreadsFromMessageBoard({
      messageBoard: messageBoard,
      limit: limit
    })
      .then(threads => {
        threads.forEach(function(thread) {
          thread.replycount = thread.replies.length;
          if (thread.replies.length > 3) {
            thread.replies = thread.replies.slice(-3);
          }
        });
        resolve(threads);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addThreadToMessageBoard = ({
  messageBoard: messageBoard,
  text: text,
  deletePassword: deletePassword
}) => {
  return new Promise((resolve, reject) => {
    MessageBoardDataSource.addThreadToMessageBoard({
      messageBoard: messageBoard,
      text: text,
      deletePassword: deletePassword
    })
      .then(thread => {
        resolve(thread);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  getThreadsFromMessageBoard: getThreadsFromMessageBoard,
  addThreadToMessageBoard: addThreadToMessageBoard
};
