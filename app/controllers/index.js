var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('index/index');
});

router.get('/partyguest', function(req, res) {
  res.cookie('wedding.access', 'party', { maxAge: 31536000000 });
  res.redirect('/wedding');
});

router.get('/vipguest', function(req, res) {
  res.cookie('wedding.access', 'vip', { maxAge: 31536000000 });
  res.redirect('/wedding');
});

module.exports = router;
