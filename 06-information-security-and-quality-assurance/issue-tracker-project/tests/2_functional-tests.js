/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  var _id1;
  var _id2;

  suite("POST /api/issues/{project} => object with issue data", function() {
    test("Every field filled in", function(done) {
      const issue = {
        issue_title: "Title",
        issue_text: "text",
        created_by: "Functional Test - Every field filled in",
        assigned_to: "Chai and Mocha",
        status_text: "In QA"
      };

      chai
        .request(server)
        .post("/api/issues/test")
        .send(issue)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          _id1 = res.body._id;
          assert.equal(res.body.issue_title, issue.issue_title);
          assert.equal(res.body.issue_text, issue.issue_text);
          assert.equal(res.body.created_by, issue.created_by);
          assert.equal(res.body.assigned_to, issue.assigned_to);
          assert.equal(res.body.status_text, issue.status_text);
          done();
        });
    });

    test("Required fields filled in", function(done) {
      const issue = {
        issue_title: "Title",
        issue_text: "text",
        created_by: "Functional Test - Every field filled in"
      };

      chai
        .request(server)
        .post("/api/issues/test")
        .send(issue)
        .end(function(err, res) {
          _id2 = res.body._id;
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, issue.issue_title);
          assert.equal(res.body.issue_text, issue.issue_text);
          assert.equal(res.body.created_by, issue.created_by);
          done();
        });
    });

    test("Missing required fields", function(done) {
      const issue = {
        assigned_to: "Chai and Mocha",
        status_text: "In QA"
      };

      chai
        .request(server)
        .post("/api/issues/test")
        .send(issue)
        .end(function(err, res) {
          assert.equal(res.status, 422);
          assert.isDefined(res.body.errors);
          assert.isNotNull(res.body.errors);
          assert.isArray(res.body.errors);
          assert.isAbove(res.body.errors.length, 0);
          for (const error of res.body.errors) {
            assert.isDefined(error.msg);
            assert.isNotNull(res.body.msg);
            assert.isDefined(error.param);
            assert.isNotNull(res.body.param);
            assert.isDefined(error.location);
            assert.isNotNull(res.body.location);

            assert.oneOf(error.param, [
              "issue_title",
              "issue_text",
              "created_by"
            ]);
          }
          done();
        });
    });
  });

  suite("PUT /api/issues/{project} => text", function() {
    test("No body", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .end(function(err, res) {
          assert.equal(res.status, 422);
          assert.isDefined(res.body.errors);
          assert.isNotNull(res.body.errors);
          assert.isArray(res.body.errors);
          assert.isAbove(res.body.errors.length, 0);
          done();
        });
    });

    test("One field to update", function(done) {
      const updates = {
        _id: _id1,
        issue_title: "Updated Title"
      };

      chai
        .request(server)
        .put("/api/issues/test")
        .send(updates)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, updates.issue_title);
          done();
        });
    });

    test("Multiple fields to update", function(done) {
      const updates = {
        _id: _id2,
        issue_title: "Another Title",
        issue_text: "another text",
        assigned_to: "Chai, Mocha and Ciccio"
      };
      chai
        .request(server)
        .put("/api/issues/test")
        .send(updates)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, updates.issue_title);
          assert.equal(res.body.issue_text, updates.issue_text);
          assert.equal(res.body.assigned_to, updates.assigned_to);
          done();
        });
    });
  });

  suite(
    "GET /api/issues/{project} => Array of objects with issue data",
    function() {
      test("No filter", function(done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });

      test("One filter", function(done) {
        assert.fail();
        done();
      });

      test("Multiple filters (test for multiple fields you know will be in the db for a return)", function(done) {
        assert.fail();
        done();
      });
    }
  );

  suite("DELETE /api/issues/{project} => text", function() {
    test("No _id", function(done) {
      assert.fail();
      done();
    });

    test("Valid _id", function(done) {
      assert.fail();
      done();
    });
  });
});
