const User = require("../models/User");

const getUserByEmail = async (req, res) => {
  const result = await User.find(req.query);
  res.status(200).json({ isTaken: result.length });
};

const insertUser = async (req, res) => {
  const result = await User.create(req.body);
  console.log(result);
  res.status(200).json({ result, msg: "User Created" });
};

const getOneUser = async (req, res) => {
  const user = await User.findOne(req.body);
  if(user)
    res.status(200).json({user, success: 1 });
};
module.exports = { insertUser, getUserByEmail, getOneUser };
