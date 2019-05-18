var mysql = require('mysql');

var pool = mysql.createPool({

connectionLimit : 10,
host : 'localhost',
user : 'root',
password : 'raghdahany_550',
charset: 'utf8',
database : 'travel'
});



module.exports = pool;