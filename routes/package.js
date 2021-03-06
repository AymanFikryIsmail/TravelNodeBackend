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
	var date = new Date().getTime()
	var user = req.query.id
	var sql = "SELECT t1.* ,(SELECT value FROM company_rate where pid=t1.pid and uid=?) as user_rate,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE  date > ? GROUP BY t1.pid" ;
	pool.query(sql,[user,user,date],function(err,result){
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
					if(!element["user_rate"]){
						element["user_rate"]=0
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

router.get('/recent',function(req,res){
	var date = new Date().getTime()
	var user = req.query.id
	var sql = "SELECT t1.* ,(SELECT value FROM company_rate where pid=t1.pid and uid=?) as user_rate,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE addingDate  >= ? and date > ? GROUP BY t1.pid" ;
	pool.query(sql,[user,user,date,date],function(err,result){
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
					if(!element["user_rate"]){
						element["user_rate"]=0
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
router.get('/recommended',function(req,res){
	var date = new Date().getTime()
	var user = req.query.id
	var sql = "SELECT t1.*,(SELECT value FROM company_rate where pid=t1.pid and uid=?) as user_rate,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE date > ? GROUP BY t1.pid" ;
	pool.query(sql,[user,user,date],function(err,result){
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
					if(!element["user_rate"]){
						element["user_rate"]=0
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
				var recomended=[]
				result.map(function(element){
					if(element["rate"]>=4){
						recomended.push(element)
					}
				})
			}else{
				var recomended = []
			}
			res.json({		
				status : true,
				data : recomended,
				message : "done"			
			});		
			
		}		
		
	});
});
router.get('/city',function(req,res){
	var date = new Date().getTime()
	console.log(date)
	var sql = "SELECT DISTINCT cities.* from cities JOIN packages ON cities.city_name=packages.travel_to ";
	pool.query(sql,function(err,result){
	console.log(err  + " res : "+result )

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
	var date = new Date().getTime()
	var city =req.query.city
	var user = req.query.id
	var sql = "SELECT t1.*,(SELECT value FROM company_rate where pid=t1.pid and uid=?) as user_rate,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_to=? and date > ? GROUP BY t1.pid" ;
	pool.query(sql,[user,user,city,date],function(err,result){
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
					if(!element["user_rate"]){
						element["user_rate"]=0
					}
					if(!element["user_rate"]){
						element["user_rate"]=0
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

router.get('/search',function(req,res){
	var date = new Date().getTime()
	var travelFrom =req.query.from
	var travelTo =req.query.to
	var user = req.query.id
	var values = [user,user,travelFrom, travelTo, date]
	var sql = "SELECT t1.*,(SELECT value FROM company_rate where pid=t1.pid and uid=?) as user_rate,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and date > ? GROUP BY t1.pid" ;
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
					if(!element["user_rate"]){
						element["user_rate"]=0
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

router.get('/search/from',function(req,res){
	var date = new Date().getTime()
	var sql = "SELECT c_location FROM company where cid = (SELECT DISTINCT cid from packages where date > ?)";
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

router.get('/search/all',function(req,res){
	var sql = "SELECT city_name from cities";
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
	var date = new Date().getTime()
	var sql = "SELECT city_name from cities where city_name=(SELECT DISTINCT travel_to FROM packages where date > ?)";
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
	var date = new Date().getTime()
	var values = [user,user,travelFrom, travelTo, minPrice, maxPrice, minDays ,maxDays, minRate, dateFrom, dateTo, date]
	
	if(dateFrom && dateTo){
		var sql = "SELECT t1.*,(SELECT value FROM company_rate where pid=t1.pid and uid=?) as user_rate,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and (price between ? and ?) and (duration between ? and ?) and t1.cid=(SELECT company.cid from company where rate>=?) and date > ? and date between ? and ? GROUP BY t1.pid" ;
	} else {
		var sql = "SELECT t1.*,(SELECT value FROM company_rate where pid=t1.pid and uid=?) as user_rate,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE travel_from =? and travel_to =? and (price between ? and ?) and (duration between ? and ?) and t1.cid=(SELECT company.cid from company where rate>=?) and date > CURRENT_TIMESTAMP GROUP BY t1.pid" ;
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
					if(!element["user_rate"]){
						element["user_rate"]=0
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
router.get('/favorite',function(req,res){
	var date = new Date().getTime()
	var userId =req.query.user_id
	var sql = "SELECT t1.*,(SELECT value FROM company_rate where pid=t1.pid and uid=?) as user_rate,(SELECT pid FROM user_favourite where pid=t1.pid and uid=?) as fav_flag,(SELECT SUM(tickets) FROM user_package where pid=t1.pid) as adults,(SELECT SUM(discounted_tickets) FROM user_package where pid=t1.pid) as children,(SELECT AVG(value) FROM company_rate where cid=t1.cid) as rate,(SELECT c_name FROM company where cid=t1.cid) as company, GROUP_CONCAT(t2.photo_path) AS paths from packages t1 LEFT JOIN package_photo t2 ON t2.pid=t1.pid WHERE date > ? and t1.pid = (SELECT  pid FROM user_favourite where uid=?and pid=t1.pid) GROUP BY t1.pid" ;
	pool.query(sql,[userId,userId,date,userId],function(err,result){
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
					if(!element["user_rate"]){
						element["user_rate"]=0
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
	var date = new Date().getTime()
	var values = [packageId, userId, adults, children , name,date]
	console.log(values)
	var sql = "INSERT INTO user_package (pid,uid,tickets,discounted_tickets , name,booking_date) VALUES (?, ?, ?, ?,?,?);" ;
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
	var sql = "SELECT up.*,p.*,(SELECT AVG(value) FROM company_rate where cid=p.cid) as rate,(SELECT GROUP_CONCAT(photo_path) FROM package_photo where pid=p.pid) as paths FROM user_package up INNER JOIN packages p ON up.pid=p.pid where up.uid=? ORDER BY booking_date DESC";
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
router.post('/add',function(req,res){
	var name = req.body.name
	var from = req.body.from
	var to = req.body.to
	var price = req.body.price
	var discounted = req.body.discounted
	var tickets = req.body.tickets
	var duration = req.body.duration
	var date = req.body.date
	var desc = req.body.desc
	var cid = req.body.cid
	var paths = req.body.paths
	var add = new Date().getTime()
	var values = [name,from,to,price,discounted,tickets,duration,date,desc,cid,add]
	var sql = "INSERT INTO packages (p_name,travel_from,travel_to,price,discounted_price,avail_tickets,duration,date,description,cid,addingDate) values (?,?,?,?,?,?,?,?,?,?,?)";
	pool.query(sql,values,function(err,result){
			if(err){
				res.json({			
					status : false,
					data : null,
					message : err				
				});			
			}else{
				var sql1 = "INSERT INTO package_photo (photo_path,pid) values ?"
				paths = paths.map(function(element){
					return [element,result["insertId"]]
				})
				pool.query(sql1,[paths],function(err,result){
					if(err){
						res.json({			
							status : false,
							data : null,
							message : err				
						});			
					}else {
						res.json({		
							status : true,
							data : result,
							message : "done"			
						});
					}
				})
						
				
			}		
		
	});
});
module.exports = router;
