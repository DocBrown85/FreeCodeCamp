/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  let _id1;

  test("#example Test GET /api/books", function(done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function() {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function() {
        test("Test POST /api/books with title", function(done) {
          const book = {title: "The Lord Of The Rings"};
          chai
            .request(server)
            .post("/api/books")
            .send(book)
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, "_id");
              assert.property(res.body, "title");
              _id1 = res.body._id;
              assert.equal(res.body.title, book.title);
              done();
            });
        });

        test("Test POST /api/books with no title given", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .end(function(err, res) {
              assert.equal(res.status, 422);
              assert.property(res.body, "errors");
              assert.isArray(res.body.errors);
              assert.isAbove(res.body.errors.length, 0);
              for (const error of res.body.errors) {
                assert.isDefined(error.msg);
                assert.isNotNull(error.msg);
                assert.isDefined(error.param);
                assert.isNotNull(error.param);
                assert.isDefined(error.location);
                assert.isNotNull(error.location);

                assert.equal(error.param, "title");
              }
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function() {
      test("Test GET /api/books", function(done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            for (const book of res.body) {
              assert.property(book, "_id");
              assert.property(book, "title");
              assert.property(book, "commentcount");
            }
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function() {
      test("Test GET /api/books/[id] with id not in db", function(done) {
        const _notExistingBookId = "5e5fc1a89242e9d94a75526e";
        chai
          .request(server)
          .get("/api/books/" + _notExistingBookId)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "no book exists");
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function(done) {
        chai
          .request(server)
          .get("/api/books/" + _id1)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.property(res.body, "_id");
            assert.property(res.body, "title");
            assert.property(res.body, "comments");
            assert.isArray(res.body.comments);
            assert.equal(res.body._id, _id1);
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function() {
        test("Test POST /api/books/[id] with comment", function(done) {
          const comment = {comment: "This book is awesome!"};
          chai
            .request(server)
            .post("/api/books/" + _id1)
            .send(comment)
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body);
              assert.property(res.body, "_id");
              assert.property(res.body, "title");
              assert.property(res.body, "comments");
              assert.equal(res.body._id, _id1);
              assert.isArray(res.body.comments);
              assert.include(res.body.comments, comment.comment);
              done();
            });
        });
      }
    );
  });
});
