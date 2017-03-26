var mysql = require('mysql');

require('dotenv').config();

var env = process.env;

if (!env.DB_PASSWORD || !env.DB_HOST || !env.DB_USER || !env.DB_NAME) {
  throw new Error('Missing DB info in `.env`, see readme.md for more info');
}

module.exports = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});
