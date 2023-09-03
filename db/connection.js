const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PW,
  database: "teams_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
