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

//db methods
User.prototype.findById = function (id, callback){
	mUser.findById(id, function(err, user) {
		if (err) throw err;
		// show the one user
		callback(err, user)
	});
}
User.prototype.findAll = function(callback){
	// get all the users
	mUser.find({}, function(err, users) {
		if (err) throw err;
		// object of all the users
		callback(err, users)
	});
}
User.prototype.findByUserName = function(name, callback){
	// get all the users
	mUser.find({userName : name}, function(err, user) {
		if (err) throw err;
		// object of all the users
		callback(user)
	});
}
User.prototype.save = function (callback){
	var newUser = new mUser(this.data);
	newUser.save(function(err) {
		if (err) throw err;
		callback();

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


module.exports = User;