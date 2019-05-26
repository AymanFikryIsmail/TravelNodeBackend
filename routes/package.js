var express = require('express');
var router = express.Router();
//var token = require('../config/token');
var pool = require('../config/config');
/* var hash = require('password-hash');
var gcm = require('node-gcm');
 */
/* GET packages listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource in packages');
	});
router.get('/recent',function(req,res){
	var date = new Date()-2
	var sql = "SELECT t1.*,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE addingDate  >= ? and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,[date],function(err,result){
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
router.get('/recommended',function(req,res){
	var sql = "SELECT t1.*,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE t1.cid=(SELECT company.cid from company where rate>=4) and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,function(err,result){
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
router.get('/city',function(req,res){

	var sql = "SELECT * from cities where city_name=(SELECT DISTINCT travel_to FROM packages where date > CURRENT_TIMESTAMP)";
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

router.get('/city/packages',function(req,res){
	var city =req.query.city
	var sql = "SELECT t1.*,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_to=? and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,[city],function(err,result){
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

router.get('/search',function(req,res){
	var travelFrom =req.query.from
	var travelTo =req.query.to
	var values = [travelFrom, travelTo]
	var sql = "SELECT t1.*,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,values,function(err,result){
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
router.get('/search/from',function(req,res){
	var sql = "SELECT c_location FROM company where cid = (SELECT DISTINCT cid from packages where date > CURRENT_TIMESTAMP)";
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
router.get('/search/to',function(req,res){
	var sql = "SELECT city_name from cities where city_name=(SELECT DISTINCT travel_to FROM packages where date > CURRENT_TIMESTAMP)";
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

router.get('/filter',function(req,res){
	var travelFrom =req.query.from
	var travelTo =req.query.to
	var minPrice =req.query.minPrice
	var maxPrice =req.query.maxPrice
	var minDays =req.query.minDays
	var maxDays =req.query.maxDays
	var minRate = req.query.rate
	var dateFrom = req.query.dateFrom
	var dateTo = req.query.dateTo
	var values = [travelFrom, travelTo, minPrice, maxPrice, minDays ,maxDays, minRate, dateFrom, dateTo]
	
	if(dateFrom && dateTo){
		var sql = "SELECT t1.*,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and (price between ? and ?) and (duration between ? and ?) and t1.cid=(SELECT company.cid from company where rate>=?) and date > CURRENT_TIMESTAMP and date between ? and ? GROUP BY t1.pid" ;
	} else {
		var sql = "SELECT t1.*,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and (price between ? and ?) and (duration between ? and ?) and t1.cid=(SELECT company.cid from company where rate>=?) and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	}
	pool.query(sql,values,function(err,result){
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
router.get('/favorite',function(req,res){
	var userId =req.query.user_id
	var sql = "SELECT t1.*,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE date > CURRENT_TIMESTAMP and t1.pid = (SELECT  pid FROM user_favourite where uid=?and pid=t1.pid) GROUP BY t1.pid" ;
	pool.query(sql,[userId],function(err,result){
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
router.get('/favorite/update',function(req,res){
	var userId = req.query.user_id
	var packageId = req.query.package_id
	var values = [userId, packageId]
	var sql = "SELECT * FROM user_favourite WHERE uid=? and pid=?";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			if(result.length>0){
				var values = [userId, packageId]
				var sqlRemove = "DELETE FROM user_favourite WHERE uid=? and pid=?";
				pool.query(sqlRemove,values,function(err){
					if(err){
						res.json({			
							status : false,
							data : null,
							message : err				
						});			
					} else {
						res.json({		
							status : true,
							message : " package deleted from favorite"			
						});
					}
				})
			} else {
				var values = [packageId, userId]
				var sqlAdd = "INSERT INTO user_favourite VALUES (?, ?);";
				pool.query(sqlAdd,values,function(err,result){
					if(err){
						res.json({			
							status : false,
							data : null,
							message : err				
						});			
					} else {
						res.json({		
							status : true,
							message : " package added to favorite"			
						});
					}
				})
			}	
			
		}		
		
	});
});
module.exports = router;
