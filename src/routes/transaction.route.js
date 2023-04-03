const { Router } = require("express");

const { checkToken } = require('../middleware/auth');
const transactionController = require('../controllers/transactions.contoller');

const transactionsRouter = Router();


// transactions
transactionsRouter.get('/', checkToken, transactionController.getHistory);
transactionsRouter.post("/", checkToken, transactionController.createTransaction);
transactionsRouter.get('/detail', checkToken, transactionController.getDetailHistory);
transactionsRouter.delete('/', checkToken, transactionController.deleteHistory);
module.exports = transactionsRouter;
