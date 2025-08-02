const Discord = require('discord.js')
const commands = require('../commands');
const { Client, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');


module.exports = class AddFaitsDivers extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}addfaitsdivers`)
    }

    static action (message) {
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));
            if (coins[message.author.id].coins < 1250) return message.reply(`You don't have enough coins to add a \`Faits Divers\`! \n\`${coins[message.author.id].coins}\` < \`1250\``)

            coins[message.author.id].coins -= 1250;

            fs.writeFile("./JSON/coin.json", JSON.stringify(coins), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

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

        message.channel.send(`Nouveau faits divers ajouté avec succès ! \n**${faitsDivers["faitsdivers"][faitsDivers["nombre"] - 1]}**`)
    }
}
