// const dotenv = require('dotenv')
// dotenv.config()
require("dotenv").config();
// express
const express = require('express');
const app = express();
const cors = require('cors');

// setting port
// const port = 8080;
const { serverPort } = require('./src/configs/environment');

// parser untuk body
// extended false di gunakan untuk object 1 level
// extended true di gunakan untuk object di dalam object
app.use(express.urlencoded({ extended: false })); // form-urlencoded
app.use(express.json()); // raw json
// body akan dimasukan ke req.body

const morgan = require('morgan');
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());

const masterRouter = require('./src/routes');
app.use(masterRouter);

// const {client} = require('./src/configs/mongo');

// client.connect().then(() => {
//   console.log("Mongo DB Connected");
//   app.listen(serverPort, () => {
//     console.log(`Server is running at port ${serverPort}`);
//   });
// }).catch((err) => console.log(err));
const mongoose = require('mongoose');
const { mongoPass, mongoDbName, mongoDbHost, mongoDbUser } = require("./src/configs/environment");

mongoose
  .connect(
    `mongodb+srv://${mongoDbUser}:${mongoPass}@${mongoDbHost}/${mongoDbName}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Mongo Db Connected");
    app.listen(serverPort, () => {
      console.log(`Server is running at port ${serverPort}`);
    });
  })
  .catch((err) => console.log(err));

  module.exports = app;