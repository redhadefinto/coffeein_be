const db = require("../configs/postgre");

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select u.id, u.email, u.display_name, u.birth_day, ru.role from users u join role_user ru on u.role_id = ru.id order by $1;`;
    const values = ['u.id']
    db.query(sqlQuery, values, (err, result) => {
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
    const sqlQuery = `select u.id, u.email, u.display_name, u.birth_day, ru.role from users u join role_user ru on u.role_id = ru.id where u.id = $1;`;
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
    const sqlQuery = `insert into users (email, password, phone_number, address, display_name, first_name, last_name, birth_day, role_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    // parameterized query
    const values = [data.email, data.password, data.phone_number, data.address, data.display_name, data.first_name, data.last_name, data.birth_day, data.role_id]
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
    const sqlQuery = `update users set email = $1, password = $2, phone_number = $3, address = $4, display_name = $5, first_name = $6, last_name = $7, birth_day = $8, role_id = $9 where id = $10 RETURNING *;`;
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