const { Router } = require('express')
const usersRouter = Router()
const db = require("../configs/postgre");

// localhost/users
usersRouter.get("/", (req, res) => {
  db.query(
    "select id, email, display_name, birth_day from users order by id asc",
    (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({
          msg: "Internal server error",
        });
        return;
      }
      res.status(200).json({
        data: result.rows,
      });
    }
  );
});

module.exports = usersRouter;