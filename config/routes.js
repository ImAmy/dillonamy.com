/**
 * Controllers.
 */

var index   = require('../app/controllers/index'),
    wedding = require('../app/controllers/wedding');

/**
 * Routes.
 */

module.exports = function(app) {
  // index route
  app.use('/', index);

  // wedding route
  app.use('/wedding', wedding);
};
