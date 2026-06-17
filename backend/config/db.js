const mysql = require('mysql2/promise'); // ✅ CHANGE THIS

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@druv.29',
    database: 'job_portal'
});

console.log("MySQL Connected ✅");

module.exports = db;