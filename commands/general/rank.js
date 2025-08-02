const Discord = require('discord.js')
const commands = require('../commands');
const { Client, EmbedBuilder } = require('discord.js');
const fs = require('fs');


module.exports = class Rank extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}rank`)
    }

    static action (message) { 
        let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));

        var User = message.author;

        if (message.mentions.users.first()) {
            User = message.mentions.users.first();
        }

        if (!allLevels["User"][User.id]) {
            message.channel.send("Cette personne n'a pas de niveau.")
            return
        }

        var rank = 1;

        const Level = allLevels["User"][User.id]["level"]

        

        for (var i = 0; i < allLevels["List"].length; i++) {
            //console.log(allLevels["User"]["467284102987382800"])
            if (allLevels["User"][allLevels["List"][i]]["id"] == User.id) {
                rank = rank
            } else if (allLevels["User"][allLevels["List"][i]]["level"] > Level) {
                rank += 1
            } else if (allLevels["User"][allLevels["List"][i]]["level"] == Level) {
                if (allLevels["User"][allLevels["List"][i]]["xp"] > allLevels["User"][User.id]["xp"]) {
                    rank += 1
                }
            }
        }

        const embed = new EmbedBuilder()
            .setColor("#0042ff")
            .setTitle(`${User.tag}`)
            .addFields([
                { name: "Rank :", value: `${rank}` },
                { name: "Level :", value: `${allLevels["User"][User.id]["level"]}` },
                { name: "XP :", value: `${allLevels["User"][User.id]["xp"]} / ${allLevels["User"][User.id]["xpLevel"]}` }
            ])
            .setThumbnail(User.avatarURL("png"))
        message.channel.send({ embeds: [embed] });
    }
}
