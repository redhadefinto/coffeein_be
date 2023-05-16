const { Router } = require("express");

const { checkToken, checkRole } = require("../middleware/auth");
const transactionController = require("../controllers/transactions.contoller");

const transactionsRouter = Router();

// transactions
transactionsRouter.get("/", checkToken, transactionController.getHistory);
transactionsRouter.post(
  "/",
  checkToken,
  transactionController.createTransaction
);
transactionsRouter.get(
  "/admin",
  checkToken,
  checkRole,
  transactionController.getAllTransaction
);
transactionsRouter.delete("/", checkToken, transactionController.deleteHistory);
transactionsRouter.patch(
  "/",
  checkToken,
  checkRole,
  transactionController.patchHistory
);

module.exports = transactionsRouter;
