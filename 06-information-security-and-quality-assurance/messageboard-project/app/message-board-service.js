/*
 * Message Board business logic here
 */
"use strict";

const MessageBoardDataSource = require("./message-board-datasource");

const getThreadsFromMessageBoard = ({messageBoard: messageBoard}) => {
  return new Promise((resolve, reject) => {
    MessageBoardDataSource.getThreadsFromMessageBoard({
      messageBoard: messageBoard
    })
      .then(threads => {
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
