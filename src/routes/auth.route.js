const { Router } = require("express");

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');

const authRouter = Router();

// login => post req
authRouter.post('/', authController.login);
authRouter.get("/private", authMiddleware.checkToken, authController.privateAcces);

module.exports = authRouter;