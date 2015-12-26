var express = require('express');
var router = express.Router();
var loginStatus = require('../models/loginStatus');
var Post = require('../models/post.js');
/* GET users listing. */
//router.get('/',loginStatus.checkLogin);
router.get('/', function(req, res) {
	Post.get({}, function(err, posts) {
		if (err) {
			posts = [];
		}
		for (var i=0,len = posts.length;i<len;i++){
			var date = new Date(posts[i].time);
			posts[i].time = date.format('yyyy-MM-dd');
		}
		res.render('index', {
			title: 'Express',
			user: req.session.user,
			posts: posts,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});


module.exports = router;