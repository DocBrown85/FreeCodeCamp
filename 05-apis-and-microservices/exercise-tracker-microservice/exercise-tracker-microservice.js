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

module.exports = {
  addUser: addUser
};
