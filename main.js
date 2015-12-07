var express = require('express');
var app = express();
var auth = require('basic-auth')
var service = require('./service/SignupService');

app.get('/login', function(req, res){
	//Get creds from browser
	var credentials = auth(req);
	console.log(credentials);
	//Check creds
	if(credentials !== undefined){
		//if one of the creds wasn't provided return bad request
		if(credentials.pass === undefined || credentials.name === undefined){
			res.statusCode = 400
			res.send('Bad Request')
		}else {
			console.log('ererer');
			//Creds are provided so let's try and login
			var result = service.login(credentials);
			console.log(result);
			console.log("those were errosr")
			console.log(result.length)
			//If the result is type error then 
			//there was an issue with the processing
			//return unauthorized
			if(result instanceof Error){
				//get code and build response
				res.statusCode = 401
				res.setHeader('WWW-Authenticate', 'Basic realm="example"')
				res.end('Access denied')
			}
			else {
				//otherwise we found the user, return
				//login session
				res.statusCode = 200;
				res.send("Success!")
			}
			
		}
	}
	else {
		//If no creds, return unauthorized
		res.statusCode = 401
		res.setHeader('WWW-Authenticate', 'Basic realm="example"')
		res.end('Access denied')
	}
});

app.get('/signUp', function(req, res){
	var credentials = auth(req);
	console.log(credentials);
	if(credentials !== undefined){
		if(credentials.pass === undefined || credentials.name === undefined){
			res.statusCode = 400
			res.send('Bad Request')
		}else {
			console.log('ererer');
			var result = service.signUp(credentials);
			console.log(result);
			if(result instanceof Error ){
				//get code and build response
				res.statusCode = 401
				res.setHeader('WWW-Authenticate', 'Basic realm="example"')
				res.end('Access denied')
			}
			else {
				res.statusCode = 200;
				res.send("Success!")
			}
			
		}
	}
	else {
		res.statusCode = 401
		res.setHeader('WWW-Authenticate', 'Basic realm="example"')
		res.end('Access denied')
	}
});

app.listen(process.env.PORT || 8080);
