//mUser test
var User = require('../../model/mUser.js');
var test = require('unit.js');
var aggregation = 0;
var totalTests = 2;

//verify stuff
test.assert(User !== undefined)
aggregation++
//add user
var chris = new User({
	userName: 'Chris',
	password: 'password' 
});

chris.save(function(err) {
	if (err) throw err;
	User.db.close()
});
aggregation++

console.log(aggregation + " passed out of " + totalTests);
