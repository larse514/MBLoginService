var express = require('express')
var app = express()
var d = require('domain').create()




app.get('/exception', function(req, res){
	d.on('error', function(err){
		// the asynchronous or synchronous code that we want to catch thrown errors on
		console.log('test');
		console.log(err);
		res.send("Exception");
	})

	d.run(function(){
		var err = new Error('example')
		throw err		
		res.send('pass')
	})
});
	



app.listen(process.env.PORT || 8080)
