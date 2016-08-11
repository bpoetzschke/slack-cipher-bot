"use strict";

function extractParameters(text, callback) {
    var findRegex = /%\S+/g,
        replRegex = /%\S+\s?/g,
        rawParams = text.match(findRegex);

    if (rawParams.length > 0) {
        var params = {};
        for (var i = 0; i < rawParams; i++) {
            var rawParam = rawParams[i].split('=');
            params[rawParam[0]] = rawParam[1].split(',').filter(Boolean);
        }

        callback(text.replace(replRegex, ''), params);
    }

    return callback(text);
}

module.exports = {
    extractParams: extractParameters
};