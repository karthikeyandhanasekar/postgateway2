const express = require("express");
const router = express.Router();
const Post = require("../controllers/posts.controller");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");
const validationMiddleware = require("../middleware/requestValidationMiddleware");
const upload = require("../services/storage");

router.route("/all").get(authorizationMiddleware, Post.getAllPost);

router.route("/:postId").get(authorizationMiddleware, Post.getSpecificPost);

router
  .route("/user/:userId")
  .get(authorizationMiddleware, Post.getSpecificUserPost);

router
  .route("/")
  .post(
    authorizationMiddleware,
    upload.single("image"),
    validationMiddleware.createPostValidation,
    Post.createPost
  );

router
  .route("/:postId")
  .put(authorizationMiddleware, upload.single("image"), Post.updatePost);
router.route("/:postId").delete(authorizationMiddleware, Post.deletePost);

module.exports = router;
