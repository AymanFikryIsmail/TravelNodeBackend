var jwt = require('jsonwebtoken');

var getToken = function(headers) {

	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};


//var getUser = function(headers) {
//			return jwt.verify(getToken(headers), 'nodeauthsecret');
//		};



var getUser = function(req,res,next) {

	jwt.verify(getToken(req.headers), 'nodeauthsecret', function(err, decoded) {
		req.decoded=decoded;
		console.log(decoded);
		next();
	})
};


module.exports.getToken = getToken;
module.exports.getUser = getUser;