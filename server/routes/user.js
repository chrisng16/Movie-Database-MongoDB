const express = require("express");
const userRouter = express.Router();

const { insertUser, getUserByEmail } = require("../controller/user");

userRouter.route("/register").post(insertUser);
userRouter.route("/email-check").get(getUserByEmail)

module.exports = userRouter;