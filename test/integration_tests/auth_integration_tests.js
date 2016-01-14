/**
 * Created by Andrew on 1/11/2016.
 * integration test

 *TODO UNDERSTAND HOW TO USE UNIT.JS BETTER, FOR NOW I WILL NEST ALL TESTS
 *WITHIN THEIR CALLBACKS
 */
var test = require('unit.js');
var AuthenticationService = require('../../service/auth.js');
var User = require('../../model/user.js');
var aggregation = 0;
var totalTests = 3;

//set dummy req/res objects TODO FIND AN ACTUAL MOCKING FRAMEWORK
var req = {};
//mock up the res object's json method
req.body = {userName:"Chris", password:"password"};

var res = {
    json: function (data) {
        res.test = JSON.stringify(data)
    },
    status: function (data) {
        res.stat = data
    }
};
//first test getAll
AuthenticationService.login(req, res, function() {
    test.assert(JSON.parse(res.test).token);
    aggregation++;
    //reset variables
    resetVariables(req, res);
    req.body = {userName: "NOTHERE", password: "password"};
    AuthenticationService.login(req, res, function () {
        test.assert(JSON.parse(res.test).status == 401);
        aggregation++;
        resetVariables(req, res);
        req.body = {userName: "Chris", password: "incorrectpassword"};
        AuthenticationService.login(req, res, function () {
            test.assert(JSON.parse(res.test).status == 401);
            aggregation++;
            console.log(aggregation + " passed out of " + totalTests);
            new User().cleanUp();
        });
    });
});

var resetVariables = function(req, res){
    req = {};
//mock up the res object's json method
    res = {
        json: function (data) {
            res.test = JSON.stringify(data)
        },
        status: function (data) {
            res.stat = data
        }
    };
};