var repo = require('./repository/repo');
var userFactory = require('./factory/UserFactory');

function login(credentials){
	console.log('ere');
	var user = userFactory.buildUser(credentials.name, credentials.pass, 6);
	console.log(user);
	if(user.errors.length == 0){
		var repoUser = repo.getUser(user);
		console.log('repoUser');
		console.log(repoUser);
		console.log(user.pass());
		console.log(repoUser.pass);
		if(user.pass() == repoUser.pass){
			return repoUser;
		}
		else {
			return new Error("unauthorized");
		}
	}
	else{
		return user.errors;
	}
}


function signUp(credentials){
	console.log('signUp');
	var user = userFactory.buildUser(credentials.name, credentials.pass);
	console.log('user: ');
	console.log(user);
	console.log(user.errors.length);
	console.log(user.errors);
	if(user.errors.length == 0){
		console.log('is valid');
		 if(repo.storeCredentials(user)){
			return new Error("Failed");
		 }
	}
	else{
		return user.errors;
	}
}

module.exports = {
	login : login,
	signUp : signUp
}