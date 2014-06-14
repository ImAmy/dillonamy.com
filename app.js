/**
 * Module dependencies.
 */

var express = require('express'),
    path = require('path'),
    //favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

/**
 * Express app.
 */

var app = express(),
    config = require('./config/config')[app.get('env')];

// express setup
app.set('port', config.port);
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'hjs');

// middlewares
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(oldexpress.methodOverride());
app.use(cookieParser());
//app.use(oldexpress.session());

// bootstrap routes
require('./config/routes')(app);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if ('production' === app.get('env')) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/' + res.statusCode, {
      message: err.message,
      error: {}
    });
  });
} else {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/' + res.statusCode, {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
