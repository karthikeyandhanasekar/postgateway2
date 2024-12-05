const Like = require("../models/likeSchema");

exports.toggleLike = async (data) => {
  try {
    if (data.like) {
      // Attempt to find and update the document based on postId or commentId
      return await Like.findOneAndUpdate(
        {
          $or: [
            { postId: data.postId }, // Match by postId
            { commentId: data.commentId }, // Match by commentId
          ],
        },
        {
          $set: { ...data }, // Fields to update
        },
        {
          new: true, // Return the modified document
          upsert: true, // Create a new document if no match is found
          runValidators: true, // Ensure validation runs on update
        }
      );
    }
    return await Like.findOneAndDelete({
      $or: [
        { postId: data.postId }, // Match by postId
        { commentId: data.commentId }, // Match by commentId
      ],
    });
  } catch (error) {
    throw error;
  }
};

exports.getLike = async (_id) => {
  try {
    const likeDetails = await Like.findById(_id)
      .populate("userId", {
        name: 1,
        email: 1,
        phoneNumber: 1,
      })
      .populate("postId", { title: 1 })
      .populate("commentId", { text: 1 });
    return likeDetails;
  } catch (error) {
    throw error;
  }
};
