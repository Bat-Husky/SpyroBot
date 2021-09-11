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

        if (!allLevels["User"][user.id]) {
            allLevels["User"][user.id] = {
                id: user.id,
                level: 0,
                xp: 20,
                xpLevel: 100
            }

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
                const Delta = member.guild.roles.cache.find(role => role.name === "Loup Delta");
                await message.guild.members.cache.get(User.id).roles.add(Delta.id);
            } else if (allLevels["User"][user.id]["level"] >= 20) {
                const Gamma = member.guild.roles.cache.find(role => role.name === "Loup Gamma");
                await message.guild.members.cache.get(User.id).roles.add(Gamma.id);
            } else if (allLevels["User"][user.id]["level"] >= 30) {
                const Kappa = member.guild.roles.cache.find(role => role.name === "Loup Kappa");
                await message.guild.members.cache.get(User.id).roles.add(Kappa.id);
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