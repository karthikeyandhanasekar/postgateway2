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

exports.updateLoginDetails = async (_id, deviceDetails) => {
  try {
    await User.updateOne(
      { _id },
      { $push: { loginDevices: deviceDetails }, loginAt: Date.now() }
    );
    return true;
  } catch (error) {
    throw error;
  }
};

exports.logOut = async (_id, token) => {
  try {
    // Remove the login device based on the provided token
    const user = await User.findById(_id);
    if (!user) {
      throw new CustomErrorHandler(404, "User Not found");
    }

    const deviceIndex = user.loginDevices.findIndex(
      (device) => device.token === token
    );
    if (deviceIndex === -1) {
      throw new CustomErrorHandler(404, "Device not found");
    }

    // Remove the login device from the array
    user.loginDevices.splice(deviceIndex, 1);
    user.updatedAt = new Date(); // Update the 'updatedAt' field

    await user.save();
  } catch (error) {
    throw error;
  }
};

exports.logoutAllDevices = async (_id) => {
  try {
    // Remove the login device based on the provided token
    const user = await User.findById(_id);
    if (!user) {
      throw new CustomErrorHandler(404, "User Not found");
    }
    // Remove the login device from the array
    user.loginDevices = [];
    user.updatedAt = new Date(); // Update the 'updatedAt' field
    await user.save();
  } catch (error) {
    throw error;
  }
};

exports.getSpecificUserDetails = async (_id) => {
  try {
    // Remove the login device based on the provided token
    const user = await User.findById(_id).select({
      _id: 1,
      name: 1,
      email: 1,
      gender: 1,
    });
    if (!user) {
      throw new CustomErrorHandler(404, "User Not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUserDetails = async (_id) => {
  try {
    // Remove the login device based on the provided token
    const user = await User.find().select({
      _id: 1,
      name: 1,
      email: 1,
      gender: 1,
    });
    if (!user) {
      throw new CustomErrorHandler(404, "User Not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
exports.updateUsers = async (_id, data) => {
  try {
    const { name, phoneNumber, gender } = data;
    // Remove the login device based on the provided token
    const user = await User.findOneAndUpdate(
      { _id },
      { name, phoneNumber, gender },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};
