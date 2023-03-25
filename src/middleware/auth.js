const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/environment');

const authModels = require('../models/auth.model');

const {error} = require("../utils/response");

const checkToken = (req, res, next) => {
  // ambil token dari header
  const bearerToken = req.header("Authorization");
  // via authorization header berbentuk bearer token
  // bearer namaToken
  // verifikasi token 
  if(!bearerToken) return error(res, {status: 403, message: "Silahkan Login Terlebih Dahulu"});
  
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, jwtSecret, async (err, payload) => {
    // jika tidak, maka tolak akses 
    if (err && err.name) return error(res, {
      status: 403,
      message: err.message,
    });
    const blackList = await authModels.getBlackList(token);
    // console.log(blackList.rows);
    if(!blackList.rows[0]) {
      res.status(401).json({
        msg: "please login first",
      });
      return;
    } 
      if(token === blackList.rows[0].black_list) {
      res.status(401).json({
          msg: "please login first",
        });
        return;
      }
    if(err)
      return error(res, {
        status: 500,
        message: err.message,
      });
      // if()
      // jika valid, maka lanjut ke controller
      // attach payload ke object request
      req.authInfo = payload;
    next();
  });
};

const checkRole = (req, res, next) => {
  const role = req.authInfo.role_id; 
  if(role !== 1) {
    return res.status(403).json({
      msg: "Not allowed, Only admins should access.",
    });
  }
  next();
};


module.exports = {
  checkToken,
  checkRole
};