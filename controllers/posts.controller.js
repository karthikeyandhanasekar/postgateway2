const PostRepo = require("../repository/post.repository");
const { CustomErrorHandler } = require("../middleware/errorsMiddleware");
exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await PostRepo.getPosts();
    if (posts.length === 0) {
      throw new CustomErrorHandler(404, "No Posts found");
    }
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSpecificPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const posts = await PostRepo.getSpecificPost(postId);
    if (posts.length === 0) {
      throw new CustomErrorHandler(404, "No Post found");
    }
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSpecificUserPost = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await PostRepo.getUserPosts(userId);
    if (posts.length === 0) {
      throw new CustomErrorHandler(404, "No Posts found");
    }
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    req.body.image = req.file.path;
    const post = await PostRepo.createPost(req.body);
    return res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    genericMongooseErrorFunction(error, next);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw new CustomErrorHandler(400, "Values are empty");
    }
    const posts = await PostRepo.updatePost(postId, req.body);
    if (!posts) {
      throw new CustomErrorHandler(404, "No Post found");
    }
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const posts = await PostRepo.deletePost(postId);
    if (!posts) {
      throw new CustomErrorHandler(404, "No Post found");
    }
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};
