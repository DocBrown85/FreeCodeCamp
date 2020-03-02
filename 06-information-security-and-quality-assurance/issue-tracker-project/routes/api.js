/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const {check, validationResult} = require("express-validator");

const IssueTrackerService = require("../app/issue-tracker-service.js");

module.exports = function(app) {
  app
    .route("/api/issues/:project")

    .get(
      [
        check("project")
          .exists()
          .notEmpty()
          .isString()
      ],
      function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        var project = req.params.project;

        IssueTrackerService.getIssues(project)
          .then(issue => {
            res.send(issue);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .post(
      [
        check("project")
          .exists()
          .notEmpty()
          .isString(),
        check("issue_title")
          .exists()
          .notEmpty()
          .isString(),
        check("issue_text")
          .exists()
          .notEmpty()
          .isString(),
        check("created_by")
          .exists()
          .notEmpty()
          .isString(),
        check("assigned_to")
          .optional()
          .notEmpty()
          .isString(),
        check("status_text")
          .optional()
          .notEmpty()
          .isString()
      ],
      function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        const project = req.params.project;
        const issue_title = req.body.issue_title;
        const issue_text = req.body.issue_text;
        const created_by = req.body.created_by;
        const assigned_to = req.body.assigned_to;
        const status_text = req.body.status_text;

        IssueTrackerService.addIssue(
          project,
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text
        )
          .then(issue => {
            res.send(issue);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .put(function(req, res) {
      var project = req.params.project;
    })

    .delete(function(req, res) {
      var project = req.params.project;
    });
};
