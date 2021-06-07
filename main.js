const Discord = require('discord.js');


const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Pomodoku is online!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; // If the message doesnt start with the prefix or the bot has written it, ignores

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        client.commands.get('help').execute(message, args);
    }
    else{
        message.channel.send('What did you say?');
    }
});


client.login('ODQ5NjYzMjc4NzY1MzEwMDMz.YLeclw.N6Nx_PWU3qlT10Yagw4hNL8_4Kg');