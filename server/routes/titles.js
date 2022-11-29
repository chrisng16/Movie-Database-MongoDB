const express = require("express");
const router = express.Router();

const { getAllTitles, getTitles, insertTitle, updateTitle, deleteTitle } = require("../controller/titles");

router.route("/all").get(getAllTitles);
router.route("/").get(getTitles)
router.route("/insert").post(insertTitle)
router.route("update").get(updateTitle)
router.route("delete").get(deleteTitle)

module.exports = router;
