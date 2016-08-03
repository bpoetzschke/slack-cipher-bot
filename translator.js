"use strict";

var rp = require('request-promise'),
    cheerio = require('cheerio'),
    languages = ['ar', 'bn', 'cy', 'is', 'en'];
function translate(message) {
    doRequest("ar", message);
}

function doRequest(language, text) {
    var options = {
        uri: 'https://translate.google.com/#auto/' + language + '/' + encodeURIComponent(text),
        resolveWithFullResponse: true,
        transform: function (body) {
            console.log("body");
            console.log(body);
            return cheerio.load(body);
        }
    };

    console.log("Sending translate request to: " + options.uri);

    rp(options).then(function ($) {
        var childs = $("#result_box").children();
        console.log(childs.length);
        for (var i = 0; i < childs.length; i++) {
            console.log(childs[i].value());
        }
    }).catch(function (err) {
        console.error('Error while crawling translator page');
    })
}

module.exports = {
    translate: translate
};