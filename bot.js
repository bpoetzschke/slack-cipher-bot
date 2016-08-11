"use strict";

var Botkit = require('botkit'),
    translator = require('./translator'),
    utils = require('./utils'),
    manipulator = require('./manipulator'),
    controller = Botkit.slackbot({
        logLevel: 3
    });

function run() {
    controller.spawn({
        token: process.env.SLACK_TOKEN
    }).startRTM(function (err) {
        if (err) {
            throw new Error('Could not connect to slack');
        }
        console.log('Connected to slack');
    });


    // Listen to on join channel event and log
    controller.on('bot_channel_join', function () {
        console.log('Joined channel');
    });

    //Listen to all messages from a channel
    controller.on('direct_mention', function (bot, message) {
        if (message.type === 'message') {

            var callback = function(text) {
                bot.reply(message, {
                    text: "Aye <@" + message.user + ">! I ciphered the following for you:", attachments: [{
                        text: text
                    }]
                });
            };

            utils.extractParams(message.text, function( text, params ) {
                if (params) {
                    manipulator.switchLetters(text, params, callback);
                } else {
                    translator.translate(text, callback);
                }
            });
        }
    });
}

module.exports = {
    run: run
};