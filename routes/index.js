var express = require('express');
var router = express.Router();

var auth = require('../service/auth.js');
//var products = require('../service/products.js');
var user = require('../service/users.js');

/*
 * Routes that do not require Authorization
 */
router.post('/login', auth.login);
router.post('/helloworld', auth.login);

/*
 * Routes that can be hit by authenticated users
 */
 
 /*
 * Routes that can be hit by authenticated and 
 * authorized users
 */
 
 module.exports = router;