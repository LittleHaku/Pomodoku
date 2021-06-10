const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const { callback } = require('../start')

module.exports = {
    commands: ['skip', 's'],
    maxArgs: 1,
    expectedArgs: ['<Number of songs to skip>'],
    async callback(message, args, text) {

    }
}