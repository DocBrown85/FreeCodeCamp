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
          .isString(),
        check("status_text")
          .optional()
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

        const issue = {
          project: project,
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to,
          status_text: status_text
        };

        IssueTrackerService.addIssue(issue)
          .then(issue => {
            res.send(issue);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .put(
      [
        check("project")
          .exists()
          .notEmpty()
          .isString(),
        check("_id")
          .exists()
          .notEmpty()
          .isMongoId(),
        check("issue_title")
          .optional()
          .notEmpty()
          .isString(),
        check("issue_text")
          .optional()
          .notEmpty()
          .isString(),
        check("created_by")
          .optional()
          .notEmpty()
          .isString(),
        check("assigned_to")
          .optional()
          .notEmpty()
          .isString(),
        check("open")
          .optional()
          .notEmpty()
          .isBoolean()
      ],
      function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        const project = req.params.project;
        const id = req.body._id;
        const issue_title = req.body.issue_title;
        const issue_text = req.body.issue_text;
        const created_by = req.body.created_by;
        const assigned_to = req.body.assigned_to;
        const status_text = req.body.status_text;

        IssueTrackerService.updateIssue(
          project,
          id,
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text
        )
          .then(updatedIssue => {
            res.send(updatedIssue);
          })
          .catch(error => {
            res.send(error);
          });
      }
    )

    .delete(function(req, res) {
      var project = req.params.project;
    });
};
