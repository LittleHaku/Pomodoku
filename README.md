# Pomodoku

## Discord Music Bot

Pomodoku is a Discord bot designed for playing music.

### Getting Started

To initiate the bot, use the following command:

```
node main.js
```

Make sure to install the required Node.js modules using:

```
npm install ytdl-core
```

### Invite Instructions

Use this link: https://discord.com/oauth2/authorize?client_id=849663278765310033&permissions=552175266896&scope=bot

or...

To invite Pomodoku to your Discord server, follow the steps outlined in the official Discord.py documentation: [Discord.py Documentation](https://discordpy.readthedocs.io/en/stable/discord.html)

### Music Commands

- **Play a Song:**
  ```
  !play <Song name>
  ```
  Example:
  ```
  !play Despacito
  ```

- **Skip the Current Song:**
  ```
  !skip
  ```

- **Resume Playback:**
  ```
  !resume
  ```

- **Now Playing:**
  ```
  !nowplaying
  ```

- **Queue:**
  ```
  !queue
  ```

- **Disconnect the Bot:**
  ```
  !disconnect
  ```

Please note that the bot requires the `CONNECT` and `SPEAK` permissions in the voice channel.
