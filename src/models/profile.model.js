const db = require("../configs/postgre");

const getProfile = (id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select u.email, u.phone_number, p.first_name, p.last_name, p.display_name, p.address, p.image, p.birthday, p.gender from profile p join users u on p.id = u.id where p.id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertProfile = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into profile (id, first_name) values ($1, $2)`;
    // parameterized query
    db.query(sqlQuery, [parseInt(id),`guest`], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateProfile = (id, data) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE profile SET ";
    let values = [];
    let i = 1;
    for (const [key, val] of Object.entries(data)) {
      sqlQuery += `"${key}" = $${i}, `;
      values.push(val);
      i++;
    }
    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
    values.push(id);
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getProfile,
  insertProfile,
  updateProfile
};
