var model = require('../model/User');
/*
 * Factory class to build user 
 */
function buildUser(name, pass, uid){
	//create a new user object
	var user = model.User.create();	
	//set user and pass
	user.name(name);
	user.pass(pass);
	//if uid was provided set it
	if(uid){
		user.UID(uid)
	}
	//otherwise generate one
	else {
		user.UID(Math.floor((Math.random() * 10) + 1));
	}
	//return user
	return user;
}


module.exports = {
	buildUser : buildUser
}