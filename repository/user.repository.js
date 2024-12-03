const { User } = require("../models/userSchema");

exports.createUser = async (data) => {
  try {
    return await new User(data).save();
  } catch (error) {
    throw error;
  }
};
