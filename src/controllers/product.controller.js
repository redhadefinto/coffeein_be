const db = require("../configs/postgre");

const getProduct = async (req, res) => {
  try {
    const result =
      await db.query(`select p.id, p."product_name", p.price, p.image, pc."category_name" from products p 
join prod_categories pc on p.category_id = pc.id;
`);
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = getProduct;
