const Post = require("../models/postSchema");

exports.createPost = async (data) => {
  try {
    const post = await new Post(data).save();
    return post;
  } catch (error) {
    throw error;
  }
};

exports.updatePost = async (_id, data) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id },
      { ...data },
      { new: true }
    );
    return post;
  } catch (error) {
    throw error;
  }
};

exports.getPosts = async () => {
  try {
    const posts = await Post.find().select({
      _id: 1,
      title: 1,
      description: 1,
      image: 1,
      userId: 1,
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

exports.getSpecificPost = async (_id) => {
  try {
    const posts = await Post.find({ _id }).select({
      _id: 1,
      title: 1,
      description: 1,
      image: 1,
      userId: 1,
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

exports.getUserPosts = async (userId) => {
  try {
    const posts = await Post.find({ userId }).select({
      _id: 1,
      title: 1,
      description: 1,
      image: 1,
      userId: 1,
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

exports.deletePost = async (_id) => {
  try {
    const posts = await Post.findOneAndDelete({ _id });
    return posts;
  } catch (error) {
    throw error;
  }
};
