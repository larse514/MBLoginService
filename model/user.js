//Define "constructor"
var User = function(data){
	this.data = data;
}

User.prototype.data = {}
//Define generic setter and getter
User.prototype.set = function (name, value) {
	this.data[name] = value;
}

User.prototype.get = function (name){
	return this.data[name];
}

User.findById = function (id, callback){
	db.get('users', {id:id}).run( function (err, data){
		if(err) return callback(err);
		callback(null, new User(data));
	});
}

module.exports = User;