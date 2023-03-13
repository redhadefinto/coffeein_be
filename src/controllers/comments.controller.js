const commentsModel = require('../models/comments.model');

const getAllComments = async (req, res) => {
  try {
    const result = await commentsModel.find();
    res.status(200).json({
      data: result,
      msg: "OK"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};

module.exports = { getAllComments }