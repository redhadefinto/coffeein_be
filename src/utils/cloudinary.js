const cloudinary = require("../configs/cloudinary");
const path = require("path");
const dataUriParser = require("datauri/parser");

const uploader = async (req, prefix, id) => {
  const { file } = req;
  if (!file) return { data: null };

  // Cek ukuran file
  const fileSizeLimit = 2 * 1024 * 1024; // 2 MB
  if (file.size > fileSizeLimit) {
    return {
      data: null,
      msg: "File size exceeded the limit",
      err: new Error("File size exceeded the limit"),
    };
  }

  // mendapatkan buffer dari multer
  const buffer = file.buffer;
  const ext = path.extname(file.originalname).toString();
  // buffer konversi menjadi datauri
  const parser = new dataUriParser();
  const datauri = parser.format(ext, buffer);
  const fileName = `${prefix}-${file.fieldname}-${id}`;

  try {
    // upload ke cloudinary
    const result = await cloudinary.uploader.upload(datauri.content, {
      public_id: fileName,
      folder: "coffe_shop",
    });
    return { data: result, msg: "OK" };
  } catch (err) {
    return { data: null, msg: "Upload Failed", err };
  }
};

const uploaderUsers = async (req, prefix, id) => {
  const { file } = req;
  if (!file) return { data: null };
  console.log(file);
  // mendapatkan buffer dari multer
  const buffer = file.buffer;
  const ext = path.extname(file.originalname).toString();
  // buffer konversi menjadi datauri
  const parser = new dataUriParser();
  const datauri = parser.format(ext, buffer);
  const fileName = `${prefix}-${file.fieldname}-${id}`;

  try {
    // upload ke cloudinary
    const result = await cloudinary.uploader.upload(datauri.content, {
      public_id: fileName,
      folder: "coffe_shop_users",
    });
    return { data: result, msg: "OK" };
  } catch (err) {
    return { data: null, msg: "Upload Failed", err };
  }
};

module.exports = { uploader, uploaderUsers };
