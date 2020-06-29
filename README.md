# Node.js Discord Bot
A bot that allows users to set their own channel entrance sound, as well as play sound files for their current voice channel.

## Tech
* Node.js
* [Discord.js](https://discord.js.org)

You will need to install [Node](https://nodejs.org/en/download/) on your machine to run this project. This README does not cover installation or usage of node, and assumes you have some familiarity with command line tools.

## Preparing Your Existing Discord Server
Create a new application on your [Discord Developer Portal](https://discordapp.com/developers/applications/).

Make note of your bot’s authorization token from the box marked App Bot User (Token: Click to reveal).

Scroll up to the box marked App Details and find your Client ID. Copy the number and add it to this URL, in the place of word CLIENTID. 
``` 
https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8  
```
Navigate to the URL to invite the bot to your server.

## Preparing The Bot
Clone this repository onto your machine.

Using a popular code editor such as Visual Studio Code, create a file named "_.env_". In .env, add the following line:
```
BOT_TOKEN=yourAuthorizationTokenGoesHere
```
Make sure to replace _"yourAuthorizationTokenGoesHere"_ with your actual token.

Install dependencies using npm:
```
$ npm install
```
Depending on your operating system, you may need to install [FFMPEG](https://ffmpeg.org/).

Bring the bot online with this command:
```
$ node app.js
```

## Add Sound Files
Sounds can be saved directly to the "Sounds" directory. Files need to be in mp3 format.

##Commands
To call the bots attention, the default prefix is "~".
```
~help
~play soundFileName
~greeting soundFileName
```

## You're all set!



