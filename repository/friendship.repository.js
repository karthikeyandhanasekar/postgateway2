const FriendShip = require("../models/friendshipSchema");

exports.createFriendRequest = async (data) => {
  try {
    const friends = await new FriendShip(data).save();
    return friends;
  } catch (error) {
    throw error;
  }
};

exports.getFriendList = async (userId) => {
  try {
    const friends = await FriendShip.find({ userId }).populate("friendId", {
      name: 1,
      email: 1,
      phoneNumber: 1,
    });
    return friends;
  } catch (error) {
    throw error;
  }
};

exports.getFriendByStatus = async (userId, status) => {
  try {
    const friends = await FriendShip.find({ userId, status }).populate(
      "userId",
      {
        name: 1,
        email: 1,
        phoneNumber: 1,
      }
    );
    return friends;
  } catch (error) {
    throw error;
  }
};

exports.friendShipResponse = async (_id, data) => {
  try {
    const friends = await FriendShip.findOneAndUpdate(
      { _id },
      { ...data },
      { new: true }
    );
    return friends;
  } catch (error) {
    throw error;
  }
};
