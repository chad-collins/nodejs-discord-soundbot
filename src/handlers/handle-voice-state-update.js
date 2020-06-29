const getSoundFile = require('../utils/get-sound-file');
const audioDispatcher = require('../services/audio-dispatcher');
const usersObj = require('../data/users.json');


module.exports = async function(oldMember, newMember) {
     if (newMember.member.user.bot == true) { return; }
    if (newMember.member.voice.channel == null) { return; }

    function greet() {
        if (!newMember.mute && !oldMember.mute) {


            const currentUser = newMember.member.user;
            const userKey = currentUser.username + currentUser.discriminator;
            const foundProfile = usersObj.users.find(
                found => found.username + found.discriminator === userKey);

            if (foundProfile.sound != undefined && foundProfile.sound != 0) {
                const foundSound = getSoundFile.getLocalSound((foundProfile.sound));

                if (foundSound != 'failed') {
                    console.log(`Greeting ${currentUser.username}#${currentUser.discriminator}`);
                    audioDispatcher.play(foundSound, newMember.member.voice.channel);
                }

            }
        }
    }

    greet();


};

