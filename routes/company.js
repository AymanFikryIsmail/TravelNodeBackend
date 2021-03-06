var express = require('express');
var router = express.Router();
var pool = require('../config/config');
var jwt = require('jwt-simple');
// var expires = moment().add('days', 7).valueOf();
var app = express();

// admin or company login
router.post('/login',function(req,res){
	var email=req.body.email
	var password= req.body.password
	var values = [email,password];
	var sql = "SELECT * FROM company where c_email=?"
	pool.query(sql,[email],function(err,result){
		if(err){
			res.json({			
				status : false,
				data : {},
				message : err				
			});			
		}else{
			if(result.length>0){
				var sql = "SELECT *,(SELECT AVG(value) FROM company_rate where cid=company.cid) as rate FROM company where  c_email =? and c_password =?   ";
	pool.query(sql,values,function(err,result){
		if(err){
			res.json({			
				status : false,
				data : {},
				message : err				
			});			
		}else{
			if (result.length > 0) {
			
			var o ={};
				o.id = result[0].cid ;
				o.name = result[0].c_name;
				o.user_phone = result[0].c_phone;
				o.email = result[0].c_email;
				o.location = result[0].c_location;
                o.photo_path = result[0].c_photo_path;
				o.role = result[0].role;
				o.rate = result[0].rate
				if(!o.rate){
					o.rate=0
				}
				app.set('jwtTokenSecret', "wetravel");
				var token = jwt.encode({
					iss: o.email
				}, app.get('jwtTokenSecret'));

                res.json({		
                    status : true,
					company : o,
					token: token,
                    message : "done"			
                });		
			}else{
				res.json({			
				status : false,
				company : null,
				message : 'wrong password',			
			});	
			}
		}		
		
	});
			} else {
				res.json({		
                    status : true,
					company : result,
					token: null,
                    message : "wrong email"			
                });
			}
		}
	})
	
});
//  my packages
router.get('/mypackages',function(req,res){
    var id = req.query.id
	var sql = "SELECT *,(SELECT SUM(tickets) FROM user_package where pid=packages.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=packages.pid) as children,(SELECT AVG(value) FROM company_rate WHERE cid=?) as rate,(SELECT GROUP_CONCAT(photo_path) FROM package_photo WHERE pid=packages.pid) as paths FROM packages WHERE cid=? ";
	pool.query(sql,[id,id,id],function(err,result){
				if(err){
                    res.json({			
                    status : false,
                    data : null,
                    message : err				
			});			
		}else{
			if(result.length>0){
				var result = result.map(function(element){
					if(element["paths"]){
						element["paths"]=element["paths"].split(",")
					}
					if(!element["rate"]){
						element["rate"]=0
					}
					if(!element["adults"]){
						element["adults"]=0
					}
					if(!element["children"]){
						element["children"]=0
					}
					if(!element["paths"]){
						element["paths"]=[]
					}
					return element
				})
			}
			res.json({		
				status : true,
				data : result,
				message : "done"			
			});		
			 
		}		
		
	});
});
router.get('/package/details',function(req,res){
    var id = req.query.id
	var sql = "SELECT * FROM user_package where pid=?";
	pool.query(sql,[id],function(err,result){
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
router.get('/package/remove',function(req,res){
    var id = req.query.id
	var sql = "DELETE FROM package_photo where pid=? and NOT EXISTS (SELECT * FROM user_package where pid=package_photo.pid LIMIT 1)";
	pool.query(sql,[id],function(err,result){
		if(err){
			res.json({			
			status : false,
			data : null,
			message : err				
			});			
		}else{
			var sql1 = "DELETE FROM user_favourite where pid=?"
			pool.query(sql1,[id],function(err,result){
				if(err){
					res.json({			
						status : false,
						data : null,
						message : err
					})
				} else {
					var sql2 = "DELETE FROM packages where pid=? and NOT EXISTS (SELECT  * FROM user_package where pid=packages.pid LIMIT 1)" 
					pool.query(sql2,[id],function(err,result){
						if(err){
							res.json({
								status : false,
								data : null,
								message : err
							})
						} else {
							res.json({
								status : true ,
								data : result ,
								message : "package deleted"
							})
						}
					})
				}
			})
			
		}		
		
	});
});
router.get('/all',function(req,res){
    var id = req.query.id
	var sql = "SELECT *,(SELECT AVG(value) FROM company_rate where cid=company.cid) as rate FROM company where cid!=?";
	pool.query(sql,[id],function(err,result){
				if(err){
                    res.json({			
                    status : false,
                    data : null,
                    message : err				
			});			
		}else{
			if(result.length>0){
				result = result.map(function(element){
					if(!element["rate"]){
						element["rate"]=0
					}
					return element
				})
			}
			res.json({		
				status : true,
				data : result,
				message : "done"			
			});		
			 
		}		
		
	});
});
router.post('/add',function(req,res){
	var name = req.body.name
	var email = req.body.email
	var phone = req.body.phone
	var location = req.body.location
	var path = req.body.path
	var password = req.body.password
	var sql = "INSERT INTO company (c_name,c_password,c_phone,c_email,c_location,c_photo_path) values (?,?,?,?,?,?)";
	pool.query(sql,[name,password,phone,email,location,path],function(err,result){
		if(err){
			res.json({		
				status : false,
				data : {},
				message : err			
			});	
		} else {
			res.json({		
				status : true,
				data : result,
				message : "done"			
			});	
		}
	})
})
router.post('/delete',function(req,res){
	var company = req.body.id
	var sql = "DELETE FROM company where cid=?"
	pool.query(sql,[company],function(err,result){
		if(err){
			res.json({		
				status : false,
				data : {},
				message : err			
			});	
		} else {
			res.json({		
				status : true,
				data : result,
				message : "done"			
			});	
		}
	})
})
router.get('/availcities',function(req,res){
    var id = req.query.id
	var sql = "SELECT * FROM cities";
	pool.query(sql,[id,id,id],function(err,result){
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