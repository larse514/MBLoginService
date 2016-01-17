//users.js
var User = require('../model/user.js');
var Helper = require('../util/responseObjectHelper.js');

var users = {
	getAll: function(req, res){
		new User().findAll(function(user){
			res.json(user);
			//next()
		})
	},
	getByName: function(req, res){
		var user = new User(req.body);
		//since this is a get by name need to make sure userName is set correctly
		if(user.get('userName') == null){
			Helper.badRequest(res);
			return;
		}
		user.findByUserName(user.get('userName'), function(user){
			res.json(user);
		})
	},
	create: function(req, res){
		console.log("create request received with the userName " + req.body.userName);
		var user = new User(req.body);
		//need to make sure 
		if(!user.isValid()){
			console.log("invalid user parameters");
			Helper.badRequest(res);
			return;
		}
		//if the user is valid then save it
		user.save(function(user){
			console.log("Successfully created user" + user.userName)
			Helper.ok(res)
			console.log(res.body)
		});
	},
	update: function(req, res){
		var user = new User(req.body);
		if(!user.isValid()){
			Helper.badRequest(res)
			return;
		}
		user.update(function(updateUser){
			res.json(user)
		});
	}
};

 module.exports = users;