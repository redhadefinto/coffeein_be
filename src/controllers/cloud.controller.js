const {uploader, uploaderUsers} = require('../utils/cloudinary');
const response = require("../utils/response");
const profileModel = require('../models/profile.model');

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

const cloudeUploadUsers = async (req, res) => {
  try {
    // upload ke cloud
    const { id } = req.authInfo;
    // const { params } = req;
    const { data, err, msg } = await uploaderUsers(req, "users", id);
    if(err) throw {msg, err};
    if(!data) return res.status(200).json({msg: "No File Uploaded"});
    const urlImage = data.secure_url;
    await profileModel.updateProfile(id, urlImage);
    res.status(201).json({
      data, msg
    });
  } catch (error) {
    response.error(res, { status: 500, msg: error.err.message });
    // console.log(error)
  }
};

module.exports = {cloudeUpload, cloudeUploadUsers};