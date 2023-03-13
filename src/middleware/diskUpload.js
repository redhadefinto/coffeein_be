const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // file selalu gambar
    const dest = "./public/images";
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // gambar product: images-field-time  stamp.ekstensi
    // gambar profile: images-userId
    const filename = `images-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const limits = 2e6;

const fileFilter = (req, file, cb) => {
  const pettern = /jpg|png/i;
  // console.log(file);
  const ext = path.extname(file.originalname);
  if(!pettern.test(ext)) return cb(null, false);
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter
});

module.exports = {
  singleUpload: (fieldName) => upload.single(fieldName),
  multiUpload: (fieldName, maxCount) => upload.array(fieldName, maxCount),
  multiFieldUpload: (fieldList) => upload.fields(fieldList),
};