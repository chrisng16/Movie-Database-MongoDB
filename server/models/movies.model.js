const mongoose = require("mongoose");
const requiredString = { type: String, require: true };

const titlesSchema = new mongoose.Schema(
  {
    tconst: requiredString,
    primaryTitle: requiredString,
    titleType: String,
    isAdult: Boolean,
    startYear: {
      type: Number,
      min: 1800,
      max: 2050,
      require: true,
    },
    runtimeMinutes: {
      type: Number,
      require: true,
    },
    genres: String,
  },
  { collection: "titles" }
);

const titlesModel = new mongoose.model("Title Data", titlesSchema)
module.exports = titlesModel