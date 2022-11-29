const Title = require("../models/Title");

const getAllTitles = async (req, res) => {
  const titles = await Title.find({}).limit(10);
  res.status(200).json(titles);
};

const insertTitle = async (req, res) => {

  // temp = JSON.stringify(req.body)
  
  // const primaryTitle = String(req.body.primaryTitle)
  // const startYear = Number(req.body.startYear)
  console.log(typeof(String(req.body.primaryTitle)))

  const result = await Title.create(req.body)

  res.status(200).json({result, msg:'demo is inserted'})
}

const deleteTitle = async (req, res) => {
  const primaryTitle = req.body.primaryTitle
  const startYear = req.body.startYear

  const result = await Title.deleteOne({primaryTitle: {primaryTitle}})

  res.status(200).json(result, {msg:`${primaryTitle} is updated`})
}

const updateTitle = async (req, res) => {
  const primaryTitle = req.body.primaryTitle || 'demo'
  const startYear = req.body.startYear || 2022

  const result = await Title.updateOne({primaryTitle: {primaryTitle}}, {$set: { startYear: {startYear}}})

  res.status(200).json(result, {msg:`${primaryTitle} is updated`})
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
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if(options.includes(flield)) {
        queryObject[field] = {[operator]: Number(value)}
      }
    })
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
  res.status(200).json({ titles, nResults: titles.length});
};

module.exports = {
  getAllTitles,
  getTitles,
  insertTitle,
  updateTitle,
  deleteTitle
};
