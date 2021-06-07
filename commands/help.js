module.exports = {
    name: 'help',
    description: "Ths is a help command",
    execute(message, args){
        message.channel.send('I can\'t help you yet');
    }
}