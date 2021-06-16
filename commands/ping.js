module.exports = {
    commands: 'ping',
    async callback(message, arguments, client) {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}