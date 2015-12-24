//responseObjectHelper tests
var test = require('unit.js');
var helper = require('../../util/responseObjectHelper.js');
var aggregation = 0;
var totalTests = 2;
//first mock up the methods
var res = {
	status : function(code){
		this.code = code
	},
	json : function(object){
		this.body = {
			"status":object.status,
			"message":object.message
		}
	}
}
//bad request
helper.badRequest(res)
test.assert(res.code == 400)
test.assert(res.body.status == 400)
test.assert(res.body.message == "Bad Request")
aggregation++;
//unauthorized
helper.unauthorized(res)
test.assert(res.code == 401)
test.assert(res.body.status == 401)
test.assert(res.body.message == "Invalid Credentials")
aggregation++
console.log(aggregation + " passed out of " + totalTests);
