//auth.js
var jwt = require('jwt-simple');
var User = require('../mode/user.js');
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
			res.status(401);
			res.json({
				"status":401,
				"message":"Invalid Credentials"
			});
			return;
		}
		//Do a weird thing where we statically call findByUserName
		new User().findByUserName(userName, function(user){
			//try and create a user with the response
			var user = new User(user);
			if(!user){
				res.status(401);
				res.json({
					"status":401,
					"message":"Invalid Credentials"
				});
				return;
			}
			
			res.json(genToken(user));
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