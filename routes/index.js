const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");
const friendShipRouter = require("./friendshipRoute");

/* GET home page. */
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/friends", friendShipRouter);

module.exports = router;
