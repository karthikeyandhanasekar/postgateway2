const { mongoose } = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    like: {
      type: Boolean,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // reference to the User model
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // reference to the User model
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // reference to the User model
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
