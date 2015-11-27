
module.exports = function(app) {
	app.use('/', require('./root'));
	app.use('/TEST', require('./test'));
	app.use('/reg', require('./reg'));
	app.use('/login', require('./login'));
	app.use('/logout', require('./logout'));
};

