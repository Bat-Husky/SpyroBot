const Discord = require('discord.js')
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = class AddFaitsDivers extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}addfaitsdivers`)
    }

    static action (message) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't use that command!");

        let faitsDivers = JSON.parse(fs.readFileSync("./JSON/faitsdivers.json", "utf8"))

        
        if (!message.content.toString().split(' ')[1]) return message.reply("Ajoutez un faitsdivers comme ceci : \n`AddFaitsDivers <faits divers>`")
        let tempChannel = message.content.toString().split(' ');
        tempChannel.shift();
        faitsDivers["faitsdivers"][faitsDivers["nombre"]] = tempChannel.join(' ');

        faitsDivers["nombre"]++;


        fs.writeFile("./JSON/faitsdivers.json", JSON.stringify(faitsDivers), (err) => {
            if (err) {
                console.log(err);
            }
        });

        return message.channel.send(`Nouveau Faitsdivers ajouté avec succès ! \n**${faitsDivers["faitsdivers"][faitsDivers["nombre"] - 1]}**`)
    }
}
