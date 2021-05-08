const Discord = require('discord.js')
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = class QueueChannel extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}faitsdivers`)
    }

    static action (message) {
        let faitsDivers = JSON.parse(fs.readFileSync("../ReBot_test/JSON/faitsdivers.json", "utf8"));

        let nbAleatoire = Math.floor(Math.random() * 32);

        message.channel.send(`**${faitsDivers[nbAleatoire]}**`);
    }
}