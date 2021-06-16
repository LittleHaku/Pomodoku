module.exports = {
    commands: 'skip',
    alias: 's',
    async callback(message, arguments, client) {
        const queue = client.player.getQueue(message)

        const voice = message.member.voice.channelID

        if (!voice) {
            message.channel.send('You must be in a voice channel')
            return
        }

        if (!queue) {
            message.channel.send('There is no music playing...')
            return
        }

        if (!queue.tracks[0]) {
            message.channel.send('There are no more songs')
            return
        }

        /** TODO:
         * Setting skip with vote or without, DJ always can skip
         */

        client.player.skip(message)
        message.channel.send('Skipped song')
    }
}