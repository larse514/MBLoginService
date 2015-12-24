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
User.findById = function (id, callback){

}

User.prototype.save = function (callback){
	var newUser = new mUser(this.data);
	newUser.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully!');
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
	console.log(data)
	data = data || {};
	//grab user schema
	schema = schemas.user
	console.log(schema)
	//so let's see...
	//these are using lodash functions (more info found here: https://lodash.com/)
	//_.defaults will add any variables, from schema, that data doesn't contain
	//_.keys gets all the keys from schema and _.pick only keeps these values
	return _.pick(_.defaults(data, schema), _.keys(schema));
}


module.exports = User;