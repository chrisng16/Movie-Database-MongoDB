const Name = require("../models/Name");

const getAllNames = async (req, res) => {
    const names = await Name.find({}).limit(10);
    res.status(200).json(names);
};

const getNames = async (req, res) => {
    console.log(req.query);

    // Query Options can be passed into function
    const {
        primaryName
    } = req.query;

    // Base query (return db.collection.find() if no option passed)
    const queryObject = {};

    if (primaryName) {
        queryObject.primaryName = { $regex: primaryName, $options: "i" };
    }

    let result = Name.find(queryObject);
    result = result.sort("primaryName");

    const names = await result;
    res.status(200).json({names, nResults: names.length});
};

// TODO:
// Delete
// Insert 
// Update

module.exports = {
    getAllNames,
    getNames
};
