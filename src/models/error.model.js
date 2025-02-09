const mongoose = require('mongoose');
const errorSchema = require('../schemas/error-schema');

// buat model
const Error = mongoose.model("errors", errorSchema);
const logError = async ({status, message}, cb) => {
  try {
    await Error.create({
      status,
      message
    });
    cb(null, {
      message: "OK"
    });
  } catch (err) {
    cb(err, null);
  }
};

const getError = async (cb) => {
  try {
    const result = await Error.find({});
    cb(null, result);
  } catch (error) {
    // console.log(error.message);
    cb(error, null);
  }
};

module.exports = { logError, getError };