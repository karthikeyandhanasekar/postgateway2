const CommentRepo = require("../repository/comment.repository");
const { CustomErrorHandler } = require("../middleware/errorsMiddleware");
const { genericMongooseErrorFunction } = require("../utils/generalFunctions");
const PostRepo = require("../repository/post.repository");
exports.getAllComment = async (req, res, next) => {
  try {
    const comments = await CommentRepo.getComments();
    if (comments.length === 0) {
      throw new CustomErrorHandler(404, "No Comments found");
    }
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    req.body.postId = req.params.postId;
    const post = await CommentRepo.createComment(req.body);
    return res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    genericMongooseErrorFunction(error, next);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    if (Object.keys(req.body).length === 0) {
      throw new CustomErrorHandler(400, "Values are empty");
    }

    const comment = await CommentRepo.getSpecificComments(commentId);
    if (!comment) {
      throw new CustomErrorHandler(404, "Comment not found");
    }
    if (userId !== comment.userId.toString()) {
      throw new CustomErrorHandler(404, "You are not owner of this comment");
    }

    const postDetails = await PostRepo.getUserPosts(comment.userId);
    if (postDetails.length === 0) {
      throw new CustomErrorHandler(404, "You are not owner of this post");
    }
    const updateComment = await CommentRepo.updateComment(commentId, req.body);

    return res.status(200).json({
      success: true,
      updateComment,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await CommentRepo.getSpecificComments(commentId);
    if (!comment) {
      throw new CustomErrorHandler(404, "Comment not found");
    }
    if (userId !== comment.userId.toString()) {
      throw new CustomErrorHandler(404, "You are not owner of this comment");
    }

    const postDetails = await PostRepo.getUserPosts(comment.userId);
    if (postDetails.length === 0) {
      throw new CustomErrorHandler(404, "You are not owner of this post");
    }
    const updateComment = await CommentRepo.deleteComment(commentId, req.body);

    return res.status(200).json({
      success: true,
      updateComment,
    });
  } catch (error) {
    next(error);
  }
};
