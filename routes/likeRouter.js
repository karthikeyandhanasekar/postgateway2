const express = require("express");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");
const router = express.Router();
const LikeController = require("../controllers/like.controller");
const validationMiddleware = require("../middleware/requestValidationMiddleware");
router
  .route("/toggle/:id")
  .post(
    authorizationMiddleware,
    validationMiddleware.toggleLikeValidation,
    LikeController.toggleLike
  );

router
  .route("/:id")
  .get(authorizationMiddleware, LikeController.getLikeDetails);
module.exports = router;
