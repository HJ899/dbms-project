const mysql = require('mysql2');
const dbConfig = require('../config/database_config');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: dbConfig.databaseName,
    password: 'password',
    waitForConnections: 'true',
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();