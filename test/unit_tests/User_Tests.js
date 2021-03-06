//User.js tests
/*
 * TODO REFACTOR THESE INTO ACTUAL UNIT TESTS
 */
var User = require('../../model/user.js');
var test = require('unit.js');
var aggregation = 0;
var totalTests = 8;
var rand =  Math.floor((Math.random() * 100000) + 1);

//constructor test
var user = new User({userName:'test'});
test.assert(user.data.userName === 'test');
aggregation++;

//setter test
var user1 = new User({userName:'test1'});
test.assert(user1.data.userName === 'test1');
//now set the userName
user1.set('userName', 'test2');
test.assert(user1.data.userName === 'test2');
aggregation++
//getter test
var user1 = new User({userName:'test1'});
test.assert(user1.get('userName') === 'test1');
aggregation++

//sanitize test
var badData = {badObject:"test"}
//First try to use the sanitize method on its own
var shouldBeNull = new User().sanitize(badData);
test.assert(shouldBeNull.badObject !== 'test');
aggregation++
//db save test
//first create a new user
var aUser = "unit_test_user"+rand;
var user = new User({userName:aUser, password:"apassword"})
test.assert(user.data.userName === aUser)
test.assert(user.data.password === "apassword")
//okay our object is good, now let's try and save it
user.save(function(){});
aggregation++
//findById
new User().findById("56931adeb2dc7fa411359ba9", function(err, user){
	test.assert(user !== null)
	aggregation++
	//find all
	new User().findAll(function(err, users){
		///if it's null fail the test
		test.assert(users !== null)
		aggregation++
		//Update
		//Hard coded for now...
		var user = {
		"_id" : "56931adeb2dc7fa411359ba9",
		"userName" : "integration_test_38179" + 'UPDATE' + rand,
		"password" : "anustart"
		}
		new User(user).update(function(user){
			///if it's null fail the test
			test.assert(user !== null)
			aggregation++
			console.log(aggregation + " passed out of " + totalTests);
			new User().cleanUp();
		})
	});
});


