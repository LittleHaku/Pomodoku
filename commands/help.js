module.exports = {
    commands: ['help', 'h'],
    minArgs: 0,
    callback: (message, arguments, client) => {
      message.channel.send('WIP!')
    },
}