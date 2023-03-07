const usersModel = require('../models/users.model');

const getUsers = async (req, res) => {
  try {
    const { query } = req;
    const result = await usersModel.getUsers(query);
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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const { params } = req;
    const result = await usersModel.getUserDetail(params);
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

const insertUser = async (req, res) => {
  try {
    const { body } = req;
    const result = await usersModel.insertUser(body);
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

const updateUser = async (req, res) => {
  try {
    const { params, body } = req;
    const result = await usersModel.updateUser(params, body);
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

const deleteUser = async (req, res) => {
  try {
    const { params } = req;
    const result = await usersModel.deleteUser(params);
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
  getUsers,
  getUserDetail,
  insertUser,
  updateUser,
  deleteUser
};