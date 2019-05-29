var express = require('express');
var router = express.Router();
var pool = require('../config/config');

// admin or company login
router.post('/login',function(req,res){
	var email=req.body.email
	var password= req.body.password
	var values = [email,password];
	var sql = "SELECT * FROM company where  c_email =? and c_password =?   ";
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
				o.password = result[0].c_password;
				o.location = result[0].c_location;
                o.photo_path = result[0].c_photo_path;
                o.role = result[0].role;
                res.json({		
                    status : true,
                    company : o,
                    message : "done"			
                });		
			}else{
				res.json({			
				status : false,
				company : {},
				message : 'Authentication failed. Wrong Details.',			
			});	
			}
		}		
		
	});
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
router.get('/mypackages',function(req,res){
    var id = req.query.id
	var sql = "";
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