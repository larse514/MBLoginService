//user integration test
/*
 *TODO UNDERSTAND HOW TO USE UNIT.JS BETTER, FOR NOW I WILL NEST ALL TESTS
 *WITHIN THEIR CALLBACKS
 */
var User = require('../../model/user.js');
var test = require('unit.js');
var aggregation = 0;
var totalTests = 1;
var rand =  Math.floor((Math.random() * 100000) + 1);
//db save and get test
//first create a new user
var userName = "unit_test_user" + rand;
var apass = "apassword";
var user = new User({userName:userName, password:apass})
test.assert(user.data.userName === userName)
test.assert(user.data.password === apass)
//okay our object is good, now let's try and save it
user.save(function(){
	//after saving try and grab it
	new User().findByUserName(userName, function(err, user){
		if(user!== null){
			aggregation++
		} else {
			console.log("failed findByUserName");
		}
		console.log(aggregation + " passed out of " + totalTests);
		//keep track of this and cleanup at the end
		new User().cleanUp();
	});
})
//now lets find it

