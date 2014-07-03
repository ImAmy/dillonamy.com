/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * Location Schema.
 */

var LocationSchema = new Schema({
  'name':    { type: String, required: true },
  'address': {
    'street':      { type: String, required: true },
    'postal-code': { type: String, required: true },
    'city':        { type: String, required: true }
  },
  'phone':   { type: String, required: false },
  'email':   { type: String, required: false },
  'website': { type: String, required: false }
});

/**
 * Statics.
 */

LocationSchema.statics.list = function(options, cb) {
  var query = options.query || {};

  this.find(query)
    .exec(cb);
};

mongoose.model('Location', LocationSchema, 'locations');
