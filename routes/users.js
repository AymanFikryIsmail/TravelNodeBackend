// var jwt = require('jsonwebtoken');

// var getToken = function(headers) {

// 	if (headers && headers.authorization) {
// 		var parted = headers.authorization.split(' ');
// 		if (parted.length === 2) {
// 			return parted[1];
// 		} else {
// 			return null;
// 		}
// 	} else {
// 		return null;
// 	}
// };



var express = require('express');
var router = express.Router();
//var token = require('../config/token');
var pool = require('../config/config');
/* var hash = require('password-hash');

var gcm = require('node-gcm');
 */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource in users');
});
router.get('/all',function(req,res){
	var sql = "SELECT * FROM user ";
	pool.query(sql,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			
			res.json({		
				status : true,
				data : result,
				message : "done",
				// token : getToken		
			});		
			 
		}		
		
	});
});
router.post('/login',function(req,res){
	var email=req.body.email
	var password= req.body.password
	var values = [email,password];
	var sql = "SELECT * FROM user where  email =? and password =?   ";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : {},
				message : err				
			});			
		}else{
			console.log("hash not verified : " +result.length == 0);
			if (result.length > 0) {
			console.log("hash not verified : " +result[0].password);
			var o ={};
				o.id = result[0].uid ;
				o.name = result[0].name;
				o.user_phone = result[0].user_phone;
				o.email = result[0].email;
			res.json({		
				status : true,
				data : o,
				message : "done"			
			});		
			}else{
				res.json({			
				status : false,
				data : {},
				message : 'Authentication failed. Wrong Details.',			
			});	
			}
		}		
		
	});
});
router.post('/signup',function(req,res){
	var name=req.body.name
	var email=req.body.email
	var password= req.body.password
	var user_phone= req.body.user_phone
	var city= req.body.city
	var values = [name,email,password,user_phone, city];
	var sql = "insert into user (name, email,password,user_phone,city) values(?,?,?,?,?) ";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			var sql = "SELECT * FROM user where  email =? and password =?   ";
	var sqlValues = [email,password];
	pool.query(sql,sqlValues,function(err,result){
			var o ={};
				o.id = result[0].uid ;
				o.name = result[0].name;
				o.user_phone = result[0].user_phone;
				o.email = result[0].email;
				o.city = result[0].city;

			res.json({		
				status : true,
				data : o,
				message : "done"			
			});
			});
		}		
		
	});
});

module.exports = router;

// module.exports.getToken = getToken;
// module.exports.getUser = getUser;
