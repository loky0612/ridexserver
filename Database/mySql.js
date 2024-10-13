const db = require('mysql2');

const connection = db.createConnection({
    host : 'localhost',
    port: '3306',
    user : 'root',
    password : '1234',
    database : 'car'
})

module.exports = connection;
