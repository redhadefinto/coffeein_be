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

const register = (data, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into users (email, pass, role_id, phone_number) values ($1, $2, $3, $4) RETURNING *`;
    // parameterized query
    const values = [
      data.email,
      hashedPassword,
      data.role_id,
      parseInt(data.phone_number),
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

const createOtp = (email, otp) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'UPDATE users set otp = $1 WHERE email = $2 RETURNING otp';
    const values = [otp, email];
    db.query(sqlQuery, values, (err, result) => {
      if(err) return reject(err);
      resolve(result);
    });
  });
};

const getOtp = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'select otp from users where email = $1';
    db.query(sqlQuery, [email], (err, result) => {
      if(err) reject(err);
      resolve(result);
    });
  });
};

const forgot = (email, password) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users set pass = $1 where email = $2`;
    db.query(sqlQuery, [password, email], (err, result) => {
      if(err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
  getPassword,
  editPassword,
  register,
  createOtp,
  getOtp,
  forgot
};