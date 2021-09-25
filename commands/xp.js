const { Client, MessageEmbed } = require('discord.js');
const talkedRecently = new Set()
const fs = require('fs');

module.exports = {
    async execute(user, message, prefix, bot) {
        if (talkedRecently.has(message.author.id)) return;

        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 60000);

        let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));

        const Upsilon = member.guild.roles.cache.find(role => role.name === "Loup Upsilon");
        const Delta = member.guild.roles.cache.find(role => role.name === "Loup Delta");
        const Gamma = member.guild.roles.cache.find(role => role.name === "Loup Gamma");
        const Kappa = member.guild.roles.cache.find(role => role.name === "Loup Kappa");

        if (!allLevels["User"][user.id]) {
            allLevels["User"][user.id] = {
                id: user.id,
                level: 0,
                xp: 20,
                xpLevel: 100
            }

            allLevels["List"].push(user.id.toString())

            fs.writeFile("./JSON/Levels.json", JSON.stringify(allLevels), (err) => {
                if (err) {
                    console.log(err);
                }
            });

            return
        }

        var level;

        if (message.content.toString().split(" ").length > 15) {
            level = 30;

            level += Math.floor(Math.random()*11)
        } else {
            level = 15;

            level += Math.floor(Math.random()*11)
        }

        allLevels["User"][user.id]["xp"] += level

        if (allLevels["User"][user.id]["xp"] >= allLevels["User"][user.id]["xpLevel"]) {
            allLevels["User"][user.id]["level"] += 1
            allLevels["User"][user.id]["xp"] -= allLevels["User"][user.id]["xpLevel"]
            allLevels["User"][user.id]["xpLevel"] *= 1.17

            if (allLevels["User"][user.id]["level"] >= 8) {
                await message.guild.members.cache.get(user.id).roles.remove(Upsilon.id);
                await message.guild.members.cache.get(user.id).roles.add(Delta.id);
            }
            if (allLevels["User"][user.id]["level"] >= 20) {
                await message.guild.members.cache.get(user.id).roles.remove(Delta.id);
                await message.guild.members.cache.get(user.id).roles.add(Gamma.id);
            }
            if (allLevels["User"][user.id]["level"] >= 30) {
                await message.guild.members.cache.get(user.id).roles.remove(Gamma.id);
                await message.guild.members.cache.get(user.id).roles.add(Kappa.id);
            }

            message.channel.send(`Bravo ${user} ! \nTu es maintenat un loup niveau ${allLevels["User"][user.id]["level"]}`)
        }

        fs.writeFile("./JSON/Levels.json", JSON.stringify(allLevels), (err) => {
            if (err) {
                console.log(err);
            }
        });

        return
    }
}
