/*
 * Issue data source logic here
 */
"use strict";

const mongo = require("mongodb");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const IssueSchema = mongoose.Schema(
  {
    project: {
      type: String,
      required: true
    },
    issue_title: {
      type: String,
      required: true
    },
    issue_text: {
      type: String,
      required: true
    },
    created_by: {
      type: String,
      required: true
    },
    assigned_to: {
      type: String,
      default: ""
    },
    status_text: {
      type: String,
      default: ""
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {createdAt: "created_on", updatedAt: "updated_on"}
  }
);
const Issue = mongoose.model("Issue", IssueSchema);

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

module.exports = {
  getIssues: project => {
    return new Promise((resolve, reject) => {
      Issue.find({project: project}, (err, data) => {
        if (err) {
          reject({error: err});
          return;
        }
        resolve(data);
      });
    });
  },

  addIssue: ({
    project: project,
    issue_title: issue_title,
    issue_text: issue_text,
    created_by: created_by,
    assigned_to: assigned_to,
    status_text: status_text
  }) => {
    return new Promise((resolve, reject) => {
      const issue = new Issue({
        project: project,
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to,
        status_text: status_text
      });

      issue.save((err, issue) => {
        if (err) {
          reject({error: err});
          return;
        }
        resolve(issue);
      });
    });
  },

  updateIssue: (
    id,
    {
      issue_title: issue_title,
      issue_text: issue_text,
      created_by: created_by,
      assigned_to: assigned_to,
      status_text: status_text,
      open: open
    }
  ) => {
    return new Promise((resolve, reject) => {
      let updates = {
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to,
        status_text: status_text,
        open: open
      };

      for (var ele in updates) {
        if (!updates[ele]) {
          delete updates[ele];
        }
      }

      Issue.findOneAndUpdate(
        {_id: new ObjectId(id)},
        updates,
        {new: true},
        function(err, updatedIssue) {
          if (err) {
            reject({error: err});
            return;
          }
          resolve(updatedIssue);
        }
      );
    });
  },

  deleteIssue: () => {}
};
