"use strict";

var Botkit = require('botkit'),
    trnsltr = require('./translator'),
    http = require('http'),
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

http.createServer(function (request, response) {
    var content = '<html><body><strong>I\'m the slack cipher bot.</strong></body></html>';

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(content, 'utf-8');
}).listen(5000);