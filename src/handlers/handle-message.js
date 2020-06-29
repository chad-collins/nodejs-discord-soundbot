const { prefix } = require('../../config.json');
const Discord = require('discord.js');


module.exports = async function(message, client) {

	//	Ignore messages that don't start with prefix and from bots.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	//	Split the prefix from the message
	const args = message.content.slice(prefix.length).split(/ +/);

	//	The first word in `args` is the command name.
	const commandName = args.shift().toLowerCase();

	// Return the command from the known commands collection.
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;


	//	Prevent executing commands from DM's
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}


	// Handle no arguements provided when the command requires them.
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	//	Command Cooldowns. Time user must wait to execute the command again.

    const cooldowns = new Discord.Collection();
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// Finally we execute the command and catch any errors.
	try {
		command.execute(message, args, client);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
}
};