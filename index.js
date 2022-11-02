//Importing and creating an instance of express
const express = require("express");
const app = express();

//Setting PORT to 5000 if PORT is not listed in environmental variables.
const PORT = process.env.PORT || 5000;

const { MongoClient } = require("mongodb");
// Connection URI
const uri =
  "mongodb://mern:merndocker@project-mongo-1:27017/?maxPoolSize=20&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    const db = client.db('imdb');
    // execute find query
    let items = await db.collection('basics').find({}).limit(10).toArray();
    //console.log(items);
    return items;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// Creating the `GET` route
app.get("/", async (req, res) => {
  let items = await run();
  res.setHeader("Access-Control-Allow-Origin","*");
  res.send(items);
});

//Starting the express server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);