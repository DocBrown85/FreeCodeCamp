/*
 * Issue Tracker business logic here
 */
"use strict";

const IssueDataSource = require("./issue-datasource");

module.exports = {
  getIssues: ({
    _id: _id,
    project: project,
    issue_title: issue_title,
    issue_text: issue_text,
    created_by: created_by,
    assigned_to: assigned_to,
    status_text: status_text,
    open
  }) => {
    return new Promise((resolve, reject) => {
      IssueDataSource.getIssues({
        _id: _id,
        project: project,
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to,
        status_text: status_text,
        open
      })
        .then(issues => {
          resolve(issues);
        })
        .catch(error => {
          reject(error);
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
      IssueDataSource.addIssue({
        project: project,
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to,
        status_text: status_text
      })
        .then(issue => {
          resolve(issue);
        })
        .catch(error => {
          reject(error);
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

      IssueDataSource.updateIssue(id, updates)
        .then(updatedIssue => {
          resolve(updatedIssue);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  deleteIssue: () => {}
};
