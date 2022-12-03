const express = require("express");
const userRouter = express.Router();

const { insertUser, getUserByEmail, getOneUser } = require("../controller/user");

userRouter.route("/register").post(insertUser);
userRouter.route("/email-check").get(getUserByEmail)
userRouter.route("/login").get(getOneUser)

module.exports = userRouter;