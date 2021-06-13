const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
//const DisTube = require('distube');
const config = require('./config.json');
const dotenv = require('dotenv');

const client = new Discord.Client();

client.config = require('./config.json');
client.dotenv = require('dotenv'); //Dont copy my token
//client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: false})

const { Player } = require('discord-player');
const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnEndCooldown: 1800000, //30 mins para irse
    leaveOnEmpty: false,
    enableLive: true
})

client.player = player
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;


client.dotenv.config();


client.once('ready', () => {
    console.log('Pomodoku is online!');

    const baseFile = 'command-base.js';
    const commandBase = require(`./commands/${baseFile}`);

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands');
});

/************************
 * MONGOOSE THINGS, WIP *
 ************************/

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log('Connected to the DB')
}).catch((err) => {
    console.log(err)
})

/*************************
 * DISCORD PLAYER EVENTS *
 *************************/

client.player
    .on('trackStart', (message, track) => {
        message.channel.send(`Tamos poniendo *${track.title}* :notes:`)
    })
    .on('trackAdd', (message, queue, track) => {
        message.channel.send(`*${track.title}* añadido a la cola`)
    })
    .on('playlistAdd', (message, queue, playlist) => {
        message.channel.send(`Añadido *${playlist.title}* a la cola, ${playlist.tracks.length} canciones`)
    })
    .on('botDisconnect', (message) => {
        message.channel.send('O me pagas o me voy, tu eliges')
    })



client.login(process.env.TOKEN);