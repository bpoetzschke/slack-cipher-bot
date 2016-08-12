"use strict";

function extractParameters(text, callback) {
    var findRegex = /%\S+/g,
        replRegex = /%\S+\s?/g,
        rawParams = text.match(findRegex);

    if (Array.isArray(rawParams) && rawParams.length > 0) {
        var params = {};
        for (var i = 0; i < rawParams.length; i++) {
            var rawParam = rawParams[i].split('=');
            params[rawParam[0].substr(1)] = rawParam[1].split(',').filter(Boolean);
        }

        return callback(text.replace(replRegex, ''), params);
    }

    return callback(text, null);
}

module.exports = {
    extractParams: extractParameters
};