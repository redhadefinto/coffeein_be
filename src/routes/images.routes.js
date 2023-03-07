const express = require("express");

const imagesRoute = express.Router();
const expressStatic = express.static("images");

imagesRoute.get("/", (req, res, next) => {
  try {
    expressStatic(req, res, next);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = expressStatic;
