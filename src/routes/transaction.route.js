const { Router } = require("express");

const { checkToken } = require('../middleware/auth');
const transactionController = require('../controllers/transactions.contoller');

const transactionsRouter = Router();


// transactions
transactionsRouter.post("/", checkToken, transactionController.createTransaction);

module.exports = transactionsRouter;
