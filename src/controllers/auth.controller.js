const jwt = require('jsonwebtoken');
const authModels = require('../models/auth.model');
const bcrypt = require('bcrypt');

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
    const {id, role_id, pass } = result.rows[0];
    // compare password
    const isPasswordValid = await bcrypt.compare(body.pass, pass);
    if (!isPasswordValid)
      return res.status(401).json({
        msg: "Email/Password Salah",
      });

    const payload = {
      id,
      role_id,
    };
    const jwtOptions = {
      expiresIn: "5m"
    };
    // buat token
    jwt.sign(payload, env.jwtSecret, jwtOptions, (err, token) => {
      if(err) throw err;
      res.status(200).json({
        msg: "Selamat Datang",
        token,
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

const roleAcces = (req, res) => {
  const { role_id } = req.authInfo;
  res.status(200).json({
    payload: role_id,
    msg: "OK"
  });
};

const editPassword = async (req, res) => {
  // ambil user id => via user id di payload jwt token
  const { authInfo, body } = req;
  // cek password lama => pwd lama via body
  try {
    const result = await authModels.getPassword(authInfo.id);
    const passFromDb = result.rows[0].pass;
    // jika tidak valid, maka di tolak
    // if(body.oldPass !== passFromDb) return res.status(403).json({
    //   msg: "Password Lama Salah"
    // });
    const isPasswordValid = await bcrypt.compare(body.oldPass, passFromDb);
    if(!isPasswordValid) return res.status(403).json({
      msg: "Password Lama Salah"
    });
    // jika valid, maka edit password
    // enkripsi password baru
    const hashedPassword = await bcrypt.hash(body.newPass, 10);
    // masukan new password ke dalam db
    await authModels.editPassword(hashedPassword, authInfo.id);
    // generate new token
    res.status(200).json({
      msg: "Edit Password Success",
      // token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};

module.exports = {
  login,
  privateAcces,
  editPassword,
  roleAcces
};