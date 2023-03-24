const { Router } = require("express");

const cloudRouter = Router();
const cloudController = require('../controllers/cloud.controller');
const memoryUpload = require('../middleware/memoryUpload');
const { checkToken } = require("../middleware/auth");


cloudRouter.post("/product/:id", memoryUpload.single("image"), cloudController.cloudeUpload);
cloudRouter.post("/user", checkToken, memoryUpload.single("image"), cloudController.cloudeUploadUsers);

module.exports = cloudRouter;