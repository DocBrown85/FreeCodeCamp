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
    useUnifiedTopology: true
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

module.exports = {
  addUser: addUser,
  getUsers: getUsers
};
