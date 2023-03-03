const { Router } = require('express');
const productsRouter = Router()

const db = require('../configs/postgre')

productsRouter.get("/", async (req, res) => {
  try {
    const result =
      await db.query(`select p.id, p."product_name", p.price, p.image pc."category_name" from products p 
join prod_categories pc on p.category_id = pc.id;
`);
      // let order = 'id ASC'
    res.status(200).json({
      data: result.rows
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      msg: "Internal Server Error"
    })
  }
})
module.exports = productsRouter;
