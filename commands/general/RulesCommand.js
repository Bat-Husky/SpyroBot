const Discord = require('discord.js')
const commands = require('../commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = class FaitsDivers extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}rules`)
    }

    static async action (message) {
        const rules = message.guild.channels.cache.find(ch => ch.name === '📛règlement');

        message.channel.send(`Lis le ${rules} !`);
    }
}