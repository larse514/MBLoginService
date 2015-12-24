var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');

/*
 * Routes that do not require Authorization
 */
router.post('/login', auth.login);

/*
 * Routes that can be hit by authenticated users
 */
 
 /*
 * Routes that can be hit by authenticated and 
 * authorized users
 */
 
 module.exports = router;