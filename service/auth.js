//auth.js
var jwt = require('jwt-simple');
var User = require('../model/user.js');
var Helper = require('../util/responseObjectHelper.js')
var constants = require('../util/constants.js')
//expose auth methods
var auth = {
	//this method grabs request response objects and
	//sets return values as necessary, but doee not
	//actually return anything
	login: function(req, res){
		//first get username and password
		var userName = req.body.username || '';
		var password = req.body.password || '';
		
		if(userName == '' || password == ''){
			//commented out in case my grand schemes are dumb
			/*res.status(401);
			res.json({
				"status":401,
				"message":"Invalid Credentials"
			});
			*/
			Helper.unauthorized(res)
			return;
		}
		//Do a weird thing where we statically call findByUserName
		new User().findByUserName(userName, function(user){
			//try and create a user with the response
			var user = new User(user);
			if(!user){
				Helper.unauthorized(res)
				return;
			}
			
			res.json(genToken(user));
		});	
	
	},
	validateUser : function(userName, next) {
		new User().findByUserName(userName, function(user){
			if(!user) throw constants.NOT_FOUND
			next(user)
		});
	}
	
}

//private methods
function genToken(user){
	var expires = expiresIn(7); // 7 days i guess
	var token = jwt.encode({
		exp: expires
	}, require('../config/secret')());
	return {
		token:token,
		expires:expires,
		user:user
	}
}

function expiresIn(numDays){
	var dateObj = new Date();
	return dateObj.setDate(dateObj.getDate() + numDays); 
}

 module.exports = auth;