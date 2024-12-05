const { default: mongoose } = require("mongoose");

const friendshipSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
    },
  },
  { timestamp: true }
);

const FriendShip = mongoose.model("friendship", friendshipSchema);

module.exports = FriendShip;
