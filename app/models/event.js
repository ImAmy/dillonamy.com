/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * Event Schema.
 */

var EventSchema = new Schema({
  'name':     { type: String, required: true },
  'date':     { type: Date,   required: true },
  'location': { type: String, required: false }
});

/**
 * Virtuals.
 */

EventSchema.virtual('time')
  .get(function() {
    return this.date.toLocaleTimeString('nu', 'UTC');
  });

/**
 * Statics.
 */

EventSchema.statics.list = function(options, cb) {
  var query = options.query || {};

  this.find(query)
     .sort({ date: 1 })
    .exec(cb);
};

mongoose.model('Event', EventSchema, 'schedule');
