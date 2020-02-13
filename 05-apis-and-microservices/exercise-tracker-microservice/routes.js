const express = require("express");
const routes = express.Router();

const {check, validationResult} = require("express-validator");

const ExerciseTrackerMicroservice = require(__dirname +
  "/exercise-tracker-microservice.js");

routes.use(express.static("public"));
routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

routes.post(
  "/api/exercise/new-user",
  [
    check("username").exists(),
    check("username").notEmpty(),
    check("username").isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const username = req.body.username;
    ExerciseTrackerMicroservice.addUser(username)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.send(error);
      });
  }
);

routes.get("/api/exercise/users", (req, res) => {
  ExerciseTrackerMicroservice.getUsers()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.send(error);
    });
});

routes.post(
  "/api/exercise/add",
  [
    check("username")
      .exists()
      .notEmpty()
      .isString(),
    check("description")
      .exists()
      .notEmpty()
      .isString(),
    check("duration")
      .exists()
      .notEmpty()
      .isNumeric(),
    check("_id")
      .exists()
      .notEmpty()
      .isString(),
    check("date").optional()
  ],
  (req, res) => {
    const userId = req.body.userId;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date;

    ExerciseTrackerMicroservice.addExerciseLog(
      userId,
      description,
      duration,
      date
    )
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.send(error);
      });
  }
);

/*
 * GET /api/exercise/log?{userId}[&from][&to][&limit]
 *
 * { } = required, [ ] = optional
 * from, to = dates (yyyy-mm-dd); limit = number
 */
routes.get("/api/exercise/log", (req, res) => {
  res.status(501).send();
});

module.exports = routes;
