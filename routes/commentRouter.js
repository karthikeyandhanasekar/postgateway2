const express = require("express");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");
const router = express.Router();
const CommentController = require("../controllers/comments.controller");

router
  .route("/:postId")
  .get(authorizationMiddleware, CommentController.getAllComment);

router
  .route("/:postId")
  .post(authorizationMiddleware, CommentController.createComment);

router
  .route("/:commentId")
  .put(authorizationMiddleware, CommentController.updateComment);

router
  .route("/:commentId")
  .delete(authorizationMiddleware, CommentController.deleteComment);

module.exports = router;
