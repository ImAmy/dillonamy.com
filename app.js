/**
 * Module dependencies.
 */

var express      = require('express'),
    mongoose     = require('mongoose'),
    path         = require('path'),
    fs           = require('fs'),
    //favicon    = require('serve-favicon'),
    logger       = require('morgan'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser');

/**
 * Express app.
 */

var app = express(),
    config = require('./config/config')[app.get('env')];

// mongoose db connection
function connect() {
  mongoose.connect(config.db, {
    server: { socketOptions: { keepAlive: 1 } }
  });
}
connect();
mongoose.connection.on('error', function(err) {
  console.error('Mongoose error: ', err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected... reconnecting!');
  connect();
});

// bootstrap models
var models = path.join(__dirname, 'app', 'models');
fs.readdirSync(models).forEach(function(file) {
  if (~file.indexOf('.js'))
    require(path.join(models, file));
});

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
