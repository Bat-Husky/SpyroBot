const Discord = require('discord.js')
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');



module.exports = class cmdStatus extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}cmdstatus`)
    }


    static action (message) {
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use that command!");

        let status = JSON.parse(fs.readFileSync("../ReBot_test/JSON/CommandStatus.json", "utf8"));

        
        if (!message.content.toString().split(' ')[1] || !message.content.toString().split(' ')[2]) return message.reply("Activez ou désactivez une commande comme ceci : \n`cmdStatus <command> <on/off>` \nAvailable commands : \n`$baka` : baka \n`$tonbotestmalfoutu` : malfoutu \n`$diagonale` : diago")
        if (message.content.toString().toLowerCase().split(' ')[2] != "off" && message.content.toString().toLowerCase().split(' ')[2] != "on") return message.reply("Vous devez choisir on ou off.")

        let choice = message.content.toString().toLowerCase().split(' ')[2];

        if (message.content.toString().toLowerCase().split(' ')[1] == "baka") return this.baka(message, status, choice);
        if (message.content.toString().toLowerCase().split(' ')[1] == "malfoutu") return this.malfoutu(message, status, choice);
        if (message.content.toString().toLowerCase().split(' ')[1] == "diago") return this.diago(message, status, choice);
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
        // return message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
    }

    static malfoutu (message, status, choice) {
        status["malfoutu"][message.guild.id] = choice;

        fs.writeFile("../ReBot_test/JSON/CommandStatus.json", JSON.stringify(status), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const embed = new MessageEmbed()
            .setTitle("Tonbotestmalfoutu command status :")
            .setDescription(`\`${choice}\``)
        // return message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
    }

    static diago (message, status, choice) {
        status["diago"][message.guild.id] = choice;

        fs.writeFile("../ReBot_test/JSON/CommandStatus.json", JSON.stringify(status), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const embed = new MessageEmbed()
            .setTitle("Diagonale command status :")
            .setDescription(`\`${choice}\``)
        // return message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
    }
}