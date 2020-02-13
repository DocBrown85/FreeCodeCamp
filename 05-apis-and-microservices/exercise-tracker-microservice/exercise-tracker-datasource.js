const dotenv = require("dotenv");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const _ = require("lodash");

const ExerciseLogSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    log: [
      {
        description: {
          type: String,
          required: true
        },
        duration: {
          type: Number,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);
const ExerciseLog = mongoose.model("ExerciseLog", ExerciseLogSchema);

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const User = mongoose.model("User", UserSchema);

dotenv.config();

mongoose.connect(
  process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  function(err) {
    if (err) {
      console.log("MongoDB connection error: " + err);
      process.exit(1);
    }
  }
);

const addUser = username => {
  return new Promise((resolve, reject) => {
    const user = new User({
      username: username
    });

    user.save((err, data) => {
      if (err) {
        reject({error: err});
        return;
      }
      resolve(data);
    });
  });
};

const addUserIfNotExists = username => {
  return new Promise((resolve, reject) => {
    let newUser = null;
    usernameAvailable(username)
      .then(username => {
        return addUser(username);
      })
      .then(user => {
        newUser = user;
        return initializeExerciseLog(user._id);
      })
      .then(newUserExerciseLog => {
        resolve(newUser);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const usernameAvailable = username => {
  return new Promise((resolve, reject) => {
    User.find({username: username}, (err, data) => {
      if (err) {
        reject({error: err});
        return;
      }
      if (data.length != 0) {
        reject({error: "username already exists"});
        return;
      }
      resolve(username);
    });
  });
};

const getUser = userId => {
  return new Promise((resolve, reject) => {
    User.findById(userId, (err, user) => {
      if (err) {
        reject({error: "unknown user"});
        return;
      }
      if (user == null) {
        reject({error: "unknown user"});
        return;
      }
      resolve(user);
    });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, data) => {
      if (err) {
        reject({error: err});
        return;
      }
      resolve(data);
    });
  });
};

const initializeExerciseLog = userId => {
  return new Promise((resolve, reject) => {
    const exerciseLog = new ExerciseLog({
      userId: userId,
      log: []
    });

    exerciseLog.save((err, data) => {
      if (err) {
        reject({error: err});
        return;
      }
      resolve(data);
    });
  });
};

const addExerciseLog = (userId, description, duration, date) => {
  return new Promise((resolve, reject) => {
    ExerciseLog.findOneAndUpdate(
      {userId: userId},
      {
        $push: {
          log: {
            description: description,
            duration: duration,
            date: date
          }
        }
      },
      {
        new: true
      },
      (err, data) => {
        if (err) {
          reject({error: err});
          return;
        }
        resolve(data);
      }
    );
  });
};

const getExerciseLog = userId => {
  return new Promise((resolve, reject) => {
    ExerciseLog.find({userId: userId}, (err, data) => {
      if (err) {
        reject({error: err});
        return;
      }
      resolve(data);
    });
  });
};

module.exports = {
  addUser: addUserIfNotExists,
  getUser: getUser,
  getUsers: getUsers,
  addExerciseLog: addExerciseLog,
  getExerciseLog: getExerciseLog
};
