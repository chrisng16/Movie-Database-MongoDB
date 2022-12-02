const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  reviewTitle: String,
  description: String,
  date: Date
});

const ratingsSchema = new mongoose.Schema({
  averageRating: Number,
  numVotes: Number
});

const movieCastSchema = new mongoose.Schema({
  tconst: String,
  ordering: Number,
  nconst: String,
  category: String,
  job: String,
  characters: String

});

const titlesSchema = new mongoose.Schema(
  {
    tconst: String,
    primaryTitle: {
      type: String,
      require: true,
    },
    titleType: String,
    isAdult: {
      type: Number,
      enum: {
        values: [0, 1],
      },
    },
    startYear: {
      type: Number,
      min: 1800,
      max: 2050,
      require: true,
    },
    runtimeMinutes: {
      type: Number,
      default: 0,
    },
    genres: {
      type: String,
      default: "\\N",
    },
    reviews: [reviewsSchema],
    ratings: ratingsSchema,
    cast: [movieCastSchema]
  },
  { collection: "movies" }
);

const Title = new mongoose.model("Title Data", titlesSchema);
const Review = new mongoose.model("Review Data", reviewsSchema);
const Rating = new mongoose.model("Rating Data", ratingsSchema);
const MovieCast = new mongoose.model("Movie Cast Data", movieCastSchema);
module.exports.Title = Title;
module.exports.Review = Review;
module.exports.Rating = Rating;
module.exports.MovieCast = MovieCast;