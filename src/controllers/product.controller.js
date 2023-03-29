const productsModel= require("../models/product.model");


const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const result = await productsModel.getProducts(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product Tidak Ditemukan",
      });
      return;
    }
    console.log(result.rows)
    const meta = await productsModel.getMetaProducts(query, result.rows);
    res.status(200).json({
      data: result.rows,
      meta,
      msg: "Get Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

// params => ada 2
// query params (search, filter, sort, paginasi) => params yang kita gunakanan untuk melakukan manipulasi data
// req.query
// path params (get detail, get product) => variabel variable sql yang kita gunakan untuk mendapat sesuatu data yang lebih spesifik
// req.params

const getProductDetail = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.getProductDetail(params);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product Tidak Ditemukan",
      });
      return;
    }
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


const insertProduct = async (req, res) => {
  try {
    const { body, file } = req;
    const result = await productsModel.insertProduct(body, file);
    res.status(201).json({
      data: result.rows,
      msg: "Create Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { body, params, file } = req;
    const result = await productsModel.updateProduct(body, params, file);
    res.status(200).json({
      data: result.rows,
      msg: "Update Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.deleteProduct(params);
    res.status(200).json({
      data: result.rows,
      msg: "Delete Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
  insertProduct,
  getProductDetail,
  updateProduct,
  deleteProduct
};
