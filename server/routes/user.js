const express = require("express");
const userRouter = express.Router();

const { insertUser, getUserByEmail, getOneUser, updateUser } = require("../controller/user");

userRouter.route("/register").post(insertUser);
userRouter.route("/email-check").get(getUserByEmail)
userRouter.route("/login").get(getOneUser)
userRouter.route("/update").post(updateUser)

module.exports = userRouter;