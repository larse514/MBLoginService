//users service tests
var test = require('unit.js');
var UserService = require('../../service/users.js');
var User = require('../../model/user.js');
var aggregation = 0;
var totalTests = 4;
//set dummy req/res objects TODO FIND AN ACTUAL MOCKING FRAMEWORK
var req = {};
//mock up the res object's json method
var res = {json : function(data){
	res.test = JSON.stringify(data)
}};
//first test getAll
UserService.getAll(req, res, function(){
	test.assert(res.test !== '' && res.test !== null && res.test !== '[]')
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
	test.assert(res.test !== '' && res.test !== null && res.test !== '[]')
	aggregation++;
});

//next test happy path save
//reset dummy req/res objects
var req = {};
//mock up the res object's json method
var res = {json : function(data){
	res.test = JSON.stringify(data)
}};
//set body
var rand =  Math.floor((Math.random() * 100000) + 1);
var userName = "integration_test_" + rand
var password = "anustart";
req.body = {userName : userName, password:password}
UserService.create(req, res, function(){
	//since this is an integration test we can try and find the object we're saving 
	UserService.getByName({body:{userName:userName}}, res, function(){
		//confirm res is set properly, not great
		test.assert(res.test !== '' && res.test !== null && res.test !== '[]')
		aggregation++;
		//now lets update.  We can just pop it off the array since we don't care
		console.log(res)
		var obj = JSON.parse(res.test).pop()
		obj.userName += "UPDATE_" + rand;
		req.body = obj;
		test.assert(obj);
		UserService.update(req, res, function(user){
			test.assert(user != null)
			console.log(user)
			aggregation++;
			console.log(aggregation + " passed out of " + totalTests);
			//can we cleanup from here?
			new User().cleanUp()
		})

	})

})
//next test happy path update
//reset dummy req/res objects
var req = {};
//mock up the res object's json method
var res = {json : function(data){
	res.test = JSON.stringify(data)
}};
//need to get an object

