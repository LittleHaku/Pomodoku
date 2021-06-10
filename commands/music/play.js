const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const queue = new Map()

module.exports = {
    commands: ['play', 'p'],
    minArgs: 1,
    expectedArgs: ['<Song name>'],
    permissions: ['CONNECT', 'SPEAK'],
    async callback(message, arguments, client) {
        const voice_channel = message.member.voice.channel
        if (!voice_channel) {
            message.reply('You must be in a voice channel to play some music')
            return
        }

        const server_queue = queue.get(message.guild.id)

        let song = {}

        // If the argument is a URL
        if (ytdl.validateURL(arguments[0])) {
            const song_info = await ytdl.getInfo(arguments[0])
            song = {
                title: song_info.videoDetails.title,
                url: song_info.videoDetails.video_url
            }
        }
        // If it is not a URL
        else {
            const video_finder = async (query) => {
                const videoResult = await ytSearch(query)
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
            }

            const video = await video_finder(arguments.join(' '));
            if (video) {
                song = {
                    title: video.title,
                    url: video.url
                }
            } else {
                message.channel.send('Oops, there was an error finding that video :sweat_smile:')
            }
        }

        // In case there is no queue yet
        if (!server_queue) {

            const queue_constructor = {
                voice_channel: voice_channel,
                text_channel: message.channel,
                connection: null,
                songs: []
            }

            queue.set(message.guild.id, queue_constructor)
            queue_constructor.songs.push(song)

            try {
                const connection = await voice_channel.join()
                queue_constructor.connection = connection
                video_player(message.guild, queue_constructor.songs[0])
            } catch(err) {
                queue.delete(message.guild.id)
                message.channel.send('There was an unexpected error while connecting')
                throw err
            }
        }
        // If there is a queue just push the song
        else {
            server_queue.songs.push(song)
            message.channel.send(`**${song.title}** added to the queue :ok_hand:`)
            return
        }
    },
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id)

    if (!song) {
        song_queue.voice_channel.leave() // Will change this in case study without music
        queue.delete(guild.id)
        return
    }

    const stream = ytdl(song.url, { filter: 'audioonly'})
    song_queue.connection.play(stream, {seek: 0, volume: 0.75})
    .on('finish', () => { // When the song is finished, play the next
        song_queue.songs.shift()
        video_player(guild, song_queue.songs[0])
    })

    await song_queue.text_channel.send(`Now playing **${song.title}**`)
}