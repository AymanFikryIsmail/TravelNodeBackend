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
router.get('/all',function(req,res){
	var sql = "SELECT pid,p_name,travel_from,travel_to,price,discounted_price,avail_tickets,duration,date,description,c_name FROM packages,company WHERE company.cid=packages.cid";
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
module.exports = router;