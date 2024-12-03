const express = require("express");
const router = express.Router();
const User = require("../controllers/user.controller");

router.post("/signup", User.registerUser);
module.exports = router;
