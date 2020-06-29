const fs = require('fs');
const soundFiles = fs.readdirSync('./sounds').filter(file => file.endsWith('.mp3'));
const usersTable = require('../data/users.json');


module.exports = {
    name: 'greeting',
    aliases: ['theme', 'entrance', 'intro'],
    description: 'view and manage your channel greeting sound.',
    usage: '',

    execute(message, args) {
        // Grab the user's name
        const currentUser = message.member.user;
        const userKey = currentUser.username + currentUser.discriminator;
        let newSound = '';

        //  Check for existing data entry
        let userData = usersTable.users.find(found => found.username + found.discriminator === userKey);

        if (args.length < 1) {
            message.channel.send(`Your current theme is ${userData.sound}`);
            return;
        }
        // If arguments provided
        if (args.length > 0) {

            // If no entry was found, create an entry in the local table variable.
            if (userData == undefined) {
                userData = {
                    'username': currentUser.username,
                    'discriminator': currentUser.discriminator,
                };
                usersTable.users.push(userData);
            }

            if (args[0] == 'delete') {
                newSound = 0;
            }
            else {
                newSound = args[0];
                const soundNames = [];
                soundFiles.forEach(file => {
                    const name = file.split('.');
                    soundNames.push(name[0].toLowerCase());
                });
                const foundSound = soundNames.find(found => found === args[0].toLowerCase());

                //  If no sound was found, message user and return
                if (foundSound == undefined) {
                    message.channel.send('That is not a valid sound file. I will DM you a list of sound to choose from.');
                    message.author.send(soundNames, { split: true });
                    return;
                }

            }

            //  Push the new data to the json file
            userData.sound = newSound;
            const newData = JSON.stringify(usersTable, null, 2);
            console.log(`${userKey} is attempting to change their greeting theme...`);
            fs.writeFile('./src/data/users.json', newData, (err) => {
                err ? console.log('-error in write file:' + err) : console.log('-file write successful.');

            });

            message.channel.send('Updated!');

        }
    },
};