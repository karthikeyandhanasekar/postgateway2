const { mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // reference to the User model
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // reference to the User model
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
