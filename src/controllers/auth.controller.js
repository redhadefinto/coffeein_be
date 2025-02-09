const jwt = require("jsonwebtoken");
const authModels = require("../models/auth.model");
const bcrypt = require("bcrypt");
const profileModels = require("../models/profile.model");
const env = require("../configs/environment");
const { OAuth2Client } = require("google-auth-library");
const {
  googleClientId,
  googleClientSecret,
  googleRedirectUri,
} = require("../configs/environment");
const login = async (req, res) => {
  try {
    // ambil email dan password dari body
    const { body } = req;
    // verifikasi ke db
    const result = await authModels.userVerification(body);
    // jika valid, maka buatkan jwt token
    if (result.rows.length < 1)
      return res.status(401).json({
        msg: "Email Not Registered",
      });
    const { id, role_id, pass } = result.rows[0];
    // compare password
    const isPasswordValid = await bcrypt.compare(body.password, pass);
    if (!isPasswordValid)
      return res.status(401).json({
        msg: "Email/Password Salah",
      });
    const getProfileFromDb = await profileModels.getProfileImage(id);
    const image = getProfileFromDb.rows[0].image;
    const payload = {
      id,
      role_id,
      image,
    };
    // console.log(payload)
    const jwtOptions = {
      expiresIn: "60m",
    };
    // buat token
    jwt.sign(payload, env.jwtSecret, jwtOptions, async (err, token) => {
      if (err) throw err;
      await authModels.createToken(token, body);
      res.status(200).json({
        msg: "Login Succes",
        token,
        id,
        image,
      });
    });
  } catch (error) {
    // jika tidak, maka error handling
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const privateAcces = (req, res) => {
  const { id, email, role_id } = req.authInfo;
  res.status(200).json({
    payload: { id, email, role_id },
    msg: "OK",
  });
};

const roleAcces = (req, res) => {
  const { role_id } = req.authInfo;
  res.status(200).json({
    payload: role_id,
    msg: "OK",
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
    if (!isPasswordValid)
      return res.status(403).json({
        msg: "Password Lama Salah",
      });
    // jika valid, maka edit password
    await authModels.deleteToken(body);
    // enkripsi password baru
    const hashedPassword = await bcrypt.hash(body.newPass, 10);
    // masukan new password ke dalam db
    await authModels.editPassword(hashedPassword, authInfo.id);
    // generate new token
    const newToken = jwt.sign({ id: authInfo.id }, env.jwtSecret);
    res.status(200).json({
      msg: "Edit Password Success",
      token: newToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { body } = req;
    const pass = body.password;
    const hashedPassword = await bcrypt.hash(pass, 10);
    const emailFromDb = await authModels.getEmail(body);
    if (emailFromDb.rows.length === 1) {
      res.status(400).json({
        msg: "Email already exists",
      });
      return;
    }
    const result = await authModels.register(body, hashedPassword);
    const idFromDb = await authModels.getIdUsers();
    const idUser = parseInt(idFromDb.rows[0].max);
    await profileModels.insertProfile(idUser);
    res.status(201).json({
      data: result.rows,
      msg: "Create Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const createOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const generateOTP = () => {
      // Panjang OTP
      const OTP_LENGTH = 6;
      // Karakter yang digunakan untuk menghasilkan OTP
      const OTP_CHARS =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      let otp = "";
      for (let i = 0; i < OTP_LENGTH; i++) {
        otp += OTP_CHARS.charAt(Math.floor(Math.random() * OTP_CHARS.length));
      }
      return otp;
    };
    const otp = generateOTP().toString();
    const result = await authModels.createOtp(email, otp);
    if (result.rows < 1) {
      res.status(404).json({
        msg: "Email Belum Terdaftar",
      });
    }
    // const data = result.rows[0];
    console.log(result.rows[0].otp);
    res.status(200).json({
      // otp: result.rows[0].otp,
      msg: "Create Otp",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const forgot = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const otpFromDb = await authModels.getOtp(email);
    if (otpFromDb.rows[0].otp !== otp) {
      res.status(404).json({
        msg: "OTP Not valid",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await authModels.forgot(email, hashedPassword);
    res.status(200).json({
      msg: "Change password Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const logOut = async (req, res) => {
  try {
    const { authInfo } = req;
    // const {params} = req;
    // console.log(authInfo.id);
    const oldToken = await authModels.getToken(authInfo.id);
    // console.log(oldToken)
    await authModels.createBlackList(oldToken.rows[0].token, authInfo.id);
    res.status(200).json({
      msg: "Log Out Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const client = new OAuth2Client(
  googleClientId,
  googleClientSecret,
  googleRedirectUri
);

const googleLogin = (req, res) => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
  res.redirect(authUrl);
};

const googleCallback = async (req, res) => {
  const code = req.query.code;
  const { tokens } = await client.getToken(code);
  const userInfo = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: googleClientId,
  });
  console.log(userInfo.payload);
  const { email, name } = userInfo.payload;
  console.log(email, name);
  // const user = await User.findOne({ email });
  // if (!user) {
  //   const newUser = new User({
  //     name,
  //     email,
  //   });
  //   await newUser.save();
  // }
  // req.session.userId = user._id;
  res.redirect("/");
};

module.exports = {
  login,
  privateAcces,
  editPassword,
  roleAcces,
  register,
  createOtp,
  forgot,
  logOut,
  googleLogin,
  googleCallback,
};
