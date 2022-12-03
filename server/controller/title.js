const { Title, Review } = require("../models/Title");

const getAllTitles = async (req, res) => {
  const titles = await Title.find({}).limit(10);
  res.status(200).json(titles);
};

const insertTitle = async (req, res) => {
  console.log(req.body)

  const result = await Title.create(req.body)

  res.status(200).json({ result, msg: req.body.primaryTitle + ' is inserted' })
}

const getSimilarMovies = async (req, res) => {
  const tconst = req.params.tconst;
  const curTitle = (await Title.find({ "tconst": tconst }).limit(1))[0];
  const decadeStart = curTitle.startYear - (curTitle.startYear % 10);
  const decadeEnd = curTitle.startYear + (10 - (curTitle.startYear % 10));
  const genres = curTitle.genres.split(",");
  const titles = await Title.aggregate(
    [
      // Match the possible documents to reduce the working set
      {
        "$match": {
          "tconst": { "$ne": tconst },
          "startYear": { $gte: decadeStart, $lte: decadeEnd }
        }
      },

      // Project a copy of the document if you want to keep more than `_id`
      {
        "$project": {
          "_id": {
            "_id": "$_id",
            "genres": "$genres",
            "startYear": "$startYear",
            "primaryTitle": "$primaryTitle",
            "titleType": "$titleType",
            "tconst": "$tconst"
          },
          "genres": { $split: ["$genres", ","] },
        }
      },

      // Match the possible documents to reduce the working set
      {
        "$match": {
          "genres": { $in: genres }
        }
      },
      { $limit: 100 },

      // Find the "set intersection" of the two arrays
      {
        "$project": {
          "genres": {
            "$size": {
              "$setIntersection": [
                genres,
                "$genres"
              ]
            }
          }
        }
      },

      // Filter the results to those that actually match
      { "$match": { "genres": { "$gte": 2 } } },
      { $limit: 10 }

    ]
  );
  res.status(200).json(titles);
};

const insertReview = async (req, res) => {
  const result = await Title.updateMany(
    { "tconst": req.params.tconst },
    {
      $push: {
        reviews: {
          reviewTitle: req.body.reviewTitle,
          description: req.body.description,
          date: new Date()
        }
      }
    }).then(function (post) {
      res.json({ success: true });
    });
}

const addRating = async (req, res) => {
  console.log(req.body);
  let rating = req.body.rating;
  let avg = ((rating.averageRating * rating.numVotes) + parseInt(req.body.userRating)) / (rating.numVotes + 1);
  console.log("avg", avg);
  const result = await Title.updateMany(
    { "tconst": req.body.tconst },
    { $set: { "ratings.numVotes": (rating.numVotes + 1), "ratings.averageRating": avg } }
  ).then(function (post) {
    res.json({ success: true });
  });
}

const updateReview = async (req, res) => {
  await Title.updateMany(
    { "tconst": req.params.tconst, "reviews._id": req.body._id },
    {
      "$set": {
        "reviews.$.reviewTitle": req.body.reviewTitle,
        "reviews.$.description": req.body.description,
        "reviews.$.date": new Date()

      }
    }
  ).then(function (rev) {
    res.json({ success: true });
  });
}

const deleteReview = async (req, res) => {
  await Title.updateMany({ tconst: req.params.tconst }, {
    '$pull': {
      'reviews': { '_id': req.body._id }
    }
  }).then(function (rev) {
    res.json({ success: true });
  });
}

const deleteTitle = async (req, res) => {
  const tconst = req.body.tconst;
  const primaryTitle = req.body.primaryTitle;
  console.log("Deleting this tconst: " + tconst + " pTitle: " + primaryTitle);
  
  const result = await Title.deleteOne({ tconst: tconst, primaryTitle: primaryTitle});
  res.status(200).json({ msg: `Acknowledged: ${result.acknowledged}, deletedCount: ${result.deletedCount}`})
}

const updateTitle = async (req, res) => {
  const primaryTitle = req.body.primaryTitle || "demo";
  const startYear = req.body.startYear || 2022;

  const result = await Title.updateOne({ primaryTitle: { primaryTitle } }, { $set: { startYear: { startYear } } })

  res.status(200).json(result, { msg: `${primaryTitle} is updated` })
}

const getTitleById = async (req, res) => {
  console.log("tconst:req.params.tconst", req.params.tconst);
  const curTitle = await Title.aggregate([
    {
      $match: {
        tconst: req.params.tconst
      }
    },
    {
      $lookup: {
        from: "names",
        localField: "cast.nconst",
        foreignField: "nconst",
        as: "castDetails"
      }
    },
  ])
  console.log(curTitle);
  res.status(200).json(curTitle);
}

const getTitles = async (req, res) => {
  console.log(req.query);
  // Query Options can be passed into function
  const {
    primaryTitle,
    startYear,
    isAdult,
    genres,
    sort,
    numericFilter,
  } = req.query;

  // Base query (return db.collection.find() if no option passed)
  const queryObject = {};

  // Types of query
  if (primaryTitle) {
    queryObject.primaryTitle = { $regex: primaryTitle, $options: "i" };
    // queryObject.primaryTitle = primaryTitle;
  }
  if (startYear) {
    queryObject.startYear = startYear;
  }
  if (isAdult) {
    queryObject.isAdult = isAdult;
  }
  if (genres) {
    queryObject.genres = { $regex: genres, $options: "i" };
  }

  // Mongoose numericFilter
  if (numericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const operatorRegex = /\b(>|>=|<|<=|=)\b/g;
    let filters = numericFilter.replace(
      operatorRegex,
      (operator) => `-${operatorMap[operator]}-`
    );

    const options = ["startYear", "runtimeMinutes"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(flield)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Title.find(queryObject);

  // Mongoose sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("primaryTitle");
  }

  // Page, Limit result on each page
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  // result = result.skip(skip).limit(limit);

  const titles = await result;
  res.status(200).json({ titles, nResults: titles.length });
};

module.exports = {
  getAllTitles,
  getTitles,
  insertTitle,
  updateTitle,
  deleteTitle,
  getTitleById,
  insertReview,
  updateReview,
  deleteReview,
  addRating,
  getSimilarMovies
};
