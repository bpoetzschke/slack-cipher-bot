"use strict";

var slashBot = require('./slash_bot'),
    express = require('express'),
    bodyParser = require('body-parser'),
    bot = require('./bot'),
    app = express();

function startExpress() {
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    app.set('port', (process.env.PORT || 5000));

    //For avoidong Heroku $PORT error
    app.get('/', function (request, response) {
        var result = 'App is running'
        response.send(result);
    });

    app.post('/cipher', function (request, response) {
        slashBot.process(request, response, slashToken);
    });

    app.listen(app.get('port'), function () {
        console.log('App is running, server is listening on port ', app.get('port'));
    });
}

function startSlackBot() {
    bot.run();
}

var slackToken = process.env.SLACK_TOKEN;
var translateToken = process.env.TRANSLATE_API_KEY;
var slashToken = process.env.SLASH_TOKEN;

if (slackToken != null && translateToken != null && slashToken != null) {
    slashBot.slashToken = slashToken;
    startExpress();
    startSlackBot();
} else {
    console.error("Required env variables not set");
    console.error("Good bye!");
    process.exit(1);
}
