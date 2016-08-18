//auth.js
var jwt = require('jwt-simple');
var User = require('../model/user.js');
var Helper = require('../util/responseObjectHelper.js');
var constants = require('../util/constants.js');
//expose auth methods
var auth = {
	//this method grabs request response objects and
	//sets return values as necessary, but doee not
	//actually return anything
	login: function(req, res, next){
		try {
			//first get username and password
			var userName = req.body.userName || '';
			var password = req.body.password || '';
			if (userName == '' || password == '') {
				//username or password was not provided so return unauthorized
				//TODO-potentially refactor to be exception based
				Helper.unauthorized(res);
				next();
				return;
			}
			//first let's make sure the user and password are legit
			var user = new User({userName: userName, password: password});
			if (!user.isValid()) {
				Helper.unauthorized(res);
				next();
				return;
			}
			auth.validate(user, password, function(err, dbUserObj) {
				if(err){
					Helper.unauthorized(res);
					next();
					return;
				}
				if (dbUserObj) {
					res.json(genToken(dbUserObj));
					next();
					return;
				}
				Helper.unauthorized(res);
				next();
			});

		}
		catch(err){
			console.log(err)
			Helper.unauthorized(res);
			next();
		}
	
	},
	validate: function(user, password, next){
		//Okay if they are let's go looking for it
		user.findByUserName(user.data.userName, function(user){
			//try and create a user with the response
			if(user.length>0) {
				var newUser = user[0];
				var user = new User({userName: newUser.userName, password : newUser.password, _id: newUser.id});
				//now check the password
				//TODO-update this to handle hashing of password stuff
				if(user.data.password == password) {
					//remove password
					user.set('password', null)
					next(null, user);
					return;
				}
			}
			//if the user isn't found then return error
			next(new Error(constants.UNAUTHORIZED));
		});
	},
	validateUser : function(userName, next) {
		new User().findByUserName(userName, function (user) {
			if (!user) throw constants.NOT_FOUND;
			next(user)
		});
	}
};

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

function validatePassword(user){
	//Okay if they are let's go looking for it
	var password = user.password;

	user.findByUserName(userName, function(user){
		//try and create a user with the response
		if(user.length>0) {
			var newUser = user[0];
			var user = new User({userName: newUser.userName, password : newUser.password, _id: newUser.id});
			//if the user isn't found then throw unauthorized
			if(user.isValid()){
				res.json(genToken(user));
				next();
				return;
			}
		}
		Helper.unauthorized(res);
		next();
		return;

	});
}

module.exports = auth;