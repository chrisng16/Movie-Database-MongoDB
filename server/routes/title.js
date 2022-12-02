const express = require("express");
const titleRouter = express.Router();

const {
  getAllTitles,
  getTitles,
  insertTitle,
  updateTitle,
  deleteTitle,
} = require("../controller/title");

titleRouter.route("/all").get(getAllTitles);
titleRouter.route("/").get(getTitles);
titleRouter.route("/insert").post(insertTitle);
titleRouter.route("update").get(updateTitle);
titleRouter.route("delete").get(deleteTitle);

module.exports = titleRouter;
