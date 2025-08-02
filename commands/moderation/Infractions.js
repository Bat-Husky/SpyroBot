const commands = require('../commands');
const { Client, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js');



module.exports = class Infractions extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}infractions`)
    }

    static action (message) {
        let warns = JSON.parse(fs.readFileSync("./JSON/Warning.json", "utf8"));

        if(!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return message.reply("You can't use that command!");
        var wUser;
        if (message.mentions.members.first()) wUser = message.guild.members.cache.get(message.mentions.members.first().id) // || message.mentions.users.first();
        else return message.reply("Can't find user!");
        if(!wUser) return message.reply("Can't find user!");

        var warned = message.mentions.users.first();

        if(!warns[wUser.id]) return message.reply("This user has no warn!");

        const warnEmbed = new EmbedBuilder()
            .setTitle('Infractions')
            .setColor("#0042ff")
            .addFields([
                { name: "User", value: warned.toString() },
                { name: "Number of Warnings", value: warns[wUser.id].warns.toString() }
            ])
        message.channel.send({ embeds: [warnEmbed] });
    }
}
