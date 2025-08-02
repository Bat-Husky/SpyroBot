const Discord = require('discord.js')
const commands = require('../commands');
const { Client, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');


module.exports = class QueueChannel extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}setqueuechannel`)
    }

    static action (message) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) return message.reply("You can't use that command!");

        let QueueChannel = JSON.parse(fs.readFileSync("./JSON/QueueChannel.json", "utf8"));

        
        if (!message.content.toString().split(' ')[1]) return message.reply("Définnissez le channel de la Queue comme ceci : \n`SetQueueChannel <id or name>`")
        let tempChannel = message.content.toString().split(' ');
        tempChannel.shift();
        QueueChannel[message.guild.id] = tempChannel.join(' ');

        if (!message.guild.channels.cache.find(ch => ch.name == QueueChannel[message.guild.id]) && !message.guild.channels.cache.find(ch => ch.id == QueueChannel[message.guild.id])) return message.reply("Ce channel n'existe pas")

        fs.writeFile("./JSON/QueueChannel.json", JSON.stringify(QueueChannel), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const channel = message.guild.channels.cache.find(ch => ch.name == QueueChannel[message.guild.id]) || message.guild.channels.cache.find(ch => ch.id == QueueChannel[message.guild.id])

        const embed = new EmbedBuilder()
            .setTitle("Queue Channel now set to :")
            .setDescription(`${channel}`)
        message.channel.send({ embeds: [embed] });
    }
}
