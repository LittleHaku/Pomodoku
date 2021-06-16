module.exports = {
    commands: 'help',
    alias: 'h',
    minArgs: 0,
    callback: (message, arguments, client) => {
      message.channel.send('WIP!')
    },
}