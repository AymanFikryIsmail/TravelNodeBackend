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
	//var date = new Date()-2
	var user = req.query.id
	var sql = "SELECT t1.* ,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE  date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,[user],function(err,result){
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
					if(!element["fav_flag"]){
						element["fav_flag"] = 0
					} else {
						element["fav_flag"] = 1
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

router.get('/recent',function(req,res){
	var date = new Date()-2
	var user = req.query.id
	var sql = "SELECT t1.* ,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE addingDate  >= ? and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,[user,date],function(err,result){
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
					if(!element["fav_flag"]){
						element["fav_flag"] = 0
					} else {
						element["fav_flag"] = 1
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
	var user = req.query.id
	var sql = "SELECT t1.*,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE t1.cid=(SELECT company.cid from company where rate>=4) and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,[user],function(err,result){
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
					if(!element["fav_flag"]){
						element["fav_flag"] = 0
					} else {
						element["fav_flag"] = 1
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

	var sql = "SELECT DISTINCT cities.* from cities JOIN packages ON cities.city_name=packages.travel_to where  date > CURRENT_TIMESTAMP";
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
	var user = req.query.id
	var sql = "SELECT t1.*,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_to=? and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
	pool.query(sql,[user,city],function(err,result){
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
					if(!element["fav_flag"]){
						element["fav_flag"] = 0
					} else {
						element["fav_flag"] = 1
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
	var user = req.query.id
	var values = [user,travelFrom, travelTo]
	var sql = "SELECT t1.*,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
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
					if(!element["fav_flag"]){
						element["fav_flag"] = 0
					} else {
						element["fav_flag"] = 1
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

router.get('/search/all',function(req,res){
	var sql = "SELECT DISTINCT   c_location from travel.company UNION SELECT city_name from travel.cities  ";
	pool.query(sql,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			var all =[]
			if(result.length>0){
				for(let e of result){
					if(all.indexOf(e['city_name'])<0){
						all.push(e["city_name"])
					}
					if(all.indexOf(e['c_location'])<0){
						all.push(e["c_location"])
					}
				}
			}
			res.json({		
				status : true,
				data : all,
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
	var user = req.query.id
	var values = [user,travelFrom, travelTo, minPrice, maxPrice, minDays ,maxDays, minRate, dateFrom, dateTo]
	
	if(dateFrom && dateTo){
		var sql = "SELECT t1.*,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and (price between ? and ?) and (duration between ? and ?) and t1.cid=(SELECT company.cid from company where rate>=?) and date > CURRENT_TIMESTAMP and date between ? and ? GROUP BY t1.pid" ;
	} else {
		var sql = "SELECT t1.*,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and (price between ? and ?) and (duration between ? and ?) and t1.cid=(SELECT company.cid from company where rate>=?) and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
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
					if(!element["fav_flag"]){
						element["fav_flag"] = 0
					} else {
						element["fav_flag"] = 1
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
	var sql = "SELECT t1.*,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE date > CURRENT_TIMESTAMP and t1.pid = (SELECT  pid FROM user_favourite where uid=?and pid=t1.pid) GROUP BY t1.pid" ;
	pool.query(sql,[userId,userId],function(err,result){
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
					if(!element["fav_flag"]){
						element["fav_flag"] = 0
					} else {
						element["fav_flag"] = 1
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
					console.log("error at update favourite "+err)
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			if(result.length>0){
					console.log("result.length>0")
				var values = [userId, packageId]
				var sqlRemove = "DELETE FROM user_favourite WHERE uid=? and pid=?";
				pool.query(sqlRemove,values,function(err){
					if(err){
					console.log("error at delete update favourite "+err)
						res.json({			
							status : false,
							data : null,
							message : err				
						});			
					} else {
					console.log(" delete update favourite ")
						res.json({		
							data : false,
							status : true,
							message : " package deleted from favorite"			
						});
					}
				})
			} else {
				var values = [packageId, userId]
					console.log(" insert update favourite pid"+packageId + " uid "+  userId)

				var sqlAdd = "INSERT INTO user_favourite VALUES (?, ?);";
				pool.query(sqlAdd,values,function(err,result){
					if(err){
					console.log("error at insert update favourite "+err)
						res.json({			
							status : false,
							data : null,
							message : err				
						});			
					} else {
					console.log(" insert update favourite ")
						res.json({	
							data : true,
							status : true,
							message : " package added to favorite"			
						});
					}
				})
			}	
			
		}		
		
	});
});
router.post('/booking',function(req,res){
	var userId =req.body.user
	var packageId =req.body.package
	var adults =req.body.adults
	var children =req.body.children
	var name =req.body.userName

	var values = [packageId, userId, adults, children , name]
	console.log(values)
	var sql = "INSERT INTO user_package (pid,uid,tickets,discounted_tickets , name) VALUES (?, ?, ?, ?,?);" ;
	pool.query(sql,values,function(err,result){
		console.log("result "+ result + "error" +err)
				if(err){
			res.json({			
				status : false,
				data : "error ",
				message : err				
			});			
		}else{
			res.json({		
				status : true,
				data : "done",
				message : "done"			
			});		
			
		}		
		
	});
});
router.post('/rate',function(req,res){
	var user =req.body.user
	var package =req.body.package
	var company =req.body.company
	var value =req.body.value
	console.log("vals == "+ user + " ," + package+ " ,"  +  company+ "," + value)

	var sql = "SELECT * FROM company_rate where pid=? and uid=?" ;
	pool.query(sql,[package,user],function(err,result){
	console.log("error == "+ err  + " result == " + result)

				if(err){
					res.json({			
						status : false,
						data : null,
						message : err				
					});			
				}else{
				if(result.length>0){
					var sql1="UPDATE company_rate SET value=? where pid=? and uid=?"
					pool.query(sql1,[value,package,user],function(err,result){
						if(err){
							res.json({			
								status : false,
								data : "error",
								message : err				
							});
						}else{
							res.json({		
								status : true,
								data : "done",
								message : "package rate updated"			
							});
						}
					})
				} else {
					var sql2 = "INSERT INTO company_rate VALUES (?,?,?,?)";
					pool.query(sql2,[company,package,user,value],function(err,result){
						if(err){
							res.json({			
								status : false,
								data : null,
								message : err				
							});
						} else {
							res.json({		
								status : true,
								data : "done",
								message : "package rate added"			
							});
						}
					})
				}
			// res.json({		
			// 	status : true,
			// 	data : "done",
			// 	message : "done"			
			// });		
			
		}		
		
	});
});
router.get('/mine',function(req,res){
	var user = req.query.user
	var sql = "SELECT up.*,p.* FROM user_package up INNER JOIN packages p ON up.pid=p.pid where up.uid=? ORDER BY booking_date DESC";
	pool.query(sql,[user],function(err,result){
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
