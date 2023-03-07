const { Router } = require("express");
const promoRouter = Router();
const promoController = require('../controllers/promo.controller');

promoRouter.get('/', promoController.getPromo);
promoRouter.get('/:promoId', promoController.getPromoDetail);
promoRouter.post('/', promoController.insertPromo);
promoRouter.patch('/:promoId', promoController.updatePromo);
promoRouter.delete('/:promoId', promoController.deletePromo);

module.exports = promoRouter;