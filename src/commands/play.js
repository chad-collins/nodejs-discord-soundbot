const getSoundFile = require('../utils/get-sound-file');
const audioDispatcher = require('../services/audio-dispatcher');

module.exports = {
    name: 'play',
    aliases: '1',
    description: 'play a sound in your current voice channel.',
    args: true,
    async execute(message, args) {

        if (message.channel.type !== 'text') return;

        const channel = message.member.voice.channel;
        const alert = content => { message.channel.send(content); };


        if(!channel) {
            alert('You\'re not in a voice channel');
            return;
        }

        const sound = getSoundFile.getLocalSound(args);

        if(sound === 'failed') {
            alert('I couldn\'t find a sound to play');
            return;
        }

        audioDispatcher.play(sound, channel);
        console.log(`${message.member.user.username} played ${sound}`);

        (() => {
            try { message.delete(); }
            catch (e) {
                console.log(e);
            }
        })();
    },
};