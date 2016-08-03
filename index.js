"use strict";

var Botkit = require('botkit'),
    trnsltr = require('./translator'),
    express = require('express'),
    app = express(),
    controller = Botkit.slackbot({
        logLevel: 3
    });

controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM(function (err) {
    if (err) {
       throw new Error('Could not connect to slack');
    }
    console.log('Connected to slack');
});


// Listen to on join channel event and log
controller.on('bot_channel_join', function() {
    console.log('Joined channel');
});

//Listen to all messages from a channel
controller.on('direct_mention', function(bot, message) {
    if (message.type === 'message') {
        trnsltr.translate(message.text, function(translated) {
            bot.reply(message, {
                    text: "Aye <@"+ message.user +">! I ciphered the following for you:",
                    attachments: [{
                        text: translated
                    }]
                }
            );
        });

    }
});

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});