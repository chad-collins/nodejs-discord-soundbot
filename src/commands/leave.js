const audioDispatcher = require('../services/audio-dispatcher');


module.exports = {
    name: 'leave',
    aliases: ['disconnect'],
    description: 'force bot out of voice channel',
    usage: '',
    execute(message) {

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
            audioDispatcher.leave(channel);
            console.log(`${message.member.user.name} requested bot to leave channel`);
        }

    }
}