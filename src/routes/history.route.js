const { Router } = require("express");
const promoController = require("../controllers/history.controller");
const historyRouter = Router();

// localhost/users
historyRouter.get("/", promoController.getHistory);
historyRouter.get("/:historyId", promoController.getHistoryDetail);
historyRouter.post("/", promoController.insertHistory);
historyRouter.put("/:historyId", promoController.updateHistory);
historyRouter.delete("/:historyId", promoController.deleteHistory);


module.exports = historyRouter;
