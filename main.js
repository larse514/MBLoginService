var express = require('express');
var app = express();
var auth = require('basic-auth')


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

}

app.listen(process.env.PORT || 8080);
