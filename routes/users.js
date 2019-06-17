var jwt = require('jwt-simple');

var express = require('express');
var router = express.Router();
var pool = require('../config/config');
var app = express();

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
				o.city = result[0].city;
				app.set('jwtTokenSecret', "wetravel");
				var token = jwt.encode({
					iss: o.email
				}, app.get('jwtTokenSecret'));
			res.json({		
				status : true,
				data : o,
				message : "done",
				token:token			
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
router.post('/gplusfb',function(req,res){
	var name = req.body.name
	var email = req.body.email
	var token = req.body.token
	var sql = "SELECT * FROM user where token=?";
	pool.query(sql,[token],function(err,result){
				if(err){
					res.json({			
						status : false,
						data : null,
						message : err				
					});			
		}else{
			if(result.length>0){
					res.json({		
					status : true,
					data : result,
					message : "user is exist",	
			});
			} else {
				var sql1="INSERT INTO user (name,email,token) values (?,?,?)"
				pool.query(sql1,[name,email,token],function(err,result){
					if(err){
						res.json({			
							status : false,
							data : null,
							message : err				
						});	
					} else {
						var sql = "SELECT * FROM user where token=?";
						pool.query(sql,[token],function(err,result){
							if(err){
								res.json({			
									status : false,
									data : null,
									message : err				
								});
							} else {
								res.json({		
									status : true,
									data : result,
									message : "user is not exist and inserted",	
								});
							}
						})
						
					}
				})
			}
			// res.json({		
			// 	status : true,
			// 	data : result,
			// 	message : "done",
			// 	// token : getToken		
			// });		
			 
		}		
		
	});
});
module.exports = router;

// module.exports.getToken = getToken;
// module.exports.getUser = getUser;
