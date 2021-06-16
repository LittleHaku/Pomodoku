const path = require('path')

module.exports = {
    commands: 'start',
    minArgs: 3,
    maxArgs: 3, //!start 25 5 4 (4 pomodoros of 25 mins study, 5 break)
    expectedArgs: ['<Study session length>', '<Brake length>', '<Number of pomodoros>'],
    async callback(message, arguments, client) {
      const {voice} = message.member

    //Check they are in a voice channel
      if (!voice.channelID) {
          message.channel.send('You must be in a voice channel')
          return
      }

      voice.channel.join()

      client.player.play(message, 'https://www.youtube.com/watch?v=FuPvbVgEH_c')
    },
}