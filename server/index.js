require("dotenv").config();
// async error

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const titlesRouter = require("./routes/titles");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const cors = require("cors");
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 1337;

//route
app.get("/", (req, res) => {
  res.send('<h1>imdb API</h1><a href="/api/titles">Get Titles</a>');
});


app.use("/api/titles", titlesRouter);


// movies routes
// app.use(errorHandlerMiddleware);
// app.use(notFoundMiddleware);

const User = require("./models/User");
const Title = require("./models/Title");



const start = async () => {
  try {
    console.log('Connecting to DB...')
    await connectDB(process.env.MONGO_URI);
    console.log('Successfully connected!')
    app.listen(port, console.log(`Backend server is start on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
