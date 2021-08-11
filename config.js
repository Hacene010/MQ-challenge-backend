require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the nodeJS server PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const { SALTROUNDS, JWT_SECRET, FRONT_URL, PORT, ADMIN_URL } = process.env;

module.exports = {
  connection,
  saltRounds: SALTROUNDS,
  secretKey: JWT_SECRET,
  frontendUrl: FRONT_URL,
  adminUrl: ADMIN_URL,
  port: PORT,
};
