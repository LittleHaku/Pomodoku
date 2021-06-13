Discord = require('discord.js')
Pagination = require('discord-paginationembed');

module.exports = {
    commands: ['queue', 'q'],
    async callback(message, arguments, client) {

        const queue = client.player.getQueue(message)

        const voice = message.member.voice.channelID

        if (!voice) {
            message.channel.send('You must be in a voice channel')
            return
        }

        if (!queue) {
            message.channel.send('There is no music playing')
            return
        }

        if (queue.tracks.length === 1) {
            const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor('Queue', message.guild.iconURL({ dynamic: true }))
                .addField('Currently Playing', `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`)
            message.channel.send(embed)
            return
        }

        let i = 0

        const FieldsEmbed = new Pagination.FieldsEmbed()

        
        FieldsEmbed.embed
            .setColor('GREEN')
            .setAuthor('Title', message.guild.iconURL({ dynamic: true }))
            .addField('Currently Playing', `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`)

        FieldsEmbed.setArray(queue.tracks[1] ? queue.tracks.slice(1, queue.tracks.length) : [])
            .setAuthorizedUsers([message.author.id])
            .setChannel(message.channel)
            .setElementsPerPage(5)
            .setPageIndicator(true)
            .formatField('Queue', (track) => `${++i}. [${track.title}](${track.url})\n*Requested by ${track.requestedBy}*\n`)

        FieldsEmbed.build()
        
    }
}