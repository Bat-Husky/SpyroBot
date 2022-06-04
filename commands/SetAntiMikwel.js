const Discord = require('discord.js')
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');

// TODO : v13

module.exports = class SetAntiMikwel extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}setantimikwel`)
    }


    static action (message) {
        if (message.author.id != 467284102987382784n) return message.reply("You can't use that command!");

        let Modes = JSON.parse(fs.readFileSync("./JSON/AntiMikwel.json", "utf8"));

        
        if (!message.content.toString().split(' ')[1] || !message.content.toString().split(' ')[2]) return message.reply("Rien de spécifié")

        let choice = message.content.toString().toLowerCase().split(' ')[2];

        if (message.content.toString().toLowerCase().split(' ')[1] == "autres") return this.Autres(message, Modes, choice);
        if (message.content.toString().toLowerCase().split(' ')[1] == "mikwel") return this.Mikwel(message, Modes, choice);
        return
    }

    static Mikwel (message, Modes, choice) {
        const Choices = ["off", "absolu", "partiel"]

        let Test = []

        for (let i in Choices) {
            if (choice != Choices[i]) {
                Test.push(false)
            } else {
                Test.push(true)
            }
        }

        if (!Test[0] && !Test[1] && !Test[2]) {
            return console.log("jaaj")
        }


        Modes["Mikwel"] = choice;

        fs.writeFile("./JSON/AntiMikwel.json", JSON.stringify(Modes), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const embed = new MessageEmbed()
            .setTitle("Mikwel set to :")
            .setDescription(`\`${choice}\``)
        // return message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
    }

    static Autres (message, Modes, choice) {
        const Choices = ["off", "absolu", "partiel"]

        let Test = []

        for (let i in Choices) {
            if (choice != Choices[i]) {
                Test.push(false)
            } else {
                Test.push(true)
            }
        }

        if (!Test[0] && !Test[1] && !Test[2]) {
            return console.log("jaaj")
        }


        Modes["Autres"] = choice;

        fs.writeFile("./JSON/AntiMikwel.json", JSON.stringify(Modes), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const embed = new MessageEmbed()
            .setTitle("Autres set to :")
            .setDescription(`\`${choice}\``)
        // return message.channel.send(embed);
        message.channel.send({ embeds: [embed] });
    }
}