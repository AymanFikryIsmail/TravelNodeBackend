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
		var sql = "SELECT * from packages where addingDate  >= ? and date > CURRENT_TIMESTAMP ";
		pool.query(sql,[date],function(err,result){
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
	router.get('/recommended',function(req,res){
		var sql = "SELECT * from packages where packages.cid=(SELECT company.cid from company where rate>=4) and date > CURRENT_TIMESTAMP ";
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
router.get('/city',function(req,res){
	var sql = "SELECT DISTINCT * from packages where date >= CURRENT_TIMESTAMP";
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
// SELECT t1.*, GROUP_CONCAT(t2.date) AS dates
// FROM Table1 t1
// LEFT JOIN Table2 t2
//   ON t2.ID_adv = t1.ID_adv
// GROUP BY t1.ID_adv

// SELECT photo_path from package_photo where package_photo.cid = packages.cid
router.get('/city/packages',function(req,res){
	var city =req.query.city
	var sql = "SELECT t1.*, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_to=? and date >= CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,[city],function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			var newResult = result.map(function(element){
				element["paths"]=element["paths"].split(",")
				return element
			})
			res.json({		
				status : true,
				data : newResult,
				message : "done"		
			});		
			
		}		
		
	});
});

router.get('/search',function(req,res){
	var travelFrom =req.query.from
	var travelTo =req.query.to
	var values = [travelFrom, travelTo]
	var sql = "SELECT * from packages WHERE travel_from =? and travel_to =? and date >= CURRENT_TIMESTAMP" ;
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
router.get('/search/from',function(req,res){
	var sql = "SELECT DISTINCT travel_from from packages where date >= CURRENT_TIMESTAMP" ;
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
	var sql = "SELECT DISTINCT travel_to from packages where date >= CURRENT_TIMESTAMP" ;
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
		var sql = "SELECT * from packages WHERE travel_from =? and travel_to =? and (price between ? and ?) and (duration between ? and ?) and packages.cid=(SELECT company.cid from company where rate>=?) and date >= CURRENT_TIMESTAMP and date between ? and ?" ;
	} else {
		var sql = "SELECT * from packages WHERE travel_from =? and travel_to =? and (price between ? and ?) and (duration between ? and ?) and packages.cid=(SELECT company.cid from company where rate>=?) and date >= CURRENT_TIMESTAMP" ;
	}
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
