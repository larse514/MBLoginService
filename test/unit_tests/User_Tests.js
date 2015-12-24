//User.js tests
var User = require('../../model/user.js');
var test = require('unit.js');
var aggregation = 0;
var totalTests = 5;
//constructor test

var user = new User({name:'test'});
test.assert(user.data.name === 'test');
aggregation++;

//setter test
var user1 = new User({name:'test1'});
test.assert(user1.data.name === 'test1');
//now set the name
user1.set('name', 'test2');
test.assert(user1.data.name === 'test2');
aggregation++
//getter test
var user1 = new User({name:'test1'});
test.assert(user1.get('name') === 'test1');
aggregation++

//sanitize test
var badData = {badObject:"test"}
//First try to use the sanitize method on its own
var shouldBeNull = new User().sanitize(badData);
test.assert(shouldBeNull.badObject !== 'test');
aggregation++

//db save test
//first create a new user
var user = new User({name:"unit_test_user", password:"apassword"})
test.assert(user.data.name === "unit_test_user")
test.assert(user.data.password === "apassword")
//okay our object is good, now let's try and save it
user.save(function(){user.cleanUp();})
aggregation++

console.log(aggregation + " passed out of " + totalTests);