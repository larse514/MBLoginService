//JSON response objects
var badRequest = function(res) {
	res.status(400);
	res.json({
		"status":400,
		"message":"Bad Request"
	});
}

var unauthorized = function (res){
	res.status(401);
	res.json({
		"status":401,
		"message":"Invalid Credentials"
	});
}

module.exports = {
	badRequest : badRequest,
	unauthorized : unauthorized
}