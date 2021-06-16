const { prefix } = require('../config.json')

// Function to check the permissions are okay
const validatePermissions = (permission) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    // Checks the correcteness of the permissions
    for (const permission of validPermissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have permission to run this command',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions;


    // Ensure the commands are in an array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    console.log(`Registering command "${commands[0]}"`)

    // Ensure the permissions are in the array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    // Listen for messages
    client.on('message', async message => {
        const { member, content, guild } = message

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        // To avoid errors during !p (!play) and !pause, we will make first check for full cmd and if nothing matches, aliases
        if (content.toLowerCase().startsWith(`${prefix}`)) {
            //console.log('Hasta aqui1')
            for (const cmd of commands) {
                //console.log('hasta aqui2')
                // A commands has been ran
                if (command === cmd) {
                    //console.log('hasta aqui3')
                    // Ensure the user has the required permissions
                    for (const permission of permissions) {
                        if (!member.hasPermission(permission)) {
                            message.reply(permissionError)
                            return
                        }
                    }

                    // Ensure the user has the required roles
                    for (const requiredRole of requiredRoles) {
                        const role = guild.roles.cache.find(role => role.name === requiredRole)

                        if (!role || !member.roles.cache.has(role.id)) {
                            message.reply(`You must have the "${requiredRole}" role to use this command`)
                            return
                        }
                    }


                    // Ensure we have the correct number of arguments
                    if (args.length < minArgs || (args.length > maxArgs && maxArgs !== null)) {
                        message.reply(`Incorrect syntax! Use ${prefix}${commands} ${expectedArgs}`)
                        return
                    }

                    // Handle the custom command code
                    callback(message, args, client)

                    return
                }
            }

        }
        else {
            message.reply(`What did you say?`)
        }
    })
}