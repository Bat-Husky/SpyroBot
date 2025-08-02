const Discord = require('discord.js')
// const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('../commands');



module.exports = class Warn extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}crash`)
    }

    static async action (message) {
        if(message.author.id != message.guild.owner.id) return message.reply("You can't use that command!");
        message.channel.send('Je vais crash')
        //const connection = await message.member.voice.channel.join();
        //const dispatcher = connection.dispatcher.end()
    }
}