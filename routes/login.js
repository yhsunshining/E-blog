var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
router.get('/', function(req, res) {
	res.render('login',{
		title:"login",
		user:req.session.user,
		success:req.flash('success').toString(),
		error:req.flash('error').toString()
	});
});
router.post('/', function(req, res) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest("hex");
	User.get(req.body.username,function(err,user){
		if(!user){
			req.flash('error',"user doesn't exist");
			return res.redirect('/login');
		}
		else if(user.password != password){
			req.flash('error',"password error");
			return res.redirect('/login');
		}
		else {
			res.session.user = user;
			req.flash('success','login success');
			res.redirect('/');s
		}
	})
	res.render('login',{title:"login"});
});
module.exports = router;