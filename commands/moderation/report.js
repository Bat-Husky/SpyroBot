const Discord = require('discord.js')
const commands = require('../commands');
const { Client, EmbedBuilder } = require('discord.js');
const fs = require('fs');


module.exports = class Report extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}report`)
    }

    static action (message) {
        let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));

        if (!logsChannels[message.guild.id] || !message.guild.channels.cache.find(ch => ch.name == logsChannels[message.guild.id]) && !message.guild.channels.cache.find(ch => ch.id == logsChannels[message.guild.id])) {
            return message.reply("Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`")
        }

        //if (message.guild.id != 621427447879172096) return message.reply("Cette commande n'est pas disponible sur ce serveur.");
        if (message.guild.ownerID == message.mentions.users.first()) return message.reply("Vous ne pouvez pas le report");
        
        const reportChannel = message.guild.channels.cache.find(ch => ch.name == logsChannels[message.guild.id]) || message.guild.channels.cache.find(ch => ch.id == logsChannels[message.guild.id])

        let args = message.content.toString().split(' ')
        args.shift()
        args.shift()
        let reason = args.join(' ')

        if (!message.mentions.users.first()) return message.reply("Vous n'avez mentionné personne !")
        if (!reason) return message.reply("There is no reason!")

        message.channel.send(`${message.mentions.users.first()} a bien été report.`)

        const embed = new EmbedBuilder()
            .setTitle("Report")
            .addFields([
                { name: "By", value: `${message.author}` },
                { name: "Report User", value: `${message.mentions.users.first()}` },
                { name: "Reason", value: `${reason}` }
            ])
        reportChannel.send({ embeds: [embed] });
    }
}
