"use strict";

var translator = require('./translator'),
    manipulator = require('./manipulator'),
    rp = require('request-promise');

function processRequest(request, response, slashToken) {
    if (request.body.token == slashToken) {
        response.end("Thank you very much for your request.\nThe translation will be posted shortly");
        var text = request.body.text;
        var responseUrl = request.body.response_url;
                
        extractParameters(text, function( text, params ) {
            if (params) {
                manipulator.switchLetters(text, params, sendResult);
            } else {
                translator.translate(text, sendResult);
            }
        });

    } else {
        response.end();
    }
}

function sendResult( text ) {
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

function extractParameters(text, callback) {
    var findRegex = /%\S+/g,
        replRegex = /%\S+\s?/g,
        rawParams = text.match(regexp);
    
    if (rawParams.length > 0) {
        var params = {}
        for (var i = 0; i < rawParams; i++) {
            var rawParam = rawParams[i].split('=');
            params[rawParam[0]] = rawParam[1].split(',').filter(Boolean);
        } 
        
        callback( text.replace(replRegex, ''), params );
    }

    return callback( text, null );
}

module.exports = {
    process: processRequest
};