var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var pool = require('./config');
var mysql = require('mysql');

module.exports = function(passport) {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
	opts.secretOrKey = 'nodeauthsecret';
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		var sql = '';
		var val;
		if(jwt_payload.member_id){
			sql = 'SELECT * FROM member where id = ?';
			val = jwt_payload.member_id;
		}else{
			done(err, false);
		}
		pool.query(sql, val, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user[0]) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};


