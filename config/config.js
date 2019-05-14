var mysql = require('mysql');

var pool = mysql.createPool({

connectionLimit : 10,
host : 'localhost',
user : 'root',
password : 'ayman123AYMAN',
charset: 'utf8',
database : 'travel'
});



module.exports = pool;