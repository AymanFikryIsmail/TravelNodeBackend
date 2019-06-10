var formidable = require('formidable');
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.post('/upload',function(req,res){
	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.myFile.path;
      var newpath = '../public' + files.myFile.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
	
});
module.exports = router;