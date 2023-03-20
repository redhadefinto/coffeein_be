const { Router } = require("express");

const cloudRouter = Router();
const cloudController = require('../controllers/cloud.controller');
const memoryUpload = require('../middleware/memoryUpload');

cloudRouter.post("/product/:id", memoryUpload.single("image"), cloudController.cloudeUpload);

module.exports = cloudRouter;