const { Router } = require('express');
const userController = require('../controllers/users.controller');
const usersRouter = Router()


// localhost/users
usersRouter.get("/", userController);

module.exports = usersRouter;