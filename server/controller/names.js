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

const getNameById = async (req, res) => {
    console.log("nconst:req.params.nconst", req.params.nconst);
    const name = await Name.find({ nconst: req.params.nconst }).limit(1);
    console.log(name);
    res.status(200).json(name);
};

// TODO:
// Insert casts -- Tested
const insertName = async (req, res) => {
    console.log(req.body)
    const result = await Name.create(req.body)
    res.status(200).json({result, msg:'demo is inserted'})
};

// Update casts by const -- HAVENT TESTED
const updateName = async (req, res) => {
    const nconst = req.body.nconst
    const primaryName = req.body.primaryName

    const result = await Name.updateOne({nconst: {nconst}}, {$set: {primaryName: {primaryName}}})
  
    res.status(200).json(result, {msg:`${primaryTitle} is updated`})
};

// Delete casts by const -- HAVENT TESTED
const deleteName = async (req, res) => {
    const nconst = req.body.nconst
  
    const result = await Title.deleteOne({nconst: {nconst}});
    res.status(200).json(result, {msg:`${primaryName} is deleted`})
  }

// Build the UI for individual cast <-- TODO

module.exports = {
    getAllNames,
    getNames,
    getNameById,
    insertName,
    updateName,
    deleteName
};
