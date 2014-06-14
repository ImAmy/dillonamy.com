/**
 * Controllers.
 */

var index = require('../app/controllers/index');

/**
 * Routes.
 */

module.exports = function(app) {
  // index route
  app.use('/', index);
};
