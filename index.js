// express
const express = require('express')
const app = express();
const path = require('path')

// setting port
const port = 8080;

const masterRouter = require('./src/routes')
app.use(masterRouter)


app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})