const express = require("express");
const router = express.Router();

const { getAllTitles, getTitles } = require("../controller/titles");

router.route("/").get(getAllTitles);
router.route("/search").get(getTitles)

module.exports = router;
