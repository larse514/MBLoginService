// grab the things we need
//TODO-Refactor into a repository class since mUser doesn't make sense
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/User_unit_test');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  userName: String,
  password: { type: String, required: true },
  createdTime : Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;