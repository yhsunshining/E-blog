
module.exports = function(app) {
	app.use('/', require('./root'));
	app.use('/TEST', require('./test'));
	app.use('/reg', require('./reg'));
	app.use('/login', require('./login'));
	app.use('/logout', require('./logout'));
	app.use('/post', require('./post'));
	app.use('/upload', require('./upload'));
};

