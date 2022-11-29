const mongoose = require("mongoose");

const titlesSchema = new mongoose.Schema(
  {
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
  },
  { collection: "movies" }
);

const Title = new mongoose.model("Title Data", titlesSchema);
module.exports = Title;
