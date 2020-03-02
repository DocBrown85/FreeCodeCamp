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
  addIssue: (
    project,
    issue_title,
    issue_text,
    created_by,
    assigned_to = null,
    status_text = null
  ) => {
    return new Promise((resolve, reject) => {
      IssueDataSource.addIssue(
        project,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text
      )
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
