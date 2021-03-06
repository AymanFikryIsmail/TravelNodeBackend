
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const app = express()


var http = require('http');
const https = require("https");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var packageRouter = require('./routes/package');
var companyRouter = require('./routes/company');
var imageRouter = require('./routes/image');
var cityRouter = require('./routes/city');

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/packages',packageRouter);
app.use('/company',companyRouter);
app.use('/image',imageRouter);
app.use('/city',cityRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// for authentication
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});


	app.listen(process.env.PORT || 3000, function () {
  console.log('Example host2 app listening on port 3000!')
})


module.exports = app;