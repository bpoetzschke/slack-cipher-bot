"use strict";

var rp = require('request-promise'),
    languages = ['yi', 'pa', 'cy', 'is', 'tg', 'gd', ''];
function translate(message, callback) {
    startRequest(message, callback);
}

function startRequest(text, callback) {
    doRequest(languages[0], 0, text, "", callback);
}

function doRequest(language, index, text, originLang, callback) {
    if (index == languages.length - 1) {
        language += originLang;
    }

    var translateApiKey = process.env.TRANSLATE_API_KEY;
    var options = {
        uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + translateApiKey + '&text=' + encodeURIComponent(text) + '&lang=' + language,
        headers: {
            'User-Agent' : 'slack-cipher-bot'
        },
        json: true
    };

    rp(options).then(function (data) {
        var translated = data.text[0];

        if (index == 0) {
            originLang = data.lang.split('-')[0];
        }

        if (index == languages.length - 1) {
            callback(translated);
        } else {
            var langCode = languages[index] + "-" + languages[index+1];
            doRequest(langCode, index+1, translated, originLang, callback);
        }
    });
}

module.exports = {
    translate: translate
};