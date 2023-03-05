// const dotenv = require('dotenv')
// dotenv.config()
require("dotenv").config()
// express
const express = require('express')
const app = express();

// setting port
// const port = 8080;
const { serverPort } = require('./src/configs/environment')

// parser untuk body
// extended false di gunakan untuk object 1 level
// extended true di gunakan untuk object di dalam object
app.use(express.urlencoded({ extended: false })) // form-urlencoded
app.use(express.json()) // raw json
// body akan dimasukan ke req.body

const masterRouter = require('./src/routes')
app.use(masterRouter)


app.listen(serverPort, () => {
  console.log(`Server is running at port ${serverPort}`)
})