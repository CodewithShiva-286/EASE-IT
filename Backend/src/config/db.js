const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;


const db = mysql.createConnection({
    host: DB_HOST || 'localhost',
    user: DB_USER || 'root',
    password: DB_PASSWORD|| '',
    database: DB_NAME || 'testdb'
});


module.exports = db;
