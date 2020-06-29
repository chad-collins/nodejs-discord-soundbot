let connection = '';
let dispatcher = '';
let isPlaying = false;
let serverVolume = 1;
let sessionId = 0;
let timer = false;

module.exports = {

	play: async function(sound, channel) {

		sessionId += 1;

		try {
			connection = await channel.join();
		}
		catch (VOICE_JOIN_CHANNEL) {
			console.error(`-TaskId#${ sessionId }: Channel Permissions restricting access.`);
			return;
		}
			//  Delay start
			setTimeout(() => { playSound(); }, 600);

			const playSound = () => {
				dispatcher = connection.play(sound, { volume: serverVolume });
				dispatcher.on('error', console.error);

				dispatcher.on('start', () => {
					console.log(`-Session#${sessionId}: Playing ${sound}.`);
					isPlaying = true;
					timer = false;
				});
				dispatcher.on('finish', () => {
					console.log(`-Session#${sessionId}: Finished playing${sound}.`);
					isPlaying = false;
					dispatcher = '';
					timer = true;

					//	Kick bot from voice channel due to inactivivity
						setTimeout(() => {
							if (timer) {
								channel.leave();
								console.log(`-Session#${sessionId}: Exit channel - Inactivity.`);
							}
						}, 240000);
				});
			};
	},

	stop: async function() {
			try { await dispatcher.destroy(); }
			catch (e) {
				console.log(`-error stopping audio ${e}`);
			}
			console.log('-succefully stopped audio');
			isPlaying = false;
	},

	leave: async function(channel) {

		try { await channel.leave(); }
		catch (e) {
			console.log(`-error leaving channel ${e}`);
		}
			console.log('-succefully left channel');
			isPlaying = false;

	},

	getIsPlaying: function() {
		return isPlaying;
	},

	getVolume: function() {

		const volumePercent = (serverVolume * 100).toString();
		return volumePercent;
	},

	setVolume: function(args, callback) {
		let vol = args;
		if(args > 100) { vol = 100; }
		if(args < 0) { vol = 0; }
		serverVolume = vol / 100;
		console.log(`-server volume set to ${vol}`)
		try {
			if (dispatcher) { dispatcher.setVolume(vol / 100); }
		}
		catch (e) {
			console.log('-error changing dispatcher audio volume');
			return;
		}
		callback();
	},
};

