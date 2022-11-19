const express = require("express");
const router = express.Router();

const { getAllTitles, getTitles } = require("../controller/titles");

router.route("/all").get(getAllTitles);
router.route("/").get(getTitles)

module.exports = router;
