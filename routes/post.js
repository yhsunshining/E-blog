var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var loginStatus = require('../models/loginStatus.js');

router.get('/', loginStatus.checkLogin);
router.get('/', function(req, res, next) {
	res.render('post', {
		title: 'post',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/', loginStatus.checkLogin);
router.post('/', function(req, res, next) {
	var user = req.session.user;
	var post = new Post({
		author: user.name,
		author_id:user._id,
		title: req.body.title,
		content: req.body.content
	});

	post.save(function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		req.flash('success', '发布成功!');
//		res.send("{code:1}")
		res.redirect('/'); 
	});
});

module.exports = router;