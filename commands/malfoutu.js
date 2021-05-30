const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = class MalFoutu extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}tonbotestmalfoutu`)
    }

    static action (message) {
        let status = JSON.parse(fs.readFileSync("./JSON/CommandStatus.json", "utf8"));

        if (status["malfoutu"][message.guild.id] == "off") return;
        
        message.channel.send('Tu te calme martine ! Tu crois ça facile de coder un bot ?', {tts: true})
    }
}