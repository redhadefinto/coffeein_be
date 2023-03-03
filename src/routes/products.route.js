const { Router } = require('express');
const productsRouter = Router()
const productController = require('../controllers/product.controller')

productsRouter.get("/", productController)

// productsRouter.post('/', async (req, res) => {
//   const {product_name, price, image, category_id} = req.body
//   try {
//     const result = await db.query(`insert into product(product_name, price, image, category_id) values('${product_name}', ${price}, '${image}', '${category_id}');`);
//     res.status(201).json({
//       data: result.rows,
//       msg: 'Insert succes'
//     })
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json({
//       msg: "Insert fail"
//     })
//   }
// })

module.exports = productsRouter;
