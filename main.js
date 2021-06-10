const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const distube = require('distube')

const mongoose = require('mongoose')

const config = require('./config.json');

const dotenv = require('dotenv'); //Dont copy my token
dotenv.config();


const client = new Discord.Client();

client.commands = new Discord.Collection();

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

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log('Connected to the DB')
}).catch((err) => {
    console.log(err)
})


client.login(process.env.TOKEN);