const express = require("express");
const router = express.Router();

const {getAllNames, getNames} = require("../controller/names");

router.route("/all").get(getAllNames);
router.route("/").get(getNames)

module.exports = router;
