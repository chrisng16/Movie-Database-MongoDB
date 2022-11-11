//Importing and creating an instance of express
const express = require("express");
const app = express();
const cors = require("cors");

//Setting PORT to 5000 if PORT is not listed in environmental variables.
const PORT = process.env.PORT || 5000;

require("dotenv").config();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json())

const { MongoClient, ObjectId } = require("mongodb");
// Connection URI
const uri = "mongodb://mern:merndocker@project-mongo-1:27017/?maxPoolSize=20&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run(aCallback, value) {
  let toReturn="";
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    toReturn = await aCallback(client, value);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    return toReturn;
  }
}


const getTitles = async (client) => {
  const db = client.db('imdb');
  const items = await db.collection('basics').find({}).limit(10).toArray();
  return items;
}

const getReviews = async (client, value) => {
  const db = client.db('imdb');
  const items = await db.collection('reviews').find({"tconst": value}).toArray();
  return items;
}

const addReview = async (client, value) => {
  const db = client.db('imdb');
  const items = await db.collection('reviews').insertOne(value);
  return items;
}

const deleteReview = async (client, value) => {
  const db = client.db('imdb');
  const items = await db.collection('reviews').deleteOne({"_id": ObjectId(value)});
  return items;
}

const editReview = async (client, value) => {
  const db = client.db('imdb');
  let id = value._id;
  delete value._id;
  let items;
  try{
    items = await db.collection('reviews').replaceOne({"_id": ObjectId(id)}, value);
  } catch (ex) {
    console.log("There was an error", ex);
  }
  return items;
}

app.post("/reviews/add", async (req, res) => {
  let requestBody = req.body;
  let items = await run(addReview, requestBody);
  res.setHeader('Content-type', 'application/json')
  res.send(items);
});

app.post("/reviews/edit", async (req, res) => {
  console.log("editing!!!", req.body)
  let items = await run(editReview, req.body);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.send(items);
});

app.post("/reviews/delete/:id", async (req, res) => {
  let items = await run(deleteReview, req.params.id);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.send(items);
});

app.get("/reviews/:tconst", async (req, res) => {
  let items = await run(getReviews, req.params.tconst);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.send(items);
});

// Creating the `GET` route
app.get("/titles", async (req, res) => {
  let items = await run(getTitles);
  res.setHeader('Content-type', 'application/json')
  res.setHeader("Access-Control-Allow-Origin","*");
  res.send(items);
});

//Starting the express server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);