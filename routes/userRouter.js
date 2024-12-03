const express = require("express");
const router = express.Router();
const User = require("../controllers/user.controller");
const {
  loginValidation,
} = require("../middleware/requestValidationMiddleware");

router.post("/signup", User.registerUser);

router.route("/signin").post(loginValidation, User.loginUser);
module.exports = router;
