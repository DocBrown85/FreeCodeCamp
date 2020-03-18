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

const reportThreadOnMessageBoard = ({
  messageBoard: messageBoard,
  threadId: threadId
}) => {
  return new Promise((resolve, reject) => {
    MessageBoardDataSource.reportThreadOnMessageBoard({
      messageBoard: messageBoard,
      threadId: threadId
    })
      .then(thread => {
        if (thread === null) {
          resolve("incorrect thread id");
        } else {
          resolve("reported");
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteThreadFromMessageBoard = ({
  messageBoard: messageBoard,
  threadId: threadId,
  deletePassword: deletePassword
}) => {
  return new Promise((resolve, reject) => {
    MessageBoardDataSource.deleteThreadFromMessageBoard({
      messageBoard: messageBoard,
      threadId: threadId,
      deletePassword: deletePassword
    })
      .then(thread => {
        if (thread === null) {
          resolve("incorrect password");
        } else {
          resolve("success");
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getThreadRepliesFromMessageBoard = ({
  messageBoard: messageBoard,
  threadId: threadId
}) => {
  return new Promise((resolve, reject) => {
    MessageBoardDataSource.getThreadRepliesFromMessageBoard({
      messageBoard: messageBoard,
      threadId: threadId
    })
      .then(thread => {
        if (thread === null) {
          reject("incorrect thread id");
        } else {
          resolve(thread);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addThreadReplyOnMessageBoard = ({
  messageBoard: messageBoard,
  threadId: threadId,
  text: text,
  deletePassword: deletePassword
}) => {
  return new Promise((resolve, reject) => {
    MessageBoardDataSource.addThreadReplyOnMessageBoard({
      messageBoard: messageBoard,
      threadId: threadId,
      text: text,
      deletePassword: deletePassword
    })
      .then(thread => {
        if (thread === null) {
          reject("incorrect thread id");
        } else {
          resolve(thread);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const reportThreadReplyOnMessageBoard = ({
  messageBoard: messageBoard,
  threadId: threadId,
  replyId: replyId
}) => {
  return new Promise((resolve, reject) => {
    MessageBoardDataSource.reportThreadReplyOnMessageBoard({
      messageBoard: messageBoard,
      threadId: threadId,
      replyId: replyId
    })
      .then(thread => {
        resolve("reported");
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  getThreadsFromMessageBoard: getThreadsFromMessageBoard,
  addThreadToMessageBoard: addThreadToMessageBoard,
  reportThreadOnMessageBoard: reportThreadOnMessageBoard,
  deleteThreadFromMessageBoard: deleteThreadFromMessageBoard,
  getThreadRepliesFromMessageBoard: getThreadRepliesFromMessageBoard,
  addThreadReplyOnMessageBoard: addThreadReplyOnMessageBoard,
  reportThreadReplyOnMessageBoard: reportThreadReplyOnMessageBoard
};
