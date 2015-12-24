//users service tests
var test = require('unit.js');
var UserService = require('../../service/users.js');
var User = require('../../model/user.js');
var aggregation = 0;
var totalTests = 2;
//set dummy req/res objects TODO FIND AN ACTUAL MOCKING FRAMEWORK
var req = {};
//mock up the res object's json method
var res = {json : function(data){
	res.test = JSON.stringify(data)
}};
//first test getAll
UserService.getAll(req, res, function(){
	test.assert(res.test !== '' && res.test !== null)
	aggregation++;
});
//next test happy path getByName
//reset dummy req/res objects
var req = {};
//mock up the res object's json method
var res = {json : function(data){
	res.test = JSON.stringify(data)
}};
//set body
req.body = {userName : "unit_test_user72729"}
UserService.getByName(req, res, function(){
	//double check this
	test.assert(res.test !== '' && res.test !== null && res.test != '{}')
	aggregation++;
	console.log(aggregation + " passed out of " + totalTests);
	//can we cleanup from here?
	new User().cleanUp()
})
