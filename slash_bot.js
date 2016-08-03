"use strict";

var translator = require('./translator'),
    rp = require('request-promise');

function processRequest(request, response, slashToken) {
    if (request.body.token == slashToken) {
        response.end();
        var text = request.body.text;
        var responseUrl = request.body.response_url;

        translator.translate(text, function (translated) {
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
        });
    } else {
        response.end();
    }
}

module.exports = {
    process: processRequest
};