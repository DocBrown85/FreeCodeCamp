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

        const project = req.params.project;
        const _id = req.query._id;
        const issue_title = req.query.issue_title;
        const issue_text = req.query.issue_text;
        const created_by = req.query.created_by;
        const assigned_to = req.query.assigned_to;
        const status_text = req.query.status_text;
        const open = req.query.open;

        let filters = {
          _id: _id,
          project: project,
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to,
          status_text: status_text,
          open: open
        };

        IssueTrackerService.getIssues(filters)
          .then(issues => {
            res.send(issues);
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
          .isString(),
        check("issue_text")
          .optional()
          .isString(),
        check("created_by")
          .optional()
          .isString(),
        check("assigned_to")
          .optional()
          .isString(),
        check("open")
          .optional()
          .isBoolean()
      ],
      function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }

        const id = req.body._id;
        const issue_title = req.body.issue_title;
        const issue_text = req.body.issue_text;
        const created_by = req.body.created_by;
        const assigned_to = req.body.assigned_to;
        const status_text = req.body.status_text;
        const open = req.body.open;

        const updates = {
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to,
          status_text: status_text,
          open: open
        };

        IssueTrackerService.updateIssue(id, updates)
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
