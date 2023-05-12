const { Router } = require("express");

const cloudRouter = Router();
const cloudController = require("../controllers/cloud.controller");
const { memoryUpload, errorHandler } = require("../middleware/memoryUpload");
const { checkToken } = require("../middleware/auth");

cloudRouter.post(
  "/product/:id",
  (req, res, next) =>
    memoryUpload.single("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  cloudController.cloudeUpload
);
cloudRouter.post(
  "/user",
  checkToken,
  (req, res, next) =>
    memoryUpload.single("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  cloudController.cloudeUploadUsers
);

module.exports = cloudRouter;
