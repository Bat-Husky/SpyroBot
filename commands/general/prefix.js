const Discord = require('discord.js')
const commands = require('../commands');
const { Client, MessageEmbed, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');


module.exports = class Prefix extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}setprefix`)
    }

    static action (message) {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply("You can't use that command!");

        let allPrefix = JSON.parse(fs.readFileSync("./JSON/prefix.json", "utf8"));
        
        if (!message.content.toString().split(' ')[1]) return message.reply("Définnissez le prefix comme ceci : \n`SetPrefix <prefix>`")
        allPrefix[message.guild.id] = message.content.toString().split(' ')[1];

        fs.writeFile("./JSON/prefix.json", JSON.stringify(allPrefix), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const embed = new MessageEmbed()
            .setTitle("Prefix now set to :")
            .setDescription("`" + `${allPrefix[message.guild.id]}` + "`")
        // message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
        
    }
}