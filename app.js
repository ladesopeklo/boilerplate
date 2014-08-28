/* global require, process*/
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');


var app = express();

// all environments
app.set('port', process.env.PORT || 2000);

app.use(logger('dev'));
app.use(bodyParser());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(require('method-override')())

app.use(express.static(path.join(__dirname, 'client')));


// development only
if ('development' === app.get('env')) {
	app.use(errorHandler());
}

app.get('/api/get/:id', routes.get);
app.post('/api/post/:id', routes.get);
app.get('/api', routes.index);

http.createServer(app).listen(app.get('port'), function () {
	console.log(path.join(__dirname, '../client'));
	console.log('Express server listening on port ' + app.get('port'));
});
