//schema tests
var schema = require('../../model/schema/schema.js');
var test = require('unit.js');
var aggregation = 0;
var totalTests = 1;

//confirm user is there
test.assert(schema.user !== undefined);
aggregation++

console.log(aggregation + " passed out of " + totalTests);
