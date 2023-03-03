const { Router } = require('express');
const productsRouter = Router()
const productController = require('../controllers/product.controller')

productsRouter.get("/", productController.getProducts)
// product/1
productsRouter.get("/:productId", productController.getProductDetail)
productsRouter.post("/", productController.insertProducts)
productsRouter.put("/:productId", productController.updateProduct)
productsRouter.delete('/:productId', productController.deleteProduct)

module.exports = productsRouter;
