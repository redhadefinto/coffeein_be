const path = require("path");

const welcomePage = (req, res) => {
  // res.json({
  //   msg: 'Selamat Datang di Coffe shop api'
  // })
  res.status(200).sendFile(path.join(__dirname, "../html/welcome.html"));
};

module.exports = {
  welcomePage,
}