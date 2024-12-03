const { CustomErrorHandler } = require("../middleware/errorsMiddleware");
const { User } = require("../models/userSchema");
const { hashValue, compareHashValue } = require("../services/bcrypt");
exports.createUser = async (data) => {
  try {
    // Trigger Mongoose validation before saving
    const userInstance = new User(data);

    // Validate the data manually before hashing the password
    await userInstance.validate(); // This will trigger all validation checks

    data.password = await hashValue(data.password);
    return await new User(data).save();
  } catch (error) {
    throw error;
  }
};

exports.loginUser = async (data) => {
  try {
    const { email, password } = data;
    const userDetails = await User.findOne({ email });
    if (!userDetails?._id) {
      throw new CustomErrorHandler(400, `Account ${email} doesn't exists`);
    }
    const isPasswordValid = await compareHashValue(
      password,
      userDetails.password
    );
    if (!isPasswordValid) {
      throw new CustomErrorHandler(400, `Invalid Password`);
    }


    return userDetails;
  } catch (error) {
    throw error;
  }
};
