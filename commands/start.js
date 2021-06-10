const path = require('path')

module.exports = {
    commands: ['start', 's'],
    minArgs: 0,
    maxArgs: 3, //!start 25 5 4 (4 pomodoros of 25 mins study, 5 break)
    async callback(message, arguments, text) {
      const {voice} = message.member

    //Check they are in a voice channel
      if (!voice.channelID) {
          message.channel.send('You must be in a voice channel')
          return
      }

      voice.channel.join().then((connection) => {
        connection.play('../grabacion.mp3')
      })
    },
}