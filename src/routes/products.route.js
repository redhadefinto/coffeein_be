const { Router } = require('express');
const productsRouter = Router();
const productController = require('../controllers/product.controller');
const {checkToken, checkRole} = require('../middleware/auth');

productsRouter.get("/", productController.getProducts);
// product/1
productsRouter.get("/:productId", productController.getProductDetail);
productsRouter.post("/", checkToken, checkRole, productController.insertProduct);
productsRouter.patch("/:productId", checkToken, checkRole, productController.updateProduct);
productsRouter.delete('/:productId', checkToken, checkRole,  productController.deleteProduct);

module.exports = productsRouter;
