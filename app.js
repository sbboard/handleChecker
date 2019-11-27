var Twit = require('twit')
const nodemailer = require("nodemailer")

let bigArray = []
const names = ["buffum","seanporter","buffumwad","colinbuffum"]

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

let transporter = nodemailer.createTransport({
    name: 'gang-fight.com',
    host: 'localhost',
    port: 25,
    tls:{
        rejectUnauthorized: false
    }
});

function checkStatus(name){
    return new Promise(resolve => {
        let status = ""
        T.get('users/lookup', { screen_name: name },  function (err, data, response) {
            if(data.hasOwnProperty('errors') && data.errors[0].code == 17){
                status = true
            }
            else{                
                status = false
            }
            bigArray.push({"name":name,"status":status})
            resolve('resolved')
        })
    })
}

function sendEmail(){
    return new Promise(resolve => {
        let message = "<table style='border: 1px solid black; width: 50%'>"
        let plainMsg = ""
        for(i = 0; i<bigArray.length; i++){
            message += `<tr><td style='border: 1px solid black'><b>@${bigArray[i].name}</b></td>`
            plainMsg += `${bigArray[i].name}: `
            if(bigArray[i].status == true){
                message += `<td style='border: 1px solid black;color:green'><b>FREE!</b></td></tr>`
                plainMsg += `${bigArray[i].status}`
            }
            else{
                message += `<td style='border: 1px solid black;color:red'><b>Taken...</b></td></tr>`
                plainMsg += `${bigArray[i].status}`
            }
        }
        message += "</table>"
        transporter.sendMail({
            from: '"Twitter Handle Bot" <twitter@gang-fight.com>', // sender address
            to: "colin.buffum@gmail.com", // list of receivers
            subject: "Twitter Handle Update", // Subject line
            text: plainMsg, // plain text body
            html: message // html body
        });
        resolve('resolved')
    })
}

async function runScript(){
    for(let i = 0; i < names.length; i++){
        await checkStatus(names[i])
    }
    await sendEmail()
    console.log("email sent")
}

runScript()

setInterval(function(){
    runScript()
  }, 24*60*60*1000);