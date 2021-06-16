module.exports = {
    commands: 'resume',
    alias: 'res',
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

        client.player.resume(message)
        message.channel.send('▶️ Music resumed')
    }
}