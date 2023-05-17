const { Router } = require("express");
const productsRouter = Router();
const productController = require("../controllers/product.controller");
const { checkToken, checkRole } = require("../middleware/auth");
const { memoryUpload, errorHandler } = require("../middleware/memoryUpload");
// const { singleUpload } = require("../middleware/diskUpload");

productsRouter.get("/", productController.getProducts);
// product/1
productsRouter.get("/:productId", productController.getProductDetail);
productsRouter.get(
  "/promo/:productId",
  productController.getProductDetailWithPromo
);
productsRouter.post(
  "/",
  checkToken,
  checkRole,
  (req, res, next) =>
    memoryUpload.single("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  productController.insertProduct
);
productsRouter.post(
  "/promo",
  checkToken,
  checkRole,
  (req, res, next) =>
    memoryUpload.single("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  productController.insertProductPromo
);
productsRouter.patch(
  "/:productId",
  checkToken,
  checkRole,
  (req, res, next) =>
    memoryUpload.single("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  productController.updateProduct
);
productsRouter.patch(
  "/promo/:productId",
  checkToken,
  checkRole,
  (req, res, next) =>
    memoryUpload.single("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  productController.updateProductWithPromo
);
productsRouter.delete(
  "/:productId",
  checkToken,
  checkRole,
  productController.deleteProduct
);

module.exports = productsRouter;
