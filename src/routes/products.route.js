const { Router } = require('express');
const productsRouter = Router();
const productController = require('../controllers/product.controller');

productsRouter.get("/", productController.getProducts);
// product/1
productsRouter.get("/:productId", productController.getProductDetail);
productsRouter.post("/", productController.insertProduct);
productsRouter.patch("/:productId", productController.updateProduct);
productsRouter.delete('/:productId', productController.deleteProduct);

module.exports = productsRouter;
