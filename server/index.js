const express = require("express");
const app = express();
const cors = require("cors");
const port = 1337;
const mongoose = require("mongoose");
const userModel = require("./models/user.model");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://admin:password@52.12.136.42:27017/imdb");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/login", async (req, res) => {
  const user = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok" });
  } else {
    return res.json({ status: "error" });
  }
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", code: error });
  }
});

app.listen(port, () => {
  console.log(`Server is start on port ${port}`);
});
