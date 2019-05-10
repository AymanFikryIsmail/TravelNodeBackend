var express = require('express');
var router = express.Router();
var token = require('../config/token');
var pool = require('../config/config');
var hash = require('password-hash');

var gcm = require('node-gcm');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/checkToken',function(req,res){
	
	console.log("checkToken");
	
	var device_token = req.body.device_token;

		var sql = "select id , name from member where device_token = ? ";
		var values = [device_token];
	
	pool.query(sql,values,function(err,result){
		
		if(err){
			console.log(err);
			res.json({
				status : false,
				message : 'Authentication failed. Wrong Details.',
				data : null
			});
			
		}else{
			console.log(result);
			if(result==null){
				res.json({
					status : false,
					message : 'Authentication failed. Wrong Details.',
					data : null
				});
			}
			else{
	   var sql2 = "update member set reset_token = ?  where device_token = ? ";
	          
	          var random=Math.floor(Math.random()*90000) + 10000;
	          console.log(random);
				var vv2 = [random,device_token];
				pool.query(sql2,vv2,function(err,result){
					if(err){
						
						console.log(err);
						res.json({
							status : false,
							message : 'fail',
							data : null
						});
						
					}else{

				res.json({
					status : true,
					message : 'Authentication failed. Wrong Details.',
					data : "done"
				});
				var sender = new gcm.Sender('AAAAsCFda48:APA91bELS1BMQmbns2ZsATSo5fQF1rYDlXjHLI5l4imF2E7bNOJgv_tHzh8Hqgeou2KTq0vgjtWwdxT_HARTHoY8vtVHjueuTj8YFhc5SJc0Jd2TUdAt7qujmolIcarvcDXGL3XC_L6d');

			
			var message = new gcm.Message({
				
				data : { type:  5,
					resetCode : random 
			       }
			});
		
			var regTokens = [device_token];			
			console.log(device_token)			
			sender.send(message, { registrationTokens :  regTokens }, function (err, response) {			
			    if(err) console.error("errorrrrrrr"+err);
			    else console.log("notification : "+response);
			});		
				
			}
				});
			
				}
		}
		
	});
	
	
});



router.post('/changePassword',token.getUser,function(req,res){
	
	console.log("accessed")
	
	
	var password = hash.generate(req.body.password);
	var reset_token = req.body.reset_token;
	var device_token = req.body.device_token;
	
	var sql = "select id from member  where reset_token = ? and device_token=?"
	
		var values = [reset_token,device_token];
	
	pool.query(sql,values,function(err){
		
		if(err){
			
			console.log(err);
			
		}else{
			var sql = "update member set password = ? , login_date=now()  where reset_token = ? and device_token=? "
				
				var values = [password,reset_token, device_token];
			pool.query(sql,values,function(err){
				
				if(err){
					
					console.log(err);
					res.json({
						status :false ,
						data : "" ,
						message : null
						
					});
				}else{
					
					res.json({
						status :true ,
						data : "" ,
						message : "done"
						
					});
				}
				
				
			
		});
			
			
		}
		
	});
	
	
});


module.exports = router;
