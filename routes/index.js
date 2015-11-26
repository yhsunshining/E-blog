var express = require('express');
var router = express.Router();

module.exports = function(app) {
	app.use('/',require('./root'));
	app.use('/TEST',require('./test'));
};

