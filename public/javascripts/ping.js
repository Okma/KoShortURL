var http = require('http');
const timeoutMilliseconds = 2500;

var Ping = function(target, callback, errorCallback) {
    var request = http.request({host: target}, function (response) {
        response.on('end', function() {
            onComplete();
        });
    });

    request.on('error', function(err) {
        onError();
    });

    var onComplete = function() {
        clearTimeout(timer);
        if(callback && typeof callback === "function") {
            callback(new Date() - timeStamp);
        }
    };

    var onError = function() {
        request.abort();
        if(errorCallback && typeof errorCallback === "function") {
            errorCallback();
        }
    };
    var timer = setTimeout(onError, timeoutMilliseconds);
    var timeStamp = new Date();
    request.end();
};

module.exports = Ping;
