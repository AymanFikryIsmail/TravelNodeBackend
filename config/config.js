var mysql = require('mysql');

var pool = mysql.createPool({

connectionLimit : 10,
host : 'localhost',
user : 'root',
<<<<<<< HEAD
password : 'esraa*28111994',
=======
password : 'ayman123AYMAN',
>>>>>>> eb52d661762787e0dc2c5a205e494cd698b15a8a
charset: 'utf8',
database : 'travel'
});



module.exports = pool;