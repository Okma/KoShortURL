var jsonfile = require('jsonfile');
var mongoose = require('mongoose');
mongoose.set('debug', true);

// Read DB connection info from JSON config.
jsonfile.readFile("database-connect.json", function(err, obj) {
    if(err !== null) {
        mongoose.connect(obj.connectionURI);
    }
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
