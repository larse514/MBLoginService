//users.js
var User = require('../model/user.js');
var Helper = require('../util/responseObjectHelper.js')

var users = {
	getAll: function(req, res, next){
		new User().findAll(function(user){
			res.json(user)
			next()
		})
	},
	getByName: function(req, res, next){
		var user = new User(req.body);
		//since this is a get by name need to make sure userName is set correctly
		if(user.get('userName') == null){
			Helper.badRequest(res)
			return;
		}
		user.findByUserName(user.get('userName'), function(user){
			res.json(user)
			next()
		})
	},
	create: function(req, res, next){
		var user = new User(req.body);
		//need to make sure 
		if(!user.isValid()){
			Helper.badRequest(res)
			return;
		}
		//if the user is valid then save it
		user.save(next);
	},
	update: function(req, res, next){
		var user = new User(req.body);
		if(!user.isValid()){
			Helper.badRequest(res)
			return;
		}
		user.update(function(updateUser){
			res.json(user)
			next(updateUser)
		});
	}
}

 module.exports = users;