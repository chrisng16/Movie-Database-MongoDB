const express = require("express");
const router = express.Router();

const { getAllTitles, getTitles, insertTitle, updateTitle, deleteTitle, getTitleById, insertReview, updateReview, deleteReview, addRating, getSimilarMovies } = require("../controller/titles");

router.route("/all").get(getAllTitles);
router.route("/").get(getTitles)
router.route("/insert").post(insertTitle)
router.route("update").get(updateTitle)
router.route("delete").get(deleteTitle)
router.route("/:tconst").get(getTitleById)
router.route("/:tconst/reviews/insert").post(insertReview)
router.route("/:tconst/reviews/edit").post(updateReview)
router.route("/:tconst/reviews/delete").post(deleteReview)
router.route("/:tconst/addrating").post(addRating)
router.route("/:tconst/similarmovies").get(getSimilarMovies)

module.exports = router;
