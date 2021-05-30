const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const fs = require('fs');

module.exports = class SpyroBot extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}diagonale`)
    }

    static action (message) {
        let status = JSON.parse(fs.readFileSync("./JSON/CommandStatus.json", "utf8"));

        if (status["diago"][message.guild.id] == "off") return;

        message.channel.send("LA DIAGONALE DE TES MORTS !! LA PUTAIN DE TA RACE !!", {tts: true})
    }
}