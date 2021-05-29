const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = class Warn extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}warn`)
    }

    static action (message) {
        let warns = JSON.parse(fs.readFileSync("./JSON/Warning.json", "utf8"));

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't use that command!");

        let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));

        if (!logsChannels[message.guild.id] || !message.guild.channels.cache.find(ch => ch.name == logsChannels[message.guild.id]) || !message.guild.channels.cache.find(ch => ch.id == logsChannels[message.guild.id])) {
            return message.reply("Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`")
        }

        let wUser = message.guild.member(message.mentions.users.first()) || message.mentions.users.first();
        if(!wUser) return message.reply("Can't find user!");
        if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("I can't warn him!");

        var warned = message.mentions.users.first();

        const text = message.content.toString();
        var msg = text.split(' ');
        msg.shift();
        msg.shift();
        var reason = msg.join(' ');

        if (!reason) return message.reply("There is no reason!")

        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };

        warns[wUser.id].warns++;

        fs.writeFile("./JSON/Warning.json", JSON.stringify(warns), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const warnEmbed = new MessageEmbed()
            .setDescription("Warns")
            .setAuthor(`From ${message.author.username}`)
            .setColor("#0042ff")
            .addField("Warned User", warned)
            .addField("Reason", reason)
        message.channel.send(warnEmbed);

        
        const warnChannel = message.guild.channels.cache.find(ch => ch.name == logsChannels[message.guild.id]) || message.guild.channels.cache.find(ch => ch.id == logsChannels[message.guild.id])

        const warnEmbedLogs = new MessageEmbed()
            .setDescription("Warns")
            .setAuthor(`From ${message.author.username}`)
            .setColor("#0042ff")
            .addField("Warned User", warned)
            .addField("Warned in", message.channel)
            .addField("Number of Warnings", warns[wUser.id].warns)
            .addField("Reason", reason)
        warnChannel.send(warnEmbedLogs);
        
    }
}
