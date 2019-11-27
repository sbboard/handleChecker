var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

//checks to see if account has tweeted
T.get('search/tweets', { screen_name: 'buffum' }, function(err, data, response) {
    console.log(data)
})

//checks to see if account has any followers
T.get('followers/ids', { screen_name: 'buffum' },  function (err, data, response) {
    console.log(data)
})

//checks to see if account is following anyone
T.get('following/ids', { screen_name: 'buffum' },  function (err, data, response) {
    console.log(data)
})