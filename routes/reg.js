var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

router.get('/', function(req, res) {
	res.render('reg',{title:"reg"})
});

router.post('/', function(req, res, next) {
	console.log(req.body)
	var name = req.body.name,
		password = req.body.password,
		repassword = req.body['password-repeat'];
	if(repassword!=password){
		req.flash('error',"psw not eaque");
		return res.redirect('/reg');
	}
	
	res.redirect('/');
});

module.exports = router;
