const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const consti = new Discord.MessageAttachment('./other/Constitution_de_The_Bad-Wolf.docx')

module.exports = class SpyroBot extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}constitution`)
    }

    static action (message) {
        message.channel.send("Voice la constitution du serveur :", 
            {
                files: 
                [
                    {
                        attachment: './other/Constitution_de_The_Bad-Wolf.docx',
                        name: 'Constitution_de_The_Bad-Wolf.docx'
                     }
                ]
            }
        );
    }
}