var express = require('express');
var router = express.Router();
var pool = require('../config/config');

router.get('/requests',function(req,res){
	var sql = "SELECT * FROM suggested_cities";
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
router.post('/add',function(req,res){
    var name = req.body.name
    var path = req.body.path
	var sql = "INSERT INTO cities (city_name,city_photo) values (?,?)";
	pool.query(sql,[name,path],function(err,result){
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
				message : "city added"			
			});		
			
		}		
		
	});
});
router.post('/delete',function(req,res){
    var city = req.body.id
	var sql = "DELETE FROM  cities where city_id=?";
	pool.query(sql,[city],function(err,result){
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
				message : "city added"			
			});		
			
		}		
		
	});
});
router.post('/request/add',function(req,res){
	var city = req.body.name
	var company = req.body.id
	var sql = "INSERT INTO suggested_cities (name,company_id) values (?,?)";
	pool.query(sql,[city,company],function(err,result){
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
				message : "request added"			
			});		
			
		}		
		
	});
});
router.post('/request/delete',function(req,res){
    var city = req.body.id
	var sql = "DELETE FROM suggested_cities where suggestedCity_id=?";
	pool.query(sql,[city],function(err,result){
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
				message : "request deleted"			
			});		
			
		}		
		
	});
});
router.get('/statistics',function(req,res){
	var sql = "SELECT city_name,(SELECT SUM(tickets+discounted_tickets) FROM user_package where pid=(SELECT pid FROM packages where travel_to=city_name)) as num FROM cities";
	pool.query(sql,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			if(result.length>0){
				result = result.map(function(element){
					if(!element["num"]){
						element["num"]=0
					}
				})
			}
			res.json({		
				status : true,
				data : result,
				message : "request deleted"			
			});		
			
		}		
		
	});
});
module.exports = router;