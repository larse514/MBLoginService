// grab the things we need
//TODO-Refactor into a repository class since mUser doesn't make sense
var mongoose = require('mongoose');
//set default db values
var db_name = 'User_unit_test';
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//this is openshifts way of accessing environemtn variables
//This will probably have to be set ya dingus
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);
var Schema = mongoose.Schema;

// create a schema
//todo-get rid of this unless mongoose supports imgaes and mongo geolocation
var userSchema = new Schema({
  userName: String,
  password: { type: String, required: true },
  createdTime : Date,
	firstName: String,
	lastName: String,
	emailAddress: String, 
	gender:String,
	country:String,
	location:String,
	picture:String,

});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;