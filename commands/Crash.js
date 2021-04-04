const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');



module.exports = class Warn extends commands {

    static match (message) {
        return message.content.toString().toLowerCase().startsWith('r/crash')
    }

    static action (message) {
        if(message.author.id != message.guild.owner.id) return message.reply("Vous n'avez pas les permissions nécessaires !");
        message.channel.send('Je vais crash')
        let wUser = message.mentions.users.first().id;
    }
}