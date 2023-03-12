const db = require("../configs/postgre");

const getUsers = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select u.id, r.role_name, u.phone_number from users u join roles r on u.role_id = r.id`;

    let limit = "u.id ASC";
    if (query.order === "cheapest") {
      limit = ` limit ${query.limit}`;
    }
    sqlQuery += ` ORDER BY ${limit}`;

    db.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getUserDetail = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select u.id, r.role_name, u.phone_number from users u join roles r on u.role_id = r.id WHERE u.id = $1`;
    const values = [params.userId];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};


const insertUser = (data, hashedPassword) => {
  return new Promise((resolve, reject) => { 
    const sqlQuery = `insert into users (email, pass, role_id, phone_number) values ($1, $2, $3, $4) RETURNING *`;
    // parameterized query
    const values = [data.email, hashedPassword, data.role_id, parseInt(data.phone_number)];
    db.query(sqlQuery, values, (err, result) => {
      if(err) {
        reject (err);
        return;
      }
      resolve(result);
    });
  });
};  

const updateUser = (params, data) => {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(data);
    const values = fields.map((field) => data[field]);
    const setValues = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");
    const sqlQuery = `UPDATE users SET ${setValues} WHERE id = $${
      fields.length + 1
    } RETURNING *`;
    const valuesWithId = [...values, params.userId];

    db.query(sqlQuery, valuesWithId, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};


const deleteUser = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `delete from users where id = $1`;
    const values = [params.userId];
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
  getUsers,
  getUserDetail,
  insertUser,
  updateUser,
  deleteUser
};