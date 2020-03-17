/*
 * Message Board data source logic here
 */
"use strict";

const mongo = require("mongodb");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const ReplySchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    reported: {
      type: Boolean,
      default: true
    },
    delete_password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {createdAt: "created_on"}
  }
);
const Reply = mongoose.model("Reply", ReplySchema);

const ThreadSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    delete_password: {
      type: String,
      required: true
    },
    reported: {
      type: Boolean,
      default: true
    },
    replies: {
      type: [ReplySchema],
      default: []
    }
  },
  {
    timestamps: {createdAt: "created_on", updatedAt: "bumped_on"}
  }
);

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

const getThreadsFromMessageBoard = ({messageBoard: messageBoard}) => {
  return new Promise((resolve, reject) => {
    const Thread = mongoose.model("Thread", ThreadSchema, messageBoard);

    Thread.find(
      {},
      {
        reported: 0,
        delete_password: 0,
        "replies.delete_password": 0,
        "replies.reported": 0
      }
    )
      .sort({bumped_on: -1})
      .limit(10)
      .exec((err, threads) => {
        if (err) {
          reject({error: err});
          return;
        }
        threads.forEach(function(thread) {
          thread.replycount = thread.replies.length;
          if (thread.replies.length > 3) {
            thread.replies = thread.replies.slice(-3);
          }
        });
        resolve(threads);
      });
  });
};

const addThreadToMessageBoard = ({
  messageBoard: messageBoard,
  text: text,
  deletePassword: deletePassword
}) => {
  return new Promise((resolve, reject) => {
    const Thread = mongoose.model("Thread", ThreadSchema, messageBoard);

    const thread = new Thread({text: text, delete_password: deletePassword});
    thread.save((err, thread) => {
      if (err) {
        reject({error: err});
        return;
      }
      resolve(thread);
    });
  });
};

module.exports = {
  getThreadsFromMessageBoard: getThreadsFromMessageBoard,
  addThreadToMessageBoard: addThreadToMessageBoard
};
