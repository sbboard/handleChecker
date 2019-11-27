var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

T.get('users/lookup', { screen_name: 'buffum' },  function (err, data, response) {
    if(data.hasOwnProperty('errors') && data.errors[0].code == 17){
        console.log("doesn't exist")
    }
    else{
        console.log(data)
    }
})