const historyModel = require("../models/history.model");

const getHistory = async (req, res) => {
  try {
    const {body} = req;
    const result = await historyModel.getHistory(body);
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

const getHistoryDetail = async (req, res) => {
  try {
    const { params } = req;
    const result = await historyModel.getHistoryDetail(params);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "History Tidak Ditemukan",
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

const insertHistory = async (req, res) => {
  try {
    const { body } = req;
    const result = await historyModel.insertHistory(body);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "History Tidak Ditemukan",
      });
      return;
    }
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

const updateHistory = async (req, res) => {
  try {
    const { params, body } = req;
    const result = await historyModel.updateHistory(params, body);
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

const deleteHistory = async (req, res) => {
  try {
    // const { body } = req;
    const {params} = req;
    await historyModel.deleteHistory(params);
    res.status(200).json({
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
  getHistory,
  getHistoryDetail,
  insertHistory,
  updateHistory,
  deleteHistory,
};
