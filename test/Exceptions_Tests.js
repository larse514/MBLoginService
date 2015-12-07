var d = require('domain').create()


d.on('error', function(err){
    // handle the error safely
	console.log('here?');
    console.log(err)
})

d.run(function(){
    // the asynchronous or synchronous code that we want to catch thrown errors on
    var err = new Error('example')
    throw err
})


