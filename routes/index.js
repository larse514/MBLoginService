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
router.get('/api/v1/helloworld', function(req, res){
	var string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
	res.json('HelloWorld: ' + string)
});
 /*
 * Routes that can be hit by authenticated and 
 * authorized users
 */
 
 module.exports = router;