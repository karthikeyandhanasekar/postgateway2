const FriendShipRepo = require("../repository/friendship.repository");
const { CustomErrorHandler } = require("../middleware/errorsMiddleware");
const { genericMongooseErrorFunction } = require("../utils/generalFunctions");

exports.createFriendRequest = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    req.body.status = "Pending";
    const response = await FriendShipRepo.createFriendRequest(req.body);
    res.status(201).json({
      success: true,
      response,
    });
  } catch (error) {
    genericMongooseErrorFunction(error, next);
  }
};

exports.getFriendList = async (req, res, next) => {
  try {
    const response = await FriendShipRepo.getFriendList(req.params.userId);

    if (response.length === 0) {
      throw new CustomErrorHandler(404, "No Friends");
    }
    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPendingRequest = async (req, res, next) => {
  try {
    const response = await FriendShipRepo.getFriendByStatus(
      req.user._id,
      "Pending"
    );

    if (response.length === 0) {
      throw new CustomErrorHandler(404, "No Pending Request.");
    }
    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};

exports.responsePendingRequest = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    const response = await FriendShipRepo.friendShipResponse(
      friendId,
      req.body
    );

    if (response.length === 0) {
      throw new CustomErrorHandler(404, "Request doesn't found.");
    }
    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};
