const db = require("../configs/postgre");

const getUsers = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select u.id, u.email, u.display_name, u.birth_day, ru.role from users u join role_user ru on u.role_id = ru.id`

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
  })
}

const getUserDetail = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT u.id, u.email, u.password, u.phone_number, u.address, u.display_name, u.first_name, u.last_name, u.birth_day, ru.role, ug.gender 
    FROM users u 
    JOIN role_user ru ON u.role_id = ru.id 
    JOIN user_gender ug ON u.gender_id = ug.id 
    WHERE u.id = $1;`;
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


const insertUser = (data) => {
  return new Promise((resolve, reject) => { 
    const sqlQuery = `insert into users (email, password, phone_number, address, display_name, first_name, last_name, birth_day, role_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    // parameterized query
    const values = [data.email, data.password, data.phone_number, data.address, data.display_name, data.first_name, data.last_name, data.birth_day, data.role_id, data.gender_id]
    db.query(sqlQuery, values, (err, result) => {
      if(err) {
        reject (err)
        return;
      }
      resolve(result);
    });
  });
};  

const updateUser = (params, data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `update users set email = $1, password = $2, phone_number = $3, address = $4, display_name = $5, first_name = $6, last_name = $7, birth_day = $8, role_id = $9, gender_id = $10 where id = $11 RETURNING *;`;
    const values = [
      data.email,
      data.password,
      data.phone_number,
      data.address,
      data.display_name,
      data.first_name,
      data.last_name,
      data.birth_day,
      data.role_id,
      data.gender_id,
      params.userId
    ];
    db.query(sqlQuery, values, (err, result) => {
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
}