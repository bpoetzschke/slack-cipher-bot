"use strict";

function switchLetters(text, params, callback) {
    var manipulated = text;

    if( (params['s'] && params['r']) && 
        (params['s'].length === params['r'].length)
    ) {
        
        var searchLetters = params['s'],
            replaceLetters = params['r'];

        for( var i=0; i < searchLetters.length; i++ ) {
            var re = RegExp(searchLetters[i],"g");
            manipulated = manipulated.replace(re, replaceLetters[i]);
        }
    }

    callback(manipulated);
}

module.exports = {
    switchLetters: switchLetters
};