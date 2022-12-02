const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema(
  {
    nconst: {
        type: String,
        unique: true,
    },

    primaryName: {
        type: String,
        require: true,
    },

    birthYear: {
        type: Number
    },

    deathYear: {
        type: Number,
        default: "\\N"
    },

    primaryProfession: {
        type: String
    },

    knownForTitles: {
        type: String
    },
  },
  { collection: "names" }
);

const Name = new mongoose.model("Name Data", nameSchema);
module.exports = Name;
