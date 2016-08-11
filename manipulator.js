"use strict";

function switchLetters(text, params, callback) {
    var manipulated = text;

    if( (params['s'] && params['r']) && 
        (params['s'].length === params['r'].length)
    ) {
        
        var searchLetters = params['s'],
            replaceLetters = params['r'],
            re = null;

        for( var i=0; i < searchLetters.length; i++ ) {
            // first replace lower case variant
            re = RegExp(searchLetters[i].toLowerCase(),"g");
            manipulated = manipulated.replace(re, replaceLetters[i].toLowerCase());
            // second replace upper case variant
            re = RegExp(searchLetters[i].toUpperCase(),"g");
            manipulated = manipulated.replace(re, replaceLetters[i].toUpperCase());
        }
    }

    callback(manipulated);
}

module.exports = {
    switchLetters: switchLetters
};