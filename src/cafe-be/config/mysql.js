const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    connectionLimit: process.env.DB_CONLIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});


module.exports = connection;