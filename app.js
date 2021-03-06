var express = require('express');
var partials = require('express-partials');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var datePrototype = require('./utils/date');
var multer = require('multer')

var app = express();
app.use(partials());
	//set session
app.use(session({
	secret: settings.cookieSecret,
	key: settings.db,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	},
	store: new MongoStore({
		db: settings.db,
		host: settings.host,
		port: settings.port
	})
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use flash
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
	dest: './public/uploads/',
	rename: function(fieldname, filename) {
		return filename;
	}
}));

routes(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});



module.exports = app;