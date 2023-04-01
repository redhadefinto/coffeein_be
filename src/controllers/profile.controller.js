const profileModel = require('../models/profile.model');

const getProfile = async (req, res) => {
  try {
    // const { query } = req;
    // const {params} = req;
    const { id } = req.authInfo;
    // console.log(id);
    const result = await profileModel.getProfile(id);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Users Tidak Ditemukan",
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

const updateProfile = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.authInfo;
    const result = await profileModel.updateProfile(id, body);
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

module.exports = {
  getProfile,
  updateProfile
};