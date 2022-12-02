const express = require("express");
const router = express.Router();

const {getAllNames, getNames, getNameById, insertName, updateName, deleteName} = require("../controller/names");

router.route("/all").get(getAllNames);
router.route("/").get(getNames);
router.route("/:nconst").get(getNameById)
router.route("/insert").post(insertName);
router.route("/update").put(updateName);
router.route("/delete").delete(deleteName);

module.exports = router;
