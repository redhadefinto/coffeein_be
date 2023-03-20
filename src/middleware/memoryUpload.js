const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();

const limits = 2e6;

const fileFilter = (req, file, cb) => {
  const pettern = /jpg|png|webp/i;
  // console.log(file);
  const ext = path.extname(file.originalname);
  if (!pettern.test(ext)) return cb(null, false);
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;