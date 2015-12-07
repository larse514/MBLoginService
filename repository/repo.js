//var fs = require('fs');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/*
 * Repository class for Users, currently pulls from file
 */
 
/*
 * Method to store User credentials 
 */
function storeCredentials(user){
	console.log(user);
	//convert the user to json
	var jsonUser = user//.toJSON();
	
	getMongoConnection(insertUser, jsonUser);
	
	/*MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertUser(db, jsonUser, function() {
		  db.close();
	  });
	});
	*/
	//now right the User to the file
	
}
/*
 * Method to retriever user from repo
 */
function getUser(){
		//Get repo connection
		var connection = getConnection();
		//grab user and return
		var user = JSON.parse(connection.responseText);
		
		console.log(user);
		return user;
}


var insertUser = function(db, user, callback) {
	db.collection('user').insertOne( user, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};


function getMongoConnection(callback, json){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  callback(db, json, function() {
		  db.close();
	  });
	});
}

module.exports = {
	storeCredentials : storeCredentials,
	getUser : getUser
}