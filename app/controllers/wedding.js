/**
 * Module dependencies.
 */

var router   = require('express').Router();

router.get('/', function(req, res) {
  var guest, events;

  switch (req.cookies['wedding.access']) {
    case 'party':
      guest = 'Party Guest';
      events = [
        {
          time: '15:30',
          name: 'Deuren Koninkrijkszaal open',
          location: 'Koninkrijkszaal'
        }, {
          time: '16:00',
          name: 'Huwelijkslezing'
        }, {
          time: '19:30',
          name: 'Deuren Partycentrum open',
          location: 'Charisma Partycentrum'
        }, {
          time: '20:00',
          name: 'Eerste dans!'
        }, {
          time: '0:00',
          name: 'Bedankt voor uw bezoek!'
        }
      ];
      break;
    case 'vip':
      guest = 'V.I.P Guest';
      events = [
        {
          time: '13:00',
          name: 'Deuren Partycentrum open',
          location: 'Charisma Partycentrum'
        }, {
          time: '13:30',
          name: 'Het Ja-Woord :)'
        }, {
          time: '15:30',
          name: 'Deuren Koninkrijkszaal open',
          location: 'Koninkrijkszaal'
        }, {
          time: '16:00',
          name: 'Huwelijkslezing'
        }, {
          time: '17:30',
          name: 'Diner en feestelijke afsluiting',
          location: 'Charisma Partycentrum'
        }, {
          time: '20:00',
          name: 'Eerste dans!'
        }, {
          time: '0:00',
          name: 'Bedankt voor uw bezoek!'
        }
      ];
      break;
    default:
      return res.status(403).render('wedding/403');
  }

  res.render('wedding/index', {
    guest: guest,
    events: events
  });
});

router.get('/logout', function(req, res) {
  res.clearCookie('wedding.access');
  res.redirect('/wedding');
});

module.exports = router;
