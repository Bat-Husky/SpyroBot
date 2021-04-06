const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');

module.exports = class SpyroBot extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}diagonale`)
    }

    static action (message) {
        message.channel.send("LA DIAGONALE DE TES MORTS !! LA PUTAIN DE TA RACE !!", {tts: true})
    }
}