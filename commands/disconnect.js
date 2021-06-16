const { VoiceChannel } = require('discord.js')
const path = require('path')

module.exports = {
    commands: 'disconnect',
    alias: ['d', 'dis'],
    minArgs: 0,
    async callback(message, arguments, client) {
        const {voice} = message.member

        if (!voice.channelID) {
            message.channel.send('You need to be in a voice channel to disconnect me')
            return
        }

        await voice.channel.leave()
        await message.channel.send('Bye bye! :wave:')
    }
}