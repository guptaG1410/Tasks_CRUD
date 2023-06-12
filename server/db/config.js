const mysql = require('mysql2');

const config = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "MySql@1410",
    database : "tasks_crud"
});

module.exports = config;