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
/*
app.get('/helloworld', function (req, res){
	console.log('helloWorld');
	res.statusCode = 200;
	res.send('helloworld')
});

app.get('/login', function(req, res){
	console.log('login');
	//Get credentials from...i wanna say the headers
	var credentials = auth(req);
	//make sure we have credentials
	if(credentials === undefined){
		res.statusCode = 400
		res.send('Bad Request')
	}

});
*/
//start the server
app.listen(process.env.PORT || 8080);
