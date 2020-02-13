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
    ExerciseTrackerDataSource.getUser(userId)
      .then(user => {
        return ExerciseTrackerDataSource.addExerciseLog(
          userId,
          description,
          duration,
          date
        );
      })
      .then(userExerciseLog => {
        resolve(userExerciseLog);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getExerciseLog = userId => {
  return new Promise((resolve, reject) => {
    ExerciseTrackerDataSource.getExerciseLog(userId)
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
