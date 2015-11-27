"use strict";
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

router.get('/', function(req, res) {
	res.render('reg',{title:"reg"})
});

router.post('/', function(req, res, next) {
	console.log(req.body)
	var name = req.body.username,
		password = req.body.password,
		repassword = req.body['password-repeat'];
	if(repassword!=password){
		req.flash('error',"psw not eaque");
		return res.redirect('/reg');
	}
	var  md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('hex');
	var userObj = new User({
		name:name,
		password:password
	});
	
	User.get(userObj.name,function(err,user){
		if(err){
			req.flash('error',err);
			return res.redirect('/');
		}
		if(user){
			req.flash('error','user exist');
			return res.redirect('/');
		}
		userObj.save(function(err,user){
			if(err){
				req.flash('error',err);
				return res.redirect('/reg');
			}
			req.session.user = user;
			req.flash('success','reg success');
			res.redirect('/');
		})
	})
});

module.exports = router;
