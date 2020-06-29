const audioDispatcher = require('../services/audio-dispatcher');

module.exports = {
    name: 'stop',
    description: 'stops current sound from playing in your voice channel.',
    async execute(message) {
        if (message.channel.type !== 'text') return;


        const alert = content => { message.channel.send(content); };
        const channel = message.member.voice.channel;

        if (!channel) {
            alert('You\'re not in a voice channel');
            return;
        }

        const userVoiceChannel = message.member.voice.channel.name;
        const clientVoiceChannel = message.guild.voice.channel.name;


        if (userVoiceChannel === clientVoiceChannel) {
            await audioDispatcher.stop();
        }
        else {
            alert('We\'re not in the same channel.');
        }

    },
};