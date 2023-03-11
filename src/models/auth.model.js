const db = require('../configs/postgre');

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // verifikasi ke db
    const sql = "SELECT id, role_id, pass FROM users WHERE email=$1";
    db.query(sql, [body.email], (err, result) => {
      if(err) return reject(err);
      resolve(result);
    });
  });
};

const getPassword = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT u.pass From users u WHERE id = $1`;
    db.query(sql, [userId], (err, result) => {
      if(err) reject(err);
      resolve(result);
    });
  });
};

const editPassword = (newPass, userId) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users set pass = $1 where id = $2`;
    db.query(sql, [newPass, userId], (err, result) => {
      if(err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
  getPassword,
  editPassword
};