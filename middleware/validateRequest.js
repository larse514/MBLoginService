//validateRequest.js
var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
var Helper = require('../util/responseObjectHelper.js')
var constants = require('../util/constants.js')

module.exports = function(req, res, next){
	// When performing a cross domain request, you will recieve
	// a preflighted request first. This is to check if our the app
	// is safe. 

	// We skip the token outh for [OPTIONS] requests.
	//if(req.method == 'OPTIONS') next();
	
	//token
	var token = (req.body && req.body.access_token) || 
	(req.query && req.query.access_token) || req.headers['x-access-token'];
	//key
	var key = (req.body && req.body.x_key) || 
	(req.query && req.query.x_key) || req.headers['x-key'];
	
	if(token || key){
		try {
			var decoded = jwt.decode(token, require('../config/secret.js')());
			//If the token is expired return unauthorized
			if(decoded.exp <= Date.now()){
				Helper.expiredToken(res);
				return;
			}
			//now validate authorization
			validateUser(key, function(){
				//if the user is admin then proceed
				if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
					next(); // To move to next middleware
				} else {
					Helper.unauthorized(res);
					return;
				});
					return;
				}
		} catch(err){
			if(err == constants.NOT_FOUND){
				Helper.invalidUser(res);
			}else {
				Helper.internalServerError(res);
			}
		}			
	}
	else {
		Helper.unauthorized(res);
		return;
  }
};
