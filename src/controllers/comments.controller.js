// const commentsModel = require('../models/comments.model');
const { error } = require('../configs/mongo');


// const getAllComments = async (req, res) => {
//   try {
//     // const result = await comments.find({}).toArray();
//     const result = await error.find({}).toArray();
//     res.status(200).json({
//         data: result,
//         msg: "OK"
//       });
//     // const result = await commentsModel.find();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal Server Error"
//     });
//   }
// };

const logError = async (req, res) => {
  try {
    const result = await error.insertOne(req.body);
    res.status(201).json({
      data: result,
      msg: "OK",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = { logError };