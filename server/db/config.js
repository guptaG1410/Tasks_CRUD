const mysql = require('mysql2');
require('dotenv').config();

const config = mysql.createConnection({
    user : "root",
    host : process.env.DB_MYSQL_HOST,
    password : process.env.DB_MYSQL_PASSWORD,
    database : process.env.DB_MYSQL_DATABASE
});

module.exports = config;