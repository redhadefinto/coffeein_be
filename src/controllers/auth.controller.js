const jwt = require('jsonwebtoken');
const authModels = require('../models/auth.model');

const env = require('../configs/environment');

const login = async (req, res) => {
  try {
    // ambil email dan password dari body
    const { body } = req;
    // verifikasi ke db
    const result = await authModels.userVerification(body);
    // jika valid, maka buatkan jwt token
    if(result.rows.length < 1) return res.status(401).json({
      msg: "Email/Password Salah"
    });

    // buat token
    jwt.sign(result.rows[0], env.jwtSecret, {
      expiresIn: "5m",
    }, (err, token) => {
      if(err) throw err;
      res.status(200).json({
        msg: "Selamat Datang",
        token
      });
    });
  } catch (error) {
    // jika tidak, maka error handling
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};

const privateAcces = (req, res) => {
  const { id, email, role_id } = req.authInfo;
  res.status(200).json({
    payload: {id, email, role_id},
    msg: "OK"
  });
};

module.exports = {
  login,
  privateAcces,
};