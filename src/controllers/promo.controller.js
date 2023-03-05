const promoModel = require('../models/promo.model')

const getPromo = async (req, res) => {
  try {
    const result = await promoModel.getPromo();
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getPromoDetail = async (req, res) => {
  try {
    const { params } = req;
    const result = await promoModel.getPromoDetail(params);
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

const insertPromo = async (req, res) => {
  try {
    const { body } = req;
    const result = await promoModel.insertPromo(body);
    res.status(201).json({
      data: result.rows,
      msg: "Create Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updatePromo = async (req, res) => {
  try {
    const { params, body } = req;
    const result = await promoModel.updatePromo(params, body);
    res.status(200).json({
      data: result.rows,
      msg: "Update Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deletePromo = async (req, res) => {
  try {
    const { params } = req;
    const result = await promoModel.deletePromo(params);
    res.status(200).json({
      data: result.rows,
      msg: "Delete Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getPromo,
  getPromoDetail,
  insertPromo,
  updatePromo,
  deletePromo
}