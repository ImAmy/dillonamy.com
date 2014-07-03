/**
 * Module dependencies.
 */

var router   = require('express').Router(),
    mongoose = require('mongoose');

var Locations = mongoose.model('Location'),
    Events    = mongoose.model('Event');

router.get('/', function(req, res) {
  var guest, locations, events
      callback = function() {
        if (locations && events) {
          res.render('wedding/index', {
            guest: guest,
            locations: locations,
            events: events
          });
        }
      };

  switch (req.cookies['wedding.access']) {
    case 'party':
      guest = 'Party Guest';
      break;
    case 'vip':
      guest = 'V.I.P Guest';
      break;
    default:
      return res.status(403).render('wedding/403');
  }

  Locations.list({}, function(err, data) {
    if (err)
      return res.render('error/500');

    locations = data;
    callback();
  });

  Events.list({}, function(err, data) {
    if (err)
      return res.render('error/500');

    events = data;
    callback();
  });
});

router.get('/logout', function(req, res) {
  res.clearCookie('wedding.access');
  res.redirect('/wedding');
});

module.exports = router;
