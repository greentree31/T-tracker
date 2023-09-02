const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "mevans",
  password: "password123",
  database: "teams",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
