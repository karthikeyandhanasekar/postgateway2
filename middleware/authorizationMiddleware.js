const { User } = require("../models/userSchema");
const { validateToken } = require("../services/tokenService");
const { CustomErrorHandler } = require("./errorsMiddleware");

const authorizationMiddleware = async (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomErrorHandler(401, `No Token provided`);
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify the token
    const decoded = validateToken(token);
    // Attach user information to the request object for further use
    req.user = decoded;

    const user = await User.findById(decoded._id);
    if (!user) {
      throw new CustomErrorHandler(404, "User Not found");
    }

    const deviceIndex = user.loginDevices.findIndex(
      (device) => device.token === token
    );
    if (deviceIndex === -1) {
      throw new CustomErrorHandler(404, "Token Expired /Invalid");
    }
    next();
  } catch (error) {
    next(new CustomErrorHandler(401, "Token Expired/ Invalid"));
  }
};

module.exports = authorizationMiddleware;
