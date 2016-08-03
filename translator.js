"use strict";

var rp = require('request-promise'),
    languages = ['ar', 'bn', 'cy', 'is', 'en'];
function translate(message, callback) {
    doRequest("ar", message, callback);
}

function doRequest(language, text, callback) {
    var translateApiKey = process.env.TRANSLATE_API_KEY;
    var options = {
        uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + translateApiKey + '&text=' + encodeURIComponent(text) + '&lang=' + language,
        headers: {
            'User-Agent' : 'slack-cipher-bot'
        },
        json: true
    };

    console.log('Sending translate request.');

    rp(options).then(function (data) {
        var translated = data.text[0];

        callback(translated);
    });
}

module.exports = {
    translate: translate
};