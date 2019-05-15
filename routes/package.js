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
router.get('/city',function(req,res){
	var sql = "SELECT travel_to from packages";
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
	var city =req.body.city
	var sql = "SELECT * from packages WHERE travel_to=?" ;
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
				message : "done"			
			});		
			
		}		
		
	});
});

router.get('/search',function(req,res){
	var travelFrom =req.body.from
	var travelTo =req.body.to
	var values = [travelFrom, travelTo]
	var sql = "SELECT * from packages WHERE travel_from =? and travel_to =?" ;
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