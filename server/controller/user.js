const User = require("../models/User");

const getUserByEmail = async (req, res) => {
  const result = await User.find(req.query);
  res.status(200).json({ isTaken: result.length });
};

const insertUser = async (req, res) => {
  const result = await User.create(req.body);
  console.log(result);
  res.status(200).json({ result, success:1});
};

const updateUser = async (req, res) => {
  const { email, newFname, newLname, newPassword } = req.body;
  const updateQuery = {};

  console.log(`${email} ${newFname} ${newLname} ${newPassword}`);

  if (newFname) updateQuery.fname = newFname;
  if (newLname) updateQuery.lname = newLname;
  if (newPassword) updateQuery.password = newPassword;

  const user = await User.findOneAndUpdate({ email: email }, updateQuery);
  res.status(200).json({ user, success: (user != null) });
};

const getOneUser = async (req, res) => {
  console.log(req.query);
  if (req.query.length === 0) {
    res.status(200).json({ success: 0 });
    return;
  }

  const user = await User.findOne(req.query);
  console.log(user);
  if (user) {
    res.status(200).json({ user, success: 1 });
  } else {
    res.status(200).json({ success: 0 });
  }
};
module.exports = { insertUser, getUserByEmail, getOneUser, updateUser };
