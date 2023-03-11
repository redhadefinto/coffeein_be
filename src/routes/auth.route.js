const { Router } = require("express");

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');

const authRouter = Router();

// login => post req
authRouter.post('/', authController.login);

// register => post request
// edit pwd => update request
authRouter.patch('/', authMiddleware.checkToken, authController.editPassword);

//private
authRouter.get("/private", authMiddleware.checkToken, authController.privateAcces);

module.exports = authRouter;