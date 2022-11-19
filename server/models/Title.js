const mongoose = require("mongoose");
const requiredString = { type: String, require: true };

const titlesSchema = new mongoose.Schema(
  {
    tconst: requiredString,
    primaryTitle: requiredString,
    titleType: String,
    isAdult: {
      type: Number,
      enum: {
        values: [0,1],
      }
    },
    startYear: {
      type: Number,
      min: 1800,
      max: 2050,
      require: true,
    },
    runtimeMinutes: {
      type: Number,
      default: '\\N'
    },
    genres: {
      type:String,
      default: '\\N'
    }
  },
  { collection: "title" }
);

const Title = new mongoose.model("Title Data", titlesSchema)
module.exports = Title