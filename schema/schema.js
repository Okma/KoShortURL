var jsonfile = require('jsonfile');
var mongoose = require('mongoose');
mongoose.set('debug', true);

// Read DB connection info from JSON config.
jsonfile.readFile("database-connect.json", function(err, obj) {
    if(err) {
        console.log(err);
        return;
    }

    console.log(obj);
    mongoose.connect(obj.connectionURI, function(err) {
        if(err) {
            console.log(err);
        }
    });
});

var Counter = mongoose.model('Counter', new mongoose.Schema({
    _id: String,
    count: Number
}));

var URL = mongoose.model('Url', new mongoose.Schema({
    id: Number,
    shortUrl: String,
    longUrl: String
}));

module.exports = {
    mongoose: mongoose,
    URL: URL,
    Counter: Counter
};
