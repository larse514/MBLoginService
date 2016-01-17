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

/*
 * Routes that can be hit by authenticated users
 */
router.post('/api/v1/helloworld', function(req, res){console.log('hw')});

 /*
 * Routes that can be hit by authenticated and 
 * authorized users
 */
 
 module.exports = router;