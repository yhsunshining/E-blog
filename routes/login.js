var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
router.get('/', function(req, res) {
	res.render('login',{title:"login"});
});

module.exports = router;