//JSON response objects
var constants = require('./constants.js')
var badRequest = function(res) {
	res.status(constants.BAD_REQUEST.code);
	res.json({
		"status":constants.BAD_REQUEST.code,
		"message":constants.BAD_REQUEST.message
	});
}

var unauthorized = function (res){
	res.status(constants.UNAUTHORIZED.code);
	res.json({
		"status":constants.UNAUTHORIZED.code,
		"message":constants.UNAUTHORIZED.message
	});
}

module.exports = {
	badRequest : badRequest,
	unauthorized : unauthorized
}