const UserRepo = require("../repository/user.repository");
const { generateToken } = require("../services/tokenService");
const { genericMongooseErrorFunction } = require("../utils/generalFunctions");

exports.registerUser = async (req, res, next) => {
  try {
    const savedUser = await UserRepo.createUser(req.body);
    return res.status(201).json(savedUser);
  } catch (error) {
    genericMongooseErrorFunction(error, next);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    // Capture device-related info (User-Agent, IP, Device ID, etc.)
    const deviceDetails = {
      userAgent: req.get("User-Agent"),
      ip: req.ip,
      deviceId: req.headers["device-id"] || "default-device-id", // Optionally pass a device ID
      datetime: new Date(),
    };

    const { _id, name, email } = await UserRepo.loginUser(req.body);
    const token = generateToken({ _id, name, email, deviceDetails });
    deviceDetails.token = token;
    const updatedDetails = await UserRepo.updateLoginDetails(
      _id,
      deviceDetails
    );
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    // Capture device-related info (User-Agent, IP, Device ID, etc.)
    const { _id } = req.user;

    await UserRepo.logOut(_id, req.body);
    return res.status(200).json({
      success: true,
      message: "LogOut Successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutAllDevices = async (req, res, next) => {
  try {
    // Capture device-related info (User-Agent, IP, Device ID, etc.)
    const { _id } = req.user;

    await UserRepo.logoutAllDevices(_id);
    return res.status(200).json({
      success: true,
      message: "LogOut from all Devices Successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getSpecificUserDetails = async (req, res, next) => {
  try {
    // Capture device-related info (User-Agent, IP, Device ID, etc.)
    const { userId } = req.params;

    const userDetails = await UserRepo.getSpecificUserDetails(userId);
    return res.status(200).json({
      success: true,
      userDetails,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserDetails = async (req, res, next) => {
  try {
    // Capture device-related info (User-Agent, IP, Device ID, etc.)

    const userDetails = await UserRepo.getUserDetails();
    return res.status(200).json({
      success: true,
      userDetails,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // Capture device-related info (User-Agent, IP, Device ID, etc.)
    const { userId } = req.params;
    const userDetails = await UserRepo.updateUsers(userId, req.body);
    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
