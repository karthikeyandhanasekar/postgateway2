const { createUser, loginUser } = require("../repository/user.repository");
const { generateToken } = require("../services/tokenService");
const { genericMongooseErrorFunction } = require("../utils/generalFunctions");

exports.registerUser = async (req, res, next) => {
  try {
    const savedUser = await createUser(req.body);
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
    };

    const { _id, name, email } = await loginUser(req.body);
    const token = generateToken({ _id, name, email, deviceDetails });
    // TODO : Change schema and add token in mongoose
    return res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
