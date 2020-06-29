const fs = require('fs');
const localPath = './sounds/';


module.exports = {

    getLocalSound: function(val) {
        const soundFiles = fs.readdirSync(localPath).filter(file => file.endsWith('.mp3'));
        const found = soundFiles.find(sound => sound.toLowerCase() === (val + '.mp3'));
        return found == undefined ? 'failed' : `${localPath}${found}`;
    },

};