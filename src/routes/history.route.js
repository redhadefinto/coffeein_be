const { Router } = require("express");
const promoController = require("../controllers/history.controller");
const { checkToken } = require("../middleware/auth");
const historyRouter = Router();

// localhost/users
historyRouter.get("/", checkToken, promoController.getHistory);
historyRouter.get("/:historyId", promoController.getHistoryDetail);
historyRouter.post("/", checkToken, promoController.insertHistory);
historyRouter.patch("/:historyId", promoController.updateHistory);
historyRouter.delete("/:historyId", checkToken, promoController.deleteHistory);


module.exports = historyRouter;
