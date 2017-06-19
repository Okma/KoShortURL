var express = require('express');
var router = express.Router();
var URL = require('../schema/schema').URL;

router.post('/', function(req, res, next) {
    var url = req.body.url;

    URL.findOne({'longUrl': url}, function(err, response) {
        if(err) {
            console.log(err);
        }

        console.log(response);
        console.log('test');
    });

    res.send(url);
});

module.exports = router;

