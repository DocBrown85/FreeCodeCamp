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
  const messageBoard = "a_message_board";
  const someText = Math.floor(Math.random() * 10000000) + "";
  const deletePassword = "password";
  const wrongDeletePassword = "wrongpassword";
  let threadId1; //_id of thread 1 created
  let threadId2; //_id of thread 2 created
  let replyId1; //_id of reply created

  suite("API ROUTING FOR /api/threads/:board", function() {
    suite("POST", function() {
      test("create 2 new threads(because we end up deleting 1 in the delete test)", function(done) {
        chai
          .request(server)
          .post("/api/threads/" + messageBoard)
          .send({text: someText, delete_password: deletePassword})
          .end(function(err, res) {
            assert.equal(res.status, 200);
          });
        chai
          .request(server)
          .post("/api/threads/" + messageBoard)
          .send({text: someText, delete_password: deletePassword})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    suite("GET", function() {
      test("most recent 10 threads with most recent 3 replies each", function(done) {
        chai
          .request(server)
          .get("/api/threads/" + messageBoard)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isBelow(res.body.length, 11);
            assert.property(res.body[0], "_id");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "bumped_on");
            assert.property(res.body[0], "text");
            assert.property(res.body[0], "replies");
            assert.notProperty(res.body[0], "reported");
            assert.notProperty(res.body[0], "delete_password");
            assert.isArray(res.body[0].replies);
            assert.isBelow(res.body[0].replies.length, 4);
            threadId1 = res.body[0]._id;
            threadId2 = res.body[1]._id;
            done();
          });
      });
    });

    suite("DELETE", function() {
      test("delete thread with good password", function(done) {
        chai
          .request(server)
          .delete("/api/threads/" + messageBoard)
          .send({thread_id: threadId1, delete_password: deletePassword})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "success");
            done();
          });
      });

      test("delete thread with bad password", function(done) {
        chai
          .request(server)
          .delete("/api/threads/" + messageBoard)
          .send({thread_id: threadId2, delete_password: wrongDeletePassword})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "incorrect password");
            done();
          });
      });
    });

    suite("PUT", function() {
      test("report thread", function(done) {
        chai
          .request(server)
          .put("/api/threads/" + messageBoard)
          .send({report_id: threadId2})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "reported");
            done();
          });
      });
    });
  });

  suite("API ROUTING FOR /api/replies/:board", function() {
    suite("POST", function() {
      test("create two replies to thread (because we end up deleting 1 in the delete test)", function(done) {
        chai
          .request(server)
          .post("/api/replies/" + messageBoard)
          .send({
            thread_id: threadId2,
            text: "a reply" + someText,
            delete_password: deletePassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
          });

        chai
          .request(server)
          .post("/api/replies/" + messageBoard)
          .send({
            thread_id: threadId2,
            text: "a reply" + someText,
            delete_password: deletePassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    suite("GET", function() {
      test("Get all replies for 1 thread", function(done) {
        chai
          .request(server)
          .get("/api/replies/" + messageBoard)
          .query({thread_id: threadId2})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "_id");
            assert.property(res.body, "created_on");
            assert.property(res.body, "bumped_on");
            assert.property(res.body, "text");
            assert.property(res.body, "replies");
            assert.notProperty(res.body, "delete_password");
            assert.notProperty(res.body, "reported");
            assert.isArray(res.body.replies);
            assert.property(res.body.replies[0], "_id");
            assert.notProperty(res.body.replies[0], "delete_password");
            assert.notProperty(res.body.replies[0], "reported");
            assert.equal(
              res.body.replies[res.body.replies.length - 1].text,
              "a reply" + someText
            );
            replyId1 = res.body.replies[0]._id;
            done();
          });
      });
    });

    suite("PUT", function() {
      test("report reply", function(done) {
        chai
          .request(server)
          .put("/api/replies/" + messageBoard)
          .send({thread_id: threadId2, reply_id: replyId1})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "reported");
            done();
          });
      });
    });

    suite("DELETE", function() {
      test("delete reply with bad password", function(done) {
        chai
          .request(server)
          .delete("/api/replies/" + messageBoard)
          .send({
            thread_id: threadId2,
            reply_id: replyId1,
            delete_password: wrongDeletePassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "incorrect password");
            done();
          });
      });

      test("delete reply with valid password", function(done) {
        chai
          .request(server)
          .delete("/api/replies/" + messageBoard)
          .send({
            thread_id: threadId2,
            reply_id: replyId1,
            delete_password: deletePassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "success");
            done();
          });
      });
    });
  });
});
