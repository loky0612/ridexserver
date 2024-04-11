const db = require('mysql2');

const connection = db.createConnection({
    host : 'sde-db.cxeu0ksiobkr.ap-south-1.rds.amazonaws.com',
    port: '3306',
    user : 'root',
    password : 'adminLokeshM0612',
    database : 'car'
})

module.exports = connection;
