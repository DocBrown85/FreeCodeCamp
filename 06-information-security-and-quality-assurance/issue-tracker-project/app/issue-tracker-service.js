/*
 * Issue Tracker business logic here
 */
"use strict";

const IssueDataSource = require("./issue-datasource");

module.exports = {
  getIssues: project => {
    return new Promise((resolve, reject) => {
      IssueDataSource.getIssues(project)
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
  updateIssue: () => {},
  deleteIssue: () => {}
};
