const Discord = require('discord.js')
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = class FaitsDivers extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}faitsdivers`)
    }

    static async action (message) {
        let nbFaitsDivers = JSON.parse(fs.readFileSync("./JSON/faitsdivers.json", "utf8"))["nombre"]
        let faitsDivers = JSON.parse(fs.readFileSync("./JSON/faitsdivers.json", "utf8"))["faitsdivers"]
        let nbAleatoire = Math.floor(Math.random() * nbFaitsDivers);

        message.channel.send(`>>> **${faitsDivers[nbAleatoire]}**`);
    }
}
