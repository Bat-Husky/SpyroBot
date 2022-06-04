const { Client, MessageEmbed } = require('discord.js');
const talkedRecently = new Set()
const fs = require('fs');

module.exports = {
    async execute(user, message, prefix, bot) {
        if (!message.member.roles.cache.find(role => role.name === 'Censure')) return
        let Modes = JSON.parse(fs.readFileSync("./JSON/AntiMikwel.json", "utf8"));

        if (user.id == "373801923138158613") {
            if (Modes["Mikwel"] == "off") {
                return
            } else if (Modes["Mikwel"] == "Absolu") {

            } else if (Modes["Mikwel"] == "Partiel") {
                return this.Partiel(message)
            }
        } else {
            if (Modes["Autres"] == "off") {
                return
            } else if (Modes["Autres"] == "Absolu") {

            } else if (Modes["Autres"] == "Partiel") {
                return this.Partiel(message)
            }
        }
    },

    async Partiel(message) {
        const content = message.content.toString().toLowerCase();

        const numbers = content.match(/ /g) || []

        var true_Content = content

        for (let i in numbers) {
            true_Content = true_Content.replace(" ", "")
        }

        if (true_Content.startsWith("feur") || true_Content.startsWith("ffeur") || true_Content.startsWith("stiti") || true_Content.startsWith("stern")) {
            var joke;
            var phrase;
            
            if (true_Content.startsWith("feur") || true_Content.startsWith("ffeur")) {
                joke = "feur"
                phrase = "quoi"
            } else if (true_Content.startsWith("stiti")) {
                joke = "stiti"
                phrase = "oui"
            } else if (true_Content.startsWith("stern")) {
                joke = "stern"
                phrase = "ouais"
            }

            message.delete()

            const logsChannel = message.guild.channels.cache.find(ch => ch.name == "logs")

            const embed = new MessageEmbed()
                .setTitle("Anti-Mikwel")
                .addField("Censured User : ", `${message.author}`)
                .addField("Reason : ", `A répondu ${joke} à ${phrase}`)
            logsChannel.send({ embeds: [embed] })
        }
    },

    async Absolu() {
        message.delete()

        const logsChannel = message.guild.channels.cache.find(ch => ch.name == "logs")

        const embed = new MessageEmbed()
            .setTitle("Anti-Mikwel")
            .addField("Censured User : ", `${message.author}`)
            .addField("Reason : ", `A répondu ${joke} à ${phrase}`)
        logsChannel.send({ embeds: [embed] })
    }
}

