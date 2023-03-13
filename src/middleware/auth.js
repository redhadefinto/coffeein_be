const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/environment');

const authModels = require('../models/auth.model');

const checkToken = (req, res, next) => {
  // ambil token dari header
  const bearerToken = req.header("Authorization");
  // via authorization header berbentuk bearer token
  // bearer namaToken
  // verifikasi token 
  if(!bearerToken) return res.status(403).json({
    msg: "Silahkan Login Terlebih Dahulu",
  });
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, jwtSecret, async (err, payload) => {
    const blackList = await authModels.getBlackList(token);
    if(token === blackList.rows[0].black_list) {
      res.status(401).json({
        msg: "please login first",
      });
    }
    // jika tidak, maka tolak akses 
    if (err && err.name) return res.status(403).json({
      msg: err.message
    });
    if(err)
      return res.status(500).json({
        msg: "Internal Server Error",
      });
      // if()
      // jika valid, maka lanjut ke controller
      // attach payload ke object request
      req.authInfo = payload;
    next();
  });
};

const checkRole = (req, res, next) => {
  const role = req.authInfo.role_id; // ambil peran pengguna dari payload token
  if(role !== 1) {
    return res.status(403).json({
      msg: "Tidak diizinkan, Hanya admin yang boleh mengakses."
    });
  }
  next();
};


module.exports = {
  checkToken,
  checkRole
};