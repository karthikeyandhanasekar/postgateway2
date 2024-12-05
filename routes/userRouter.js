const express = require("express");
const router = express.Router();
const User = require("../controllers/user.controller");
const {
  loginValidation,
} = require("../middleware/requestValidationMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

router.post("/signup", User.registerUser);

router.route("/signin").post(loginValidation, User.loginUser);
router.route("/logout").post(authorizationMiddleware, User.logout);
router
  .route("/logout-all-devices")
  .post(authorizationMiddleware, User.logoutAllDevices);

router
  .route("/get-details/:userId")
  .get(authorizationMiddleware, User.getSpecificUserDetails);

router
  .route("/get-all-details")
  .get(authorizationMiddleware, User.getUserDetails);

router
  .route("/update-details/:userId")
  .put(authorizationMiddleware, User.updateUser);

module.exports = router;
