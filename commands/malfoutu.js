const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class MalFoutu extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}tonbotestmalfoutu`)
    }

    static action (message) {
        message.channel.send('Tu te calme martine ! Tu crois ça facile de coder un bot ?', {tts: true})
    }
}