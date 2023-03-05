const {Pool} = require('pg');
// client => client cuman 1
// pool => sekumpulan client

const env = require('./environment')
// console.log(pwd)

const postgre = new Pool({
  host: env.host,
  database: env.db,
  port: env.dbPort,
  user: env.user,
  password: "padang",
});

module.exports = postgre;