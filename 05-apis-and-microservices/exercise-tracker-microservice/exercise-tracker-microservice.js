const ExerciseTrackerDataSource = require(__dirname +
  "/exercise-tracker-datasource.js");

const addUser = username => {
  return new Promise((resolve, reject) => {
    ExerciseTrackerDataSource.addUser(username)
      .then(userData => {
        resolve(userData);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    ExerciseTrackerDataSource.getUsers()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addExerciseLog = (userId, description, duration, date) => {
  return new Promise((resolve, reject) => {
    let result = {
      _id: null,
      username: null,
      description: null,
      duration: null,
      date: null
    };
    ExerciseTrackerDataSource.getUser(userId)
      .then(user => {
        result._id = user._id;
        result.username = user.username;
        return ExerciseTrackerDataSource.addExerciseLog(
          userId,
          description,
          duration,
          date
        );
      })
      .then(userExerciseLog => {
        const currentExerciseLog =
          userExerciseLog.log[userExerciseLog.log.length - 1];
        result.description = currentExerciseLog.description;
        result.duration = currentExerciseLog.duration;
        result.date = currentExerciseLog.date;
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getExerciseLog = (userId, from = null, to = null, limit = null) => {
  return new Promise((resolve, reject) => {
    ExerciseTrackerDataSource.getExerciseLog(userId, from, to, limit)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  addUser: addUser,
  getUsers: getUsers,
  addExerciseLog: addExerciseLog,
  getExerciseLog: getExerciseLog
};
