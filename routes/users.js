var express = require('express');
var router = express.Router();
//var token = require('../config/token');
var pool = require('../config/config');
/* var hash = require('password-hash');

var gcm = require('node-gcm');
 */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
				message : "done"			
			});		
			
		}		
		
	});
});
router.post('/login',function(req,res){
	var email=req.body.email
	var password= req.body.password
	var values = [email,password];
	var sql = "SELECT * FROM user where  email =? and password =? ";
	pool.query(sql,values,function(err,result){
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
				message : "done"			
			});		
			
		}		
		
	});
});
router.post('/signup',function(req,res){
	var name=req.body.name
	var email=req.body.email
//	var password= req.body.password
	var user_phone= req.body.user_phone
	var city= req.body.city


	var values = [name,email,user_phone, city];
	var sql = "insert into user (name, email,user_phone,city) values(?,?,?,?) ";
	pool.query(sql,values,function(err,result){
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
				message : "done"			
			});		
			
		}		
		
	});
});

module.exports = router;
