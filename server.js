var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function(req, res, next){
	//Headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	//set custom headers
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
	if(req.method == 'OPTIONS'){
		res.status(200).end();
	} else {
		next();
	}
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed

app.all('/api/v1/*', [require('./middleware/validateRequest')]);

app.use('/', require('./routes'));

//if no route is matched by now, it must be a 404
app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//start the server
//app.listen(process.env.PORT || 8080);
// Start the server
/*app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});
*/
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
	console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});

