var express = require('express');
var app = express();
var auth = require('basic-auth')


app.get('/helloworld', function (req, res){
	console.log('helloWorld');
	res.statusCode = 200;
	res.send('helloworld')
});

app.listen(process.env.PORT || 8080);
