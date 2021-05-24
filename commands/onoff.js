const Discord = require('discord.js')
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = class QueueChannel extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}cmdstatus`)
    }


    static action (message) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't use that command!");

        let status = JSON.parse(fs.readFileSync("../ReBot_test/JSON/CommandStatus.json", "utf8"));

        
        if (!message.content.toString().split(' ')[1] || !message.content.toString().split(' ')[2]) return message.reply("Activez ou désactivez une commande comme ceci : \n`cmdStatus <command> <on/off>`")
        if (message.content.toString().toLowerCase().split(' ')[2] != "off" && message.content.toString().toLowerCase().split(' ')[2] != "on") return message.reply("Vous devez choisir on ou off.")

        let choice = message.content.toString().toLowerCase().split(' ')[2];

        if (message.content.toString().toLowerCase().split(' ')[1] == "baka") return this.baka(message, status, choice);
        return message.reply("Pour l'instant, seul le baka bénéficie de cette option.")
    }

    
    static baka (message, status, choice) {
        status["baka"][message.guild.id] = choice;

        fs.writeFile("../ReBot_test/JSON/CommandStatus.json", JSON.stringify(status), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const embed = new MessageEmbed()
            .setTitle("Baka command status :")
            .setDescription(`\`${choice}\``)
        return message.channel.send(embed);   
    }
}