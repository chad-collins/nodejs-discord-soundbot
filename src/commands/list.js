const fs = require('fs');
const localPath = './sounds/';
const soundFiles = fs.readdirSync(localPath).filter(file => file.endsWith('.mp3'));


module.exports = {
    name: 'list',
    description: 'get a list of playable sounds as dm.',
    cooldown: 8,
    execute(message) {


        const soundNames = [];

        soundFiles.forEach(file => {
            const name = file.split('.');
            const item = '~1 ' + name[0];
            soundNames.push(item.toLowerCase());
        });

        message.author.send(soundNames, { split: true });
    },
};