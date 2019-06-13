var express = require('express');
var fileUpload = require('express-fileupload');
var router = express.Router();
router.use(fileUpload());
var pool = require('../config/config');
const fs = require('fs')

router.post("/",function(req,res){
  if (!req.files){
    res.json({
      status : false ,
      data : "",
      message : "No files were uploaded."
    });		 
  }else if(!req.files.file.mimetype.includes("image")){
    res.json({
      status : false ,
      data : "",
      message : "file should be image only"
    });
  }else{
    let uploadedfile = req.files.file;
    var date = new Date()
    var path =  date.getTime() + Math.random()+ req.files.file.name ;
    var path1 = './public/'+ path ;	
    uploadedfile.mv(path1,function(err){
      if(err){			 
        console.log(err);	 
        res.json({
          status : false ,
          data : "",
          message : "internal sever error"
        });		 
        }else{
        res.json({
          status : true ,
          data : path ,
          message :"has been uploaded"
        }); 
      }   
    });	 
  }	
});
router.post("/delete",function(req,res){
    var name = req.body.name
    var path = './public/'+ name ;	
    fs.unlink(path,function(err){
      if(err){			 
        console.log(err);	 
        res.json({
          status : false ,
          data : "",
          message : "internal sever error"
        });		 
        }else{
        res.json({
          status : true ,
          data : {} ,
          message :"has been deleted"
        }); 
      }   
    });	  
});

router.get('/download/:image',function(req,res){
	 var file ="/root/images/" + req.params.image;
	 res.sendFile(file);
});

module.exports = router;