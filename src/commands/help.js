const { prefix } = require('../../config.json');
module.exports = {
    name: 'help',
    description: `[${prefix}help] ['command'] to see the 'command' details.`,
    aliases: ['commands', 'menu'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const { commands } = message.client;


        const embed = {
            color: 0xffc524,
            title: 'Commands',
            footer: {
                text: '',
            },
            fields: [],

        };

        if (!args.length) {
            embed.description = `${'```'}${'prolog'}\nServer Prefix ${prefix}${'```'}`;
            const field = { name: '**COMMANDS**', value: '' };
            const values = [];
            (commands.map(command => values.push(`${'```prolog\n'}'${command.name}':\n--Aliases: ${command.aliases ? '\'' + command.aliases + '\'' : ''}\n--Desc: ${command.description}${'```'}`)));
            values.push();
            field.value = values.join('');
            embed.fields.push(field);
            message.channel.send({ embed: embed });
        }

    },
};
