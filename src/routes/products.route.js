const { Router } = require('express');
const productsRouter = Router();
const productController = require('../controllers/product.controller');
const {checkToken, checkRole} = require('../middleware/auth');

const { singleUpload } = require('../middleware/diskUpload');

productsRouter.get("/", productController.getProducts);
// product/1
productsRouter.get("/:productId", productController.getProductDetail);
productsRouter.post("/", checkToken, checkRole, productController.insertProduct);
productsRouter.patch("/:productId", checkToken, checkRole, singleUpload("images"), productController.updateProduct);
productsRouter.delete('/:productId', checkToken, checkRole,  productController.deleteProduct);

module.exports = productsRouter;
