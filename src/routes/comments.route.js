const { Router } = require('express');

const commentsRouter = Router();

const commentsController = require('../controllers/comments.controller');

// commentsRouter.get('/', commentsController.getAllComments);
commentsRouter.post("/error", commentsController.logError);

module.exports = commentsRouter;