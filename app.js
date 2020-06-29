const handleMessage = require('./src/handlers/handle-message');
const handleVoiceStateUpdate = require('./src/handlers/handle-voice-state-update');
require('dotenv').config()
const botToken = process.env.BOT_TOKEN;
const fs = require('fs');
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const DiscordJs = require('discord.js');
const client = new DiscordJs.Client();


client.commands = new DiscordJs.Collection();
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}


client.login(botToken);

client.once('ready', async () => {
    console.log('Bot is ready!');

});

client.on('message', message => { handleMessage(message, client); });


client.on('voiceStateUpdate', function(oldMember, newMember) {
    handleVoiceStateUpdate(oldMember, newMember);

});