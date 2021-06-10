module.exports = {
    commands: ['help'],
    minArgs: 0,
    callback: (message, arguments, client) => {
      message.channel.send('WIP!')
    },
}