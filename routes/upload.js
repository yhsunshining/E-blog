var express = require('express');
var router = express.Router();
var loginStatus = require('../models/loginStatus.js');

router.get('/', loginStatus.checkLogin);
router.get('/', function(req, res, next) {
	res.render('upload', {
		title: "upload",
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});
router.post('/', loginStatus.checkLogin);
router.post('/', function(req, res, next) {
	req.flash('success', '文件上传成功!');
	res.redirect('/upload');
});

module.exports = router;