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
		//this isn't the right way to check
		if(!user){
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
		//something something not the right way
		if(!user){
			Helper.badRequest(res)
			return;
		}
		//if the user is valid then save it
		user.save(next);
	},
	update: function(req, res, next){
		var user = new User(req)
	}
}

 module.exports = users;