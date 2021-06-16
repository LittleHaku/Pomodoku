Discord = require('discord.js')

module.exports = {
    commands: 'nowplaying',
    alias: ['np', 'nowp'],
    async callback(message, arguments, client) {
        const queue = client.player.getQueue(message)

        const voice = message.member.voice.channelID

        if(!voice) {
            message.channel.send('You must be in a voice channel')
            return
        }

        if(!queue) {
            message.channel.send('There is no music playing')
            return
        }

        const track = await client.player.nowPlaying(message)

        const embed = new Discord.MessageEmbed()
            .setAuthor('Now playing')
            .setThumbnail(track.thumbnail)
            .addField('Title', track.title, true)
            .addField('Channel', track.author, true)
            .addField('Duration', track.duration, true)
            .setTimestamp()
            .setColor('GREEN')
            .setFooter('Funciona?')
        message.channel.send(embed)
    }
}