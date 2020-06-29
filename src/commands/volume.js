const audioDispatcher = require('../services/audio-dispatcher');

module.exports = {
	name: 'volume',
	description: 'adjust volume of audio',
	async execute(message, args) {

		if (message.channel.type !== 'text') return;

		const alert = content => { message.channel.send(content); };
		const volumeMsg = vol => { message.channel.send(`Current Volume: ${vol}%`); };


		function changeVolume() {
			const successCallback = () => {
				const newVolume = audioDispatcher.getVolume();
				volumeMsg(newVolume);
			};
			audioDispatcher.setVolume(args, successCallback);
		}


		if (args == null) {
			volumeMsg(audioDispatcher.getVolume());
			return;

		}
		const isPlaying = audioDispatcher.getIsPlaying();

		if (isPlaying == false) {
			changeVolume();
			return;
		}

		if (isPlaying) {
			const useChannelName = message.member.voice.channel.name;
			const clientChannelName = message.guild.voice.channel.name;

			if (useChannelName === clientChannelName) {
				changeVolume();
				return;
			}
			if (useChannelName === clientChannelName) {
				alert('I\'m busy with others right now.');
				return;
			}
		}
	},
};
