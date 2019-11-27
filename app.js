var Twit = require('twit')

let bigArray = []
const names = ["buffum","seanporter","buffumwad","colinbuffum"]

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

function checkStatus(name){
    return new Promise(resolve => {
        let status = ""
        T.get('users/lookup', { screen_name: name },  function (err, data, response) {
            if(data.hasOwnProperty('errors') && data.errors[0].code == 17){
                status = "FREE"
            }
            else{                
                status = "TAKEN"
            }
            bigArray.push({"name":name,"status":status})
            resolve('resolved')
        })
    })
}

function sendEmail(){
    return new Promise(resolve => {
    console.log(bigArray)
    resolve('resolved')
    })
}

async function runScript(){
    //get buffum status
    //get sean status
    //get controlled negative
    //get controlled positive
    //send email
    for(let i = 0; i < names.length; i++){
        await checkStatus(names[i])
    }
    await sendEmail()
}

runScript()

setInterval(function(){
    runScript()
  }, 24*60*60*1000);