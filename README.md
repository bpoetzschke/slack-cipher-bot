# slack-cipher-bot

This slack bot is a absolute useless bot which translates a input text with multiple languages and translates 
it back to the original language. Furthermore this bot supports slack slash commands and can also be added
to a channel.
For translation the [Yandex Translation API](https://api.yandex.com/translate/) is being utilized.

---

### Run slackbot
Before running the slack make sure you obtained the required tokens for Yandex Translation API, Slack Slash Command and finally Slack API token.
If you have gathered the required token you can start the app with the following two options.

Option 1:

    $ export SLACK_TOKEN=...
    $ export SLASH_TOKEN=...
    $ export TRANSLATE_API_KEY=...
    $ npm start

Option 2:
    
    $ SLACK_TOKEN=... SLASH_TOKEN=... TRANSLATE_API_KEY=... npm start

---

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

---

###Obtain Slack tokens

#### Slash Command token
In order to use the `slack-cipher-bot` you have to obtain a token for slash commands.

Goto `https://{myslack}.slack.com/apps/A0F82E8CA-slash-commands` and create a new slash command.
Specify the command for the bot and also define the URL where the server for the bot is located.

**Note:** Replace `{myslack}` with team name. 

#### Slack Bot token
To get a slack bot token you have to create a new bot integration for your team.
For this please visit `https://{myslack}.slack.com/apps/A0F7YS25R-bots` and select `Add Configuration.`

**Note:** Replace `{myslack}` with team name.

#### Translation API token
To obtain a translation token you have to create a Yandex account. Afterwards you can obtain a translation api
key from [https://tech.yandex.com/keys/get/?service=trnsl](https://tech.yandex.com/keys/get/?service=trnsl).

---

###Replace characters
To use character replacement instead of translation you can add `%s=f %r=k` to your message.

- `%s` - Defining search charcters, can be a comma separated list
- `%r` - Defining replace charcters, can be a comma separated list

Example:

    /cipher Hello World %s=l,o %r=f,a