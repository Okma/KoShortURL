var express = require('express');
var router = express.Router();
var mongoose = require('../app').mongoose;

router.get('/:shortUrl', function(req, res, next) {



  var shortUrl = req.param('shortUrl');
  mongoose.connect();


  window.open(res.body.url);
});

module.exports = router;
