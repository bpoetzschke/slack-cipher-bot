"use strict";

var translator = require('./translator'),
    manipulator = require('./manipulator'),
    utils = require('./utils'),
    rp = require('request-promise');

function processRequest(request, response, slashToken) {
    if (request.body.token == slashToken) {
        response.end("Thank you very much for your request.\nThe translation will be posted shortly");
        var text = request.body.text;
        var responseUrl = request.body.response_url;

        var callback = function(text) {
            sendResult(responseUrl, text);
        };

        utils.extractParams(text, function( text, params ) {
            if (params) {
                manipulator.switchLetters(text, params, callback);
            } else {
                translator.translate(text, callback);
            }
        });

    } else {
        response.end();
    }
}

function sendResult(responseUrl, translated) {
    var responseBody = {
        response_type: 'in_channel',
        text: translated
    };
    rp({
        method: 'POST',
        uri: responseUrl,
        body: responseBody,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

module.exports = {
    process: processRequest
};