const mongoose = require("mongoose");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePassword = function (value) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(value);
};

userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          const onlyAlphabets = /[A-Za-z]+$/;
          return !value || !value.trim().length || onlyAlphabets.test(value);
        },
        message: "Name accept only alphabets",
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["M", "F", "T"],
    },
    password: {
      type: String,
      required: true,
      // validate: [
      //   validatePassword,
      //   "Your password must be at least 8 characters long, containing a mix of uppercase and lowercase letters, at least one digit, and one special character (e.g., !@#$%^&*)",
      // ],
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Your password must be at least 8 characters long, containing a mix of uppercase and lowercase letters, at least one digit, and one special character (e.g., !@#$%^&*)",
      // ],
    },
    loginAt: {
      type: Date,
      default: Date.now,
    },
    loginDevices: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);
exports.User = mongoose.model("Users", userSchema);
