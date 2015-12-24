//users.js
var User = require('../model/user.js');

var users = {
	getAll: function(req, res, next){
		new User().findAll(function(user){
			res.json(user)
			next()
		})
	},
	getByName: function(req, res, next){
		var user = new User(req.body);
		if(!user){
			res.status(400);
			res.json({
				"status":400,
				"message":"Bad Request"
			});
			return;
		}
		new User().findByUserName(userName, function(user){
			res.json(user)
			next()
		})
	},
}

 module.exports = users;