const express = require("express");
const router = express.Router();
const FriendShip = require("../controllers/friendship.controller");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");
const validationMiddleware = require("../middleware/requestValidationMiddleware");

router
  .route("/create-friends")
  .post(
    authorizationMiddleware,
    validationMiddleware.createFriendValidation,
    FriendShip.createFriendRequest
  );

router
  .route("/get-friends/:userId")
  .get(authorizationMiddleware, FriendShip.getFriendList);
router
  .route("/get-pending-requests")
  .get(authorizationMiddleware, FriendShip.getPendingRequest);

router
  .route("/response-to-request/:friendId")
  .post(
    authorizationMiddleware,
    validationMiddleware.responseFriendValidation,
    FriendShip.responsePendingRequest
  );

module.exports = router;
