const LikeRepo = require("../repository/like.repository");
const { CustomErrorHandler } = require("../middleware/errorsMiddleware");
const { genericMongooseErrorFunction } = require("../utils/generalFunctions");

exports.toggleLike = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const response = await LikeRepo.toggleLike(req.body);
    res.status(201).json({
      success: true,
      response,
    });
  } catch (error) {
    genericMongooseErrorFunction(error, next);
  }
};

exports.getLikeDetails = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const response = await LikeRepo.getLike(req.params.id);
    if (!response) {
      throw new CustomErrorHandler(404, "Like Details not found");
    }
    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    next(error);
  }
};
