# slack-cipher-bot

This slack bot is a absolute useless bot which translates a input text with multiple languages and translates 
it back to the original language. Furthermore this bot supports slack slash commands and can also be added
to a channel.
For translation the [Yandex Translation API](https://api.yandex.com/translate/) is being utilized.

### Run slackbot
To run the slack bot you have two 

###Translation chain
The bot will translate the given text in the following language order.

1. Yiddish - `yi`
2. Punjabi - `pa`
3. Welsh - `cy`
4. Icelandic - `is`
5. Tajik - `tg`
6. Scottish Gaelic - `gd`
7. Input language

This list of languages will be also accept from environment variables in a future release.

###Obtain Slack tokens
In order to use the `slack-cipher-bot` you have to obtain a token for slash commands.

Goto https://{myslack}.slack.com/apps/A0F82E8CA-slash-commands and create a new slash command.
Specify the command for the bot and also define the URL where the server for the bot is located.