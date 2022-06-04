const Discord = require('discord.js')
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const consti = new Discord.MessageAttachment('./other/Constitution_de_The_Bad-Wolf.docx')

module.exports = class Constitution extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}constitution`)
    }

    static action (message) {
        message.channel.send({
            content: "Voici la constitution du serveur :",
            files: [
                {
                    attachment: './other/Constitution_de_The_Bad-Wolf.docx',
                    name: 'Constitution de The Bad-Wolf.docx'
                }
            ]
        });
    }
}