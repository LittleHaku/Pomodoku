//const ytdl = require('ytdl-core')
//const ytSearch = require('yt-search')

module.exports = {
    commands: 'play',
    alias: 'p',
    minArgs: 1,
    expectedArgs: ['<Song name>'],
    permissions: ['CONNECT', 'SPEAK'],
    async callback(message, arguments, client) {

        const { voice } = message.member

        //Check they are in a voice channel
        if (!voice.channelID) {
            message.channel.send('You must be in a voice channel')
            return
        }

        voice.channel.join()

        client.player.play(message, arguments.join(" "), true)
    }
}