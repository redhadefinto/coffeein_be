const db = require("../configs/postgre");

const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query(
    `select id, email, display_name, birth_day from users order by id asc`,
    (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    }
    )
  })
}

module.exports = {
  getUsers
}