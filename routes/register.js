var express = require('express');
var router = express.Router();
var URL = require('../schema/schema').URL;
var Counter = require('../schema/schema').Counter;

const validShortUrlChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

// ShortUrls are base 62.
// a-zA-Z0-9 == 62 unique digits.
const SHORT_URL_BASE = 62;
const SHORT_URL_DIGITS = 6;

router.post('/', function(req, res, next) {
    var url = req.body.url;

    URL.findOne({'longUrl': url}, function(err, response) {
        if(response === null) {
            console.log(err);

            Counter.findOneAndUpdate({'_id': 'url_id'}, {$inc: {'count': 1}}, function (err, response) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log(response);

                var generatedShortUrl = generateShortUrlFromId(response.count);
                new URL({id: response.count, longUrl:url, shortUrl: generatedShortUrl}).save();
                res.render('register', {title:'Register', shortUrl: generatedShortUrl});
            });

        } else {
            res.render('register', {title:'Register', shortUrl: response.shortUrl});
        }

        console.log(response);
    });

});

function generateShortUrlFromId(id) {
    var value = id.toString().split('').reverse().reduce(function (remainder, digit, index) {
        return remainder += validShortUrlChars.indexOf(digit) * Math.pow(SHORT_URL_BASE, index);
    }, 0);
    console.log("Value: " + value + " for id: %d", id);

    var shortURL = "";
    while(value > 0) {
        shortURL += validShortUrlChars[value % SHORT_URL_BASE];
        value = (value - value % SHORT_URL_BASE)/ SHORT_URL_BASE;
    }
    console.log("Pre-adjusted ShortUrl: " + shortURL);

    while(shortURL.length < 6) {
        shortURL = '0' + shortURL;
    }

    console.log("Final generated ShortUrl: " + shortURL);
    return shortURL;
}

module.exports = router;