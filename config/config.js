var mysql = require('mysql');

var pool = mysql.createPool({

connectionLimit : 10,
host : '37.59.55.185',
user : '7bx1QLQ9YD',
password : 'LA39jHyyBl',
charset: 'utf8',
database : '7bx1QLQ9YD'
});



module.exports = pool;