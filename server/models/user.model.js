const mongoose = require("mongoose");
const requiredString = { type: String, required: true };

const userSchema = new mongoose.Schema(
  {
    name: requiredString,
    email: { type: String, required: true, unique: true },
    password: requiredString,
  },
  { collection: "users" }
);

const userModel = mongoose.model("UserData", userSchema);

module.exports = userModel;
