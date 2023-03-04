const { Router } = require('express');
const userController = require('../controllers/users.controller');
const usersRouter = Router()


// localhost/users
usersRouter.get("/", userController.getUsers);
usersRouter.get("/:userId", userController.getUserDetail);
usersRouter.post('/', userController.insertUser)
usersRouter.put('/:userId', userController.updateUser)
usersRouter.delete('/:userId', userController.deleteUser)

module.exports = usersRouter;