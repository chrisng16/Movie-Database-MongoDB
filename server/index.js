require("dotenv").config();
// async error

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const titleRouter = require("./routes/title");
const userRouter = require("./routes/user")

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const cors = require("cors");
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 1337;

app.use("/api/titles", titleRouter);
app.use("/api/users", userRouter);


// movies routes
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

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
