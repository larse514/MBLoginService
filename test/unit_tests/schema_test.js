//schema tests
var schema = require('../../model/schema/schema.js');
var test = require('unit.js');
var aggregation = 0;
var totalTests = 4;

//confirm user is there
test.assert(schema.user !== undefined);
aggregation++
test.assert(schema.user.userName !== undefined);
aggregation++
test.assert(schema.user.password !== undefined);
aggregation++
test.assert(schema.user.createdTime !== undefined)
aggregation++

console.log(aggregation + " passed out of " + totalTests);
