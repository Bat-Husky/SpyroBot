const Discord = require('discord.js')
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = class LogsChannel extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}logschannel`)
    }

    static action (message) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You can't use that command!");

        let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));

        
        if (!message.content.toString().split(' ')[1]) return message.reply("Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`")
        let tempChannel = message.content.toString().split(' ');
        tempChannel.shift();
        logsChannels[message.guild.id] = tempChannel.join(' ');

        if (!message.guild.channels.cache.find(ch => ch.name == logsChannels[message.guild.id]) && !message.guild.channels.cache.find(ch => ch.id == logsChannels[message.guild.id])) return message.reply("Ce channel n'existe pas")

        fs.writeFile("./JSON/LogsChannels.json", JSON.stringify(logsChannels), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const channel = message.guild.channels.cache.find(ch => ch.name == logsChannels[message.guild.id]) || message.guild.channels.cache.find(ch => ch.id == logsChannels[message.guild.id])

        const embed = new MessageEmbed()
            .setTitle("Logs Channel now set to :")
            .setDescription(`${channel}`)
        return message.channel.send(embed);
        
    }
}
