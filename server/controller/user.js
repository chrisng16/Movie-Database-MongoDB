const User = require("../models/User");

const getUserByEmail = async (req, res) => {
  const result = await User.find(req.query);

  res.status(200).json({ isTaken: result.length});
};

const insertUser = async (req, res) => {
  const result = await User.create(req.body);
  console.log(result);
  res.status(200).json({ result, msg: "demo is inserted" });
};

module.exports = { insertUser, getUserByEmail };
