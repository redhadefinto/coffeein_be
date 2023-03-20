const {uploader} = require('../utils/cloudinary');
const response = require("../utils/response");

const cloudeUpload = async (req, res) => {
  try {
    // upload ke cloud
    const { params } = req;
    const { data, err, msg } = await uploader(req, "product", params.id);
    if(err) throw {msg, err};
    if(!data) return res.status(200).json({msg: "No File Uploaded"});
    res.status(201).json({
      data, msg
    });
  } catch (error) {
    response.error(res, { status: 500, msg: error.err.message });
    // console.log(error)
  }
};

module.exports = {cloudeUpload};