const { Router } = require('express')
const welcomeRouter = Router();
const path = require("path")

welcomeRouter.get("/", (req, res) => {
  // res.json({
  //   msg: 'Selamat Datang di Coffe shop api'
  // })
  res.status(201).sendFile(path.join(__dirname, "../html/welcome.html"))
});

module.exports = welcomeRouter;