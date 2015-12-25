//dependencies
var schemas = require('./schema/schema.js');
var _ = require('lodash');
var mUser = require('./mUser.js')

//Define "constructor"
var User = function(data){
	this.data = this.sanitize(data);
}
//define data for easy saving into backend
User.prototype.data = {}

//Define generic setter and getter
User.prototype.set = function (name, value) {
	this.data[name] = value;
}

User.prototype.get = function (name){
	return this.data[name];
}

//probably refactor these into db class
//db methods
User.prototype.findById = function (id, next){
	mUser.findById(id, function(err, user) {
		if (err) throw err;
		// show the one user
		next(err, user)
	});
}
User.prototype.findAll = function(next){
	// get all the users
	mUser.find({}, function(err, users) {
		if (err) throw err;
		// object of all the users
		next(users)
	});
}
User.prototype.findByUserName = function(name, next){
	// get all the users
	mUser.find({userName : name}, function(err, user) {
		if (err) throw err;
		// object of all the users
		next(user)
	});
}
User.prototype.save = function (next){
	var newUser = new mUser(this.data);
	newUser.save(function(err) {
		if (err) throw err;
		next();
	});
}
User.prototype.update = function(next){
	mUser.findByIdAndUpdate(this.data._id, this.data,{new: true}, function(err, user){
		if (err) throw err;
		// we have the updated user returned to us
		next(user)
	});
}
//Method for testing to close connection
//TODO-Don't like this approach, should consider
//other methods
User.prototype.cleanUp = function(){
	mUser.db.close();
}

//helper methods
User.prototype.sanitize = function (data){
	//if data is invalid set to empty object so we don't pull 
	//bad errors, seems smrt
	data = data || {};
	//grab user schema
	schema = schemas.user
	//so let's see...
	//these are using lodash functions (more info found here: https://lodash.com/)
	//_.defaults will add any variables, from schema, that data doesn't contain
	//_.keys gets all the keys from schema and _.pick only keeps these values
	return _.pick(_.defaults(data, schema), _.keys(schema));
}
User.prototype.isValid = function(){
	return _.filter(this.data, function(n){return !_.isNull(n)}).length > 0 ? true : false
}


module.exports = User;