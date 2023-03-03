const { getUsers } = require("../models/users.model");


const usersController = async (req, res) => {
  try {
    const result = await getUsers()
    res.status(200).json({
        data: result.rows,
      })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = usersController;