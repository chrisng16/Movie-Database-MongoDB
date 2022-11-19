const Title = require("../models/Title");

const getAllTitles = async (req, res) => {
  const titles = await Title.find({}).limit(10);
  res.status(200).json(titles);
};

const getTitles = async (req, res) => {
  console.log(req.query);
  const { primaryTitle, startYear, isAdult, titleType ,sort} = req.query;
  const queryObject = {};

  if (primaryTitle) {
    queryObject.primaryTitle = { $regex: primaryTitle, $options: "i" };
  }
  if (startYear) {
    queryObject.startYear = startYear;
  }
  if (isAdult) {
    queryObject.isAdult = isAdult;
  }
  if (titleType) {
    queryObject.titleType = { $regex: titleType, $options: "i" };
  }

  // console.log(queryObject)
  let beforeSort = Title.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    beforeSort = beforeSort.sort(sortList);
  } else {
    beforeSort = beforeSort.sort('primaryTitle')
  }

  const titles = await beforeSort
  res.status(200).json({ titles, nResults: titles.length });
};
module.exports = {
  getAllTitles,
  getTitles,
};
