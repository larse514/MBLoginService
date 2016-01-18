var express = require('express');
var router = express.Router();

var auth = require('../service/auth.js');
//var products = require('../service/products.js');
var user = require('../service/users.js');

/*
 * Routes that do not require Authorization
 */
router.post('/login', auth.login);
router.post('/signUp', user.create);
router.get('/areAToaster', function(req, res){require('../util/responseObjectHelper.js').iamateapot(res)});

/*
 * Routes that can be hit by authenticated users
 */
router.post('/api/v1/helloworld', function(req, res){res.json('HelloWorld')});

 /*
 * Routes that can be hit by authenticated and 
 * authorized users
 */
 
 module.exports = router;