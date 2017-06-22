var express = require('express');
var router = express.Router();
var Ping = require('../public/javascripts/ping');

/* GET home page. */
router.get('/', function(req, res, next) {

    Ping('rawrg.com', function(response) {
        console.log(response);
    });

  res.render('index', { title: 'KoShortUrl' });
});

function onSubmit() {

  return false;
}

module.exports = router;
