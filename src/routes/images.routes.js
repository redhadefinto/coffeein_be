const express = require("express");
const path = require("path");
const app = express();

const imagesRoute = express.Router();
const expressStatic = express.static("images");

// imagesRoute.get("/", (req, res) => {
//   try {
//     return expressStatic(req, res, () => {}); // Panggil middleware express.static untuk mengirim file statis
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });

module.exports = expressStatic;
