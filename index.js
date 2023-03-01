// express
const express = require('express')
const app = express();

// setting port
const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})