const {Pool} = require('pg');
// client => client cuman 1
// pool => sekumpulan client

const db = new Pool({
  host: "localhost",
  database: 'coffe_shop',
  user: 'redha',
  password: 'padang2020',
});

module.exports = db;