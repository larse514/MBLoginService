//dependencies
var schema = require('./schema/schema.js');
var _ = require('lodash');

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
	db.get('users', {id:id}).run( function (err, data){
		if(err) return callback(err);
		callback(null, new User(data));
	});
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