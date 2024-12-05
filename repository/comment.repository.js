const Comment = require("../models/commentSchema");

exports.createComment = async (data) => {
  try {
    const comment = await new Comment(data).save();
    return comment;
  } catch (error) {
    throw error;
  }
};

exports.updateComment = async (_id, data) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id },
      { ...data },
      { new: true }
    );
    return comment;
  } catch (error) {
    throw error;
  }
};

exports.getComments = async () => {
  try {
    const comments = await Comment.find().populate("userId", "name").select({
      _id: 1,
      text: 1,
      name: 1,
      postId: 1,
      userId: 1,
    });
    return comments;
  } catch (error) {
    throw error;
  }
};

exports.getSpecificComments = async (_id) => {
  try {
    const comments = await Comment.findOne({ _id }).select({
      _id: 0,
      postId: 1,
      userId: 1,
    });
    return comments;
  } catch (error) {
    throw error;
  }
};
exports.deleteComment = async (_id) => {
  try {
    const comments = await Comment.findOneAndDelete({ _id });
    return comments;
  } catch (error) {
    throw error;
  }
};
